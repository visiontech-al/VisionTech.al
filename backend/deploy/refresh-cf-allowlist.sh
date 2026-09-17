#!/bin/bash
# Restrict inbound 80/443 to Cloudflare's published IPv4 ranges.
# Port 22 is deliberately untouched so SSH cannot be locked out.
set -euo pipefail

TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

if ! curl -fsS -m 20 https://www.cloudflare.com/ips-v4 -o "$TMP" || [ ! -s "$TMP" ]; then
  echo "ABORT: could not fetch Cloudflare IPv4 list" >&2
  exit 1
fi

CIDR_RE='^[0-9]+(\.[0-9]+){3}/[0-9]{1,2}$'
COUNT=$(grep -cE "$CIDR_RE" "$TMP" || true)
if [ "$COUNT" -lt 10 ]; then
  echo "ABORT: only $COUNT valid CIDRs parsed, list looks wrong" >&2
  exit 1
fi
echo "parsed $COUNT Cloudflare IPv4 ranges"

# Dedicated chain holding the allowlist, so it can be refreshed in isolation.
sudo iptables -N CF-WEB 2>/dev/null || true
sudo iptables -F CF-WEB
grep -E "$CIDR_RE" "$TMP" | while read -r cidr; do
  sudo iptables -A CF-WEB -s "$cidr" -j ACCEPT
done
# Non-Cloudflare sources fall back to the catch-all REJECT in INPUT.
sudo iptables -A CF-WEB -j RETURN

# Route web traffic through the allowlist, inserted above the catch-all REJECT.
REJECT_POS=$(sudo iptables -L INPUT --line-numbers -n | awk '$2=="REJECT"{print $1; exit}')
if [ -z "${REJECT_POS:-}" ]; then
  echo "ABORT: no REJECT rule found in INPUT" >&2
  exit 1
fi
if sudo iptables -C INPUT -p tcp -m multiport --dports 80,443 -j CF-WEB 2>/dev/null; then
  echo "CF-WEB jump already present"
else
  sudo iptables -I INPUT "$REJECT_POS" -p tcp -m multiport --dports 80,443 -j CF-WEB
  echo "inserted CF-WEB jump at position $REJECT_POS"
fi

# Only now remove the world-open rules, so there is no open window in between.
if sudo iptables -D INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT 2>/dev/null; then
  echo "removed world-open :80"
fi
if sudo iptables -D INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT 2>/dev/null; then
  echo "removed world-open :443"
fi

echo "=== INPUT ==="
sudo iptables -S INPUT
echo "=== CF-WEB allowlist entries: $(sudo iptables -S CF-WEB | grep -c '^-A CF-WEB -s') ==="
