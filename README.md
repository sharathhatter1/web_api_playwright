#  Enterprise Playwright Automation Framework

## Overview
TypeScript-based Playwright framework supporting UI and API testing with parallel execution, environment selection, and Allure reporting.

## Setup
```bash
npm install
npx playwright install
```

## Usage

### Environment Selection
```bash
ENV=qa npm run test          # QA environment
ENV=staging npm run test     # Staging environment
```

### Browser Selection
```bash
BROWSER=chromium npm run test    # Chrome only
BROWSER=firefox npm run test     # Firefox only  
BROWSER=webkit npm run test      # Safari only
BROWSER=all npm run test         # All browsers
```

### Test Types
```bash
npm run test:ui     # UI tests only
npm run test:api    # API tests only
npm run test        # All tests
```

### Reporting
```bash
npm run test:report    # Run tests + generate Allure report
npm run allure:open    # Open existing report
```

## Structure
- `pages/` - Page Object Models
- `api/` - API client abstractions
- `tests/ui/` - UI test specs
- `tests/api/` - API test specs
- `data/` - Test data JSON files
- `utils/` - Helper utilities

## CI/CD
Use `azure-pipelines.yml` for Azure DevOps integration with parallel execution and Allure reporting.
 