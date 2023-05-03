/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_NAME: 'KetoFoodGenerator',
    API_DEVELOPMENT: 'http://127.0.0.1:5000/api',
    API_URL: 'https://food-generator-app.vercel.app/api',
    PRODUCTION: false,
  },
};

module.exports = nextConfig;
