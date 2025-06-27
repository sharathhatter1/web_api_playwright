import  { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.API_BASE_URL = process.env.ENV === 'staging' 
    ? 'https://staging-api.fakestoreapi.com' 
    : 'https://fakestoreapi.com';
}

export default globalSetup;
 