import  { defineConfig, devices } from '@playwright/test';
import { ConfigHelper } from './utils/ConfigHelper';

const ENV = process.env.ENV || 'qa';
const BROWSER = process.env.BROWSER || 'chromium';
const CI = !!process.env.CI;

const envConfig = ConfigHelper.getEnvironmentConfig(ENV);
const parallelConfig = ConfigHelper.getParallelConfig(CI);

export default defineConfig({
  // Test directory configuration
  testDir: './tests',
  
  // Parallel execution settings
  fullyParallel: parallelConfig.fullyParallel,
  workers: parallelConfig.workers,
  maxFailures: parallelConfig.maxFailures,
  
  // CI/CD specific settings
  forbidOnly: CI, // Prevents test.only in CI
  retries: CI ? 2 : 0, // Retry failed tests in CI
  
  // Timeout configurations
  timeout: envConfig.timeout,
  expect: { timeout: 5000 },
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      suiteTitle: 'Playwright Automation Suite'
    }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  // Global test configuration
  use: {
    // Base URL for UI tests
    baseURL: envConfig.baseURL,
    
    // Browser context settings
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Debugging and reporting
    trace: 'retain-on-failure', // Traces for failed tests
    screenshot: 'only-on-failure', // Screenshots for failures
    video: 'retain-on-failure', // Videos for failed tests
    
    // Test execution settings
    actionTimeout: 10000, // Individual action timeout
    navigationTimeout: 30000, // Page navigation timeout
    
    // HTTP settings for API tests
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  
  // Browser project configurations
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome' // Use stable Chrome
      }
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox']
      }
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari']
      }
    },
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5']
      }
    },
    {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 12']
      }
    }
  ].filter(project => {
    // Filter projects based on BROWSER environment variable
    if (BROWSER === 'all') return true;
    if (BROWSER === 'mobile') return project.name.includes('mobile');
    if (BROWSER === 'desktop') return !project.name.includes('mobile');
    return project.name === BROWSER;
  }),
  
  // Global setup and teardown
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  
  // Web server configuration (if needed)
  webServer: process.env.START_SERVER ? {
    command: 'npm run start:test-server',
    port: 3000,
    timeout: 120000,
    reuseExistingServer: !CI
  } : undefined
});
 