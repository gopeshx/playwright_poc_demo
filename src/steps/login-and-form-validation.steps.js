const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');

Given('the Sauce Demo login page is accessible', async function () {
  await this.sauceLoginPage.open();
});

When('I submit the Sauce Demo login with both fields blank', async function () {
  await this.sauceLoginPage.login();
});

When('I submit the Sauce Demo login with username {string} and no password', async function (username) {
  await this.sauceLoginPage.login(username);
});

When('I submit the Sauce Demo login with username {string} and password {string}', async function (username, password) {
  await this.sauceLoginPage.login(username, password);
});

Then('the Sauce Demo error should be {string}', async function (expectedError) {
  const actualError = (await this.sauceLoginPage.getError()).replace(/[.!]$/, '');
  assert.equal(actualError, expectedError.replace(/[.!]$/, ''));
});

Then('the Sauce Demo error container should have red error styling', async function () {
  assert.equal(await this.sauceLoginPage.hasErrorStyling(), true);
});

When('I close the Sauce Demo error', async function () {
  await this.sauceLoginPage.errorCloseButton.click();
});

Then('the Sauce Demo error container should be hidden', async function () {
  await this.sauceLoginPage.errorContainer.waitFor({ state: 'hidden' });
});

Given('the Heroku login page is accessible', async function () {
  await this.herokuLoginPage.open();
});

When('I submit the Heroku login with username {string} and password {string}', async function (username, password) {
  await this.herokuLoginPage.login(username, password);
});

Then('the Heroku error flash should say {string}', async function (expectedMessage) {
  assert.match(await this.herokuLoginPage.getFlash(), new RegExp(expectedMessage));
});

Then('the Heroku flash should have the error class', async function () {
  assert.equal(await this.herokuLoginPage.hasErrorStyling(), true);
});

Then('the Heroku URL should contain {string}', async function (path) {
  assert.equal(this.page.url().includes(path), true);
});

Then('the Heroku success flash should be displayed', async function () {
  assert.match(await this.herokuLoginPage.getFlash(), /You logged into a secure area!/);
});

When('I log out from Heroku', async function () {
  await this.herokuLoginPage.logout();
});

Then('the Heroku logout flash should be displayed', async function () {
  assert.match(await this.herokuLoginPage.getFlash(), /You logged out of the secure area!/);
});

Given('the DemoQA practice form is accessible', async function () {
  await this.demoQaFormPage.open();
});

When('I submit the DemoQA practice form without filling any fields', async function () {
  await this.demoQaFormPage.submit();
});

Then('the DemoQA required fields should be highlighted', async function () {
  assert.equal(await this.demoQaFormPage.requiredFieldsAreInvalid(), true);
});

When('I submit the DemoQA practice form with invalid mobile {string}', async function (mobile) {
  await this.demoQaFormPage.fillInvalidMobile(mobile);
});

Then('the DemoQA mobile field should have invalid styling', async function () {
  assert.equal(await this.demoQaFormPage.invalidMobileIsStyled(), true);
});