/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    APP_NAME: 'Keto Food Generator',
    API_DEVELOPMENT: 'http://127.0.0.1:5000/api',
    // API_PRODUCTION: 'https://ketofoodgenerator-api.herokuapp.com/api',
    API_PRODUCTION: 'https://food-generator-app-api.vercel.app/api',
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://www.ketofoodgenerator.com',
    FB_APP_ID: '253159533892465',
    GOOGLE_CLIENT_ID:
      '307579424723-0qm1jgk7t6jvd3krgrklepe60m7sdgik.apps.googleusercontent.com',
    PRODUCTION: true,
  },
};

module.exports = nextConfig;
