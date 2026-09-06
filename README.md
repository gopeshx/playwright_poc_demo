# Demoblaze Playwright BDD

## Setup

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test                  # Run all suites
npm run test:banking      # Run only @banking scenarios
npm run test:demoblaze    # Run only @demoblaze scenarios
npm run test:headed
```

The banking and Demoblaze suites are separated with Cucumber tags. Headed variants are available with `npm run test:banking:headed` and `npm run test:demoblaze:headed`.

The Cucumber HTML report is written to `test-results/cucumber-report.html`.

## Structure

- `features/`: business-readable scenarios
- `src/pages/`: page objects and selectors
- `src/steps/`: Cucumber step definitions
- `src/support/`: custom World and browser lifecycle hooks