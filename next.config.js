/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_NAME: 'Keto Food Generator',
    API_DEVELOPMENT: 'http://127.0.0.1:5000/api',
    API_PRODUCTION: 'https://ketofoodgenerator-api.herokuapp.com/api',
    DOMAIN_DEVELOPMENT: 'http://localhost:3000/',
    DOMAIN_PRODUCTION: 'https://ketofoodgenerator.com/',
    FB_APP_ID: '253159533892465',
    PRODUCTION: true,
  },
};

module.exports = nextConfig;
