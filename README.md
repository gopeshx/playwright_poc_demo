# Demoblaze Playwright BDD

## Setup

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test
npm run test:headed
```

The Cucumber HTML report is written to `test-results/cucumber-report.html`.

## Structure

- `features/`: business-readable scenarios
- `src/pages/`: page objects and selectors
- `src/steps/`: Cucumber step definitions
- `src/support/`: custom World and browser lifecycle hooks