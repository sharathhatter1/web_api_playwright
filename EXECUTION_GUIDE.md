#  Playwright Framework Execution Guide

## 🚀 Quick Start

### Basic Test Execution
```bash
# Run all tests
npm run test

# Run with UI mode (interactive)
npm run test:ui

# Run in headed mode (visible browser)
npm run test:headed
```

## 🌍 Environment Configuration

### Environment Selection
```bash
# QA Environment (default)
ENV=qa npm run test

# Staging Environment  
ENV=staging npm run test

# Production Environment
ENV=prod npm run test
```

**What happens:** Environment variables set different base URLs, API endpoints, timeouts, and retry counts.

## 🌐 Browser Configuration

### Single Browser
```bash
# Chrome only (default)
BROWSER=chromium npm run test

# Firefox only
BROWSER=firefox npm run test  

# Safari only
BROWSER=webkit npm run test
```

### Multiple Browsers
```bash
# All desktop browsers
BROWSER=all npm run test

# Mobile browsers only
BROWSER=mobile npm run test

# Desktop browsers only  
BROWSER=desktop npm run test
```

## 🧪 Test Type Execution

### By Test Category
```bash
# UI tests only
npm run test:e2e

# API tests only  
npm run test:api

# E2E integration tests
npm run test tests/e2e/
```

### By Specific Test File
```bash
# Single test file
npm run test tests/ui/login.spec.ts

# Multiple specific files
npm run test tests/api/products.spec.ts tests/api/users.spec.ts
```

### By Test Pattern
```bash
# Tests matching pattern
npm run test --grep "login"

# Exclude tests matching pattern  
npm run test --grep-invert "slow"
```

## 🔧 Advanced Execution Options

### Parallel Execution
```bash
# Control worker count
npm run test --workers=4

# Disable parallel execution
npm run test --workers=1

# Fully parallel (default)
npm run test --fully-parallel
```

### Debug Mode
```bash
# Debug mode with inspector
npm run test --debug

# Headed mode for debugging
npm run test --headed --slowMo=1000

# Trace viewer for failed tests
npx playwright show-trace trace.zip
```

### CI/CD Execution
```bash
# CI environment with retries
CI=true npm run test

# Maximum failures before stopping
npm run test --max-failures=5

# Generate reports
npm run test:report
```

## 📊 Reporting

### Generate Reports
```bash
# HTML report
npx playwright show-report

# Allure report
npm run allure:generate
npm run allure:open

# Combined test and report
npm run test:report
```

## 🔄 Playwright Config Explained

### Key Configuration Methods

#### `defineConfig()`
- **Purpose:** Main configuration function
- **What it does:** Sets up all test execution parameters
- **Returns:** Complete Playwright configuration object

#### `projects[]` Array
- **Purpose:** Defines browser/device combinations to test
- **Each project contains:**
  - `name`: Project identifier
  - `use`: Browser-specific settings
  - Device emulation settings

#### `use` Object Global Settings
- **baseURL:** Default URL for `page.goto()` calls
- **trace:** When to capture execution traces
- **screenshot:** Screenshot capture strategy  
- **video:** Video recording settings
- **timeout settings:** Various timeout configurations

#### `reporter[]` Array
- **html:** Generates interactive HTML report
- **allure-playwright:** Creates Allure test reports
- **junit:** XML format for CI/CD integration
- **json:** Machine-readable test results

### Environment-Specific Behavior

#### QA Environment (`ENV=qa`)
```typescript
{
  baseURL: 'https://automationexercise.com',
  apiURL: 'https://fakestoreapi.com',
  timeout: 30000,
  retries: 2
}
```

#### Staging Environment (`ENV=staging`)  
```typescript
{
  baseURL: 'https://staging.automationexercise.com',
  apiURL: 'https://staging-api.fakestoreapi.com', 
  timeout: 45000,
  retries: 1
}
```

### Browser Project Filtering
The config dynamically filters browser projects based on `BROWSER` environment variable:

- `BROWSER=all` → Runs all configured browsers
- `BROWSER=mobile` → Only mobile browser projects
- `BROWSER=desktop` → Only desktop browser projects  
- `BROWSER=chromium` → Only Chromium project

### Parallel Execution Control
- **CI Mode:** Limited workers (2) for stability
- **Local Mode:** More workers (4) for speed
- **fullyParallel:** Tests run independently in parallel

### Global Setup/Teardown
- **globalSetup:** Runs once before all tests (environment setup)
- **globalTeardown:** Runs once after all tests (cleanup)

## 🎯 Execution Flow

### Complete Test Execution Flow

1. **Global Setup Phase**
   - Environment configuration
   - API base URL setup
   - Global test data preparation

2. **Project Initialization**
   - Browser project filtering
   - Worker process spawning
   - Test file discovery

3. **Test Execution Phase**
   - Parallel test execution across workers
   - Per-test setup (beforeEach hooks)
   - Test step execution with Allure reporting
   - Failure handling and retries

4. **Reporting Phase**
   - HTML report generation
   - Allure results compilation
   - JUnit XML for CI/CD
   - Trace/screenshot/video artifact collection

5. **Global Teardown Phase**
   - Test data cleanup
   - Resource deallocation
   - Final report publishing

### Method Execution Details

#### `test.beforeEach()` Flow
1. Create page object instances
2. Initialize API client with request context
3. Set Allure epic/feature metadata
4. Prepare test-specific data

#### `allure.step()` Flow  
1. Create step in Allure report
2. Execute step function
3. Capture success/failure status
4. Attach screenshots/logs on failure

#### `ApiClient` Method Flow
1. Construct full URL with base URL
2. Add default headers (Content-Type, Accept)
3. Execute HTTP request via Playwright request context
4. Parse response and return structured data
5. Handle errors and timeouts

This framework provides comprehensive test coverage with robust reporting and flexible execution options for both UI and API testing scenarios.
 