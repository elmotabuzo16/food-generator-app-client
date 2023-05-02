import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? 'https://food-generator-app-api.vercel.app'
  : 'http://127.0.0.1:5000';

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const API_URL = publicRuntimeConfig.API_URL;
