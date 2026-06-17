export const environment = {
  production: true,
  // Use a browser-safe global or fallback to the production API URL
  apiUrl: (window as any)['API_URL'] || 'https://api.visiontech.al/api',
};

