const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');
const signupCredentials = require('../data/signup-credentials.json');
const { readSignupCredentials } = require('../data/excel-credentials');

Given('I open the Demoblaze store', async function () {
  await this.homePage.open();
});

When('I sign up with username prefix {string} and password {string}', async function (usernamePrefix, password) {
  this.signupResult = await this.signupPage.register(usernamePrefix, password);
});

When('I sign up with the JSON credentials', async function () {
  this.signupResult = await this.signupPage.register(
    signupCredentials.username,
    signupCredentials.password
  );
});

Then('the signup confirmation should be displayed', async function () {
  assert.equal(this.signupResult.message, 'Sign up successful.');
});

When('I select a random mobile and add it to the cart', async function () {
  this.addedProductName = await this.homePage.selectRandomMobileAndAddToCart();
});

When('I select a random device from the {string} section and add it to the cart', async function (category) {
  this.addedProductName = await this.homePage.selectRandomDeviceAndAddToCart(category);
});

When('I select the first mobile and add it to the cart', async function () {
  this.addedProductName = await this.homePage.selectFirstMobileAndAddToCart();
});

When('I select the first laptop and add it to the cart', async function () {
  this.addedProductName = await this.homePage.selectFirstLaptopAndAddToCart();
});

When('I navigate to the cart', async function () {
  await this.cartPage.open();
});

Then('the added mobile is available in the cart', async function () {
  const isProductInCart = await this.cartPage.containsProduct(this.addedProductName);
  assert.equal(isProductInCart, true, `Expected "${this.addedProductName}" to be present in the cart`);
});

Then('the added laptop is available in the cart', async function () {
  const isProductInCart = await this.cartPage.containsProduct(this.addedProductName);
  assert.equal(isProductInCart, true, `Expected "${this.addedProductName}" to be present in the cart`);
});

Then('the added device is available in the cart', async function () {
  const isProductInCart = await this.cartPage.containsProduct(this.addedProductName);
  assert.equal(isProductInCart, true, `Expected "${this.addedProductName}" to be present in the cart`);
});

When('I sign up with the Excel credentials', async function () {
  const credentials = readSignupCredentials();
  this.signupResult = await this.signupPage.register(credentials.username, credentials.password);
});