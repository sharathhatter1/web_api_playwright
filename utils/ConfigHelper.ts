import  { FullConfig } from '@playwright/test';

export class ConfigHelper {
  static getEnvironmentConfig(env: string) {
    const configs = {
      qa: {
        baseURL: 'https://automationexercise.com',
        apiURL: 'https://fakestoreapi.com',
        timeout: 30000,
        retries: 2
      },
      staging: {
        baseURL: 'https://staging.automationexercise.com',
        apiURL: 'https://staging-api.fakestoreapi.com',
        timeout: 45000,
        retries: 1
      },
      prod: {
        baseURL: 'https://automationexercise.com',
        apiURL: 'https://fakestoreapi.com',
        timeout: 60000,
        retries: 0
      }
    };
    
    return configs[env as keyof typeof configs] || configs.qa;
  }

  static getBrowserConfig(browser: string) {
    const configs = {
      chromium: { headless: true, slowMo: 0 },
      firefox: { headless: true, slowMo: 100 },
      webkit: { headless: true, slowMo: 50 }
    };
    
    return configs[browser as keyof typeof configs] || configs.chromium;
  }

  static getParallelConfig(ci: boolean) {
    return {
      workers: ci ? 2 : 4,
      fullyParallel: true,
      maxFailures: ci ? 5 : 0
    };
  }
}
 