import type { Browser, BrowserContext, Page } from 'playwright';

declare module '@cucumber/cucumber' {
  interface IWorld {
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;
    homePage?: InstanceType<typeof import('./pages/home.page')>;
    cartPage?: InstanceType<typeof import('./pages/cart.page')>;
    signupPage?: InstanceType<typeof import('./pages/signup.page')>;
    bankingPage?: InstanceType<typeof import('./pages/banking.page')>;
    webTablesPage?: InstanceType<typeof import('./pages/web-tables.page')>;
    sauceLoginPage?: InstanceType<typeof import('./pages/sauce-login.page')>;
    herokuLoginPage?: InstanceType<typeof import('./pages/heroku-login.page')>;
    demoQaFormPage?: InstanceType<typeof import('./pages/demoqa-form.page')>;
    testAutomationPracticePage?: InstanceType<typeof import('./pages/test-automation-practice.page')>;
    addedProductName?: string;
    signupResult?: unknown;
  }
}
