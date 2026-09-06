const { Before, After, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const HomePage = require('../pages/home.page');
const CartPage = require('../pages/cart.page');
const SignupPage = require('../pages/signup.page');

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
  }
});

AfterAll(async function () {
  await Promise.all([...activeBrowsers].map(async (browser) => {
    await browser.close();
    activeBrowsers.delete(browser);
  }));
});