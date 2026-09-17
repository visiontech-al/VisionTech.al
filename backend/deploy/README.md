# Backend deployment reference

Mirrors the live configuration of the `api.visiontech.al` origin so it is not
only on the server. Nothing here is applied automatically — these are the
files as deployed, kept in git for review and disaster recovery.

## Topology

```
browser -> Cloudflare (proxied, SSL/TLS = Full (Strict), Always Use HTTPS)
        -> nginx on the Oracle Cloud VM, ports 80/443
        -> NestJS via PM2 on 127.0.0.1:3000
        -> PostgreSQL on localhost
```

## Files

| File | Deployed to | Purpose |
| --- | --- | --- |
| `nginx-api.visiontech.al.conf` | `/etc/nginx/sites-available/visiontech` | TLS termination and reverse proxy |
| `refresh-cf-allowlist.sh` | `/usr/local/sbin/refresh-cf-allowlist.sh` | Restricts ports 80/443 to Cloudflare's IP ranges |

## Deploying the application

```sh
cd ~/VisionTech.al && git fetch origin && git reset --hard origin/main \
  && cd backend && npm ci && npm run build \
  && pm2 restart visiontech-backend --update-env
```

Migrations run automatically on boot outside development (`migrationsRun` in
`src/config/database.config.ts`). To apply them by hand: `npm run migration:run`.

## TLS

Origin TLS is a Let's Encrypt certificate for `api.visiontech.al`, issued with
the webroot challenge against `/var/www/html` and renewed by `certbot.timer`.
`/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh` reloads nginx after a
renewal. The ACME HTTP-01 challenge reaches the origin through Cloudflare on
port 80, so it keeps working under the firewall allowlist below.

Cloudflare is set to **Full (Strict)**, so the origin must always serve a valid
certificate on 443. A self-signed certificate returns Cloudflare error 526, and
nothing listening on 443 returns 521.

nginx here is older than 1.25, so the vhost uses `listen 443 ssl http2;` rather
than the newer `http2 on;` directive.

## Firewall

Ports 80 and 443 accept traffic only from Cloudflare's published IPv4 ranges, so
the origin IP cannot be used to bypass Cloudflare. Port 3000 is closed to the
internet; nginx reaches it over loopback. Port 22 is left open and is never
touched by the script.

`refresh-cf-allowlist.sh` rebuilds a dedicated `CF-WEB` iptables chain from
<https://www.cloudflare.com/ips-v4>. It aborts without modifying the firewall if
the list cannot be fetched or looks malformed, and it is safe to re-run. A weekly
cron entry at `/etc/cron.d/refresh-cf-allowlist` runs it and persists the result,
logging to `/var/log/cf-allowlist.log`.

Two cautions on this host:

- Oracle Cloud images end the `INPUT` chain with a catch-all
  `REJECT --reject-with icmp-host-prohibited`. Rules added with `iptables -A`
  land *after* it and silently never match. Always insert above it and confirm
  with `iptables -S INPUT`.
- Changes are lost on reboot unless saved with `netfilter-persistent save`.

The VCN Security List in the Oracle Cloud console is a separate layer; both it
and the host firewall must permit a port.

## Mail

Contact notifications are sent through Gmail SMTP as
`visiontech.al.info@gmail.com` and delivered to that same mailbox.
`visiontech.al` publishes no MX records, so no `@visiontech.al` address can
receive mail — set up Cloudflare Email Routing before pointing `CONTACT_EMAIL`
at one. Gmail also only accepts an `SMTP_FROM` that is the authenticated account
or a verified "Send mail as" alias.

The backend `.env` is deliberately not in git; it lives only on the server.
