const { Before, After, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const HomePage = require('../pages/home.page');
const CartPage = require('../pages/cart.page');
const SignupPage = require('../pages/signup.page');
const BankingPage = require('../pages/banking.page');
const WebTablesPage = require('../pages/web-tables.page');
const SauceLoginPage = require('../pages/sauce-login.page');
const HerokuLoginPage = require('../pages/heroku-login.page');
const DemoQaFormPage = require('../pages/demoqa-form.page');
const TestAutomationPracticePage = require('../pages/test-automation-practice.page');

setDefaultTimeout(30000);
const activeBrowsers = new Set();

Before(async function () {
  this.browser = await chromium.launch({ headless: process.env.HEADED !== 'true' });
  activeBrowsers.add(this.browser);
  this.context = await this.browser.newContext({
    baseURL: process.env.BASE_URL || 'https://demoblaze.com/',
    viewport: { width: 1440, height: 900 }
  });
  this.page = await this.context.newPage();
  this.homePage = new HomePage(this.page);
  this.cartPage = new CartPage(this.page);
  this.signupPage = new SignupPage(this.page);
  this.bankingPage = new BankingPage(this.page);
  this.webTablesPage = new WebTablesPage(this.page);
  this.sauceLoginPage = new SauceLoginPage(this.page);
  this.herokuLoginPage = new HerokuLoginPage(this.page);
  this.demoQaFormPage = new DemoQaFormPage(this.page);
  this.testAutomationPracticePage = new TestAutomationPracticePage(this.page);
});

After(async function (scenario) {
  try {
    if (scenario.result?.status === 'FAILED' && this.page) {
      await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    }
  } finally {
    await this.context?.close();
    await this.browser?.close();
    activeBrowsers.delete(this.browser);
    const status = scenario.result?.status === 'PASSED' ? 'PASSED' : scenario.result?.status || 'UNKNOWN';
    console.log(`[Scenario ${status}] ${scenario.pickle.name}`);
  }
});

AfterAll(async function () {
  await Promise.all([...activeBrowsers].map(async (browser) => {
    await browser.close();
    activeBrowsers.delete(browser);
  }));
});