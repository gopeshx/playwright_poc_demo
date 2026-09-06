const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');

Given('the XYZ Bank application is accessible', async function () {
  await this.bankingPage.open();
});

When('I log in as the bank manager', async function () {
  await this.bankingPage.openManagerPanel();
});

When('I add customer {string} with postcode {string}', async function (customerName, postCode) {
  const [firstName, lastName] = customerName.split(' ');
  this.customerName = { firstName, lastName };
  this.addCustomerMessage = await this.bankingPage.addCustomer(firstName, lastName, postCode);
  assert.match(this.addCustomerMessage, /^Customer added successfully/);
});

When('I open a {word} account for customer {string}', async function (currency, customerName) {
  const [firstName, lastName] = customerName.split(' ');
  this.accountMessage = await this.bankingPage.openAccount(firstName, lastName, currency);
  this.accountNumber = this.accountMessage.match(/\d+/)?.[0];
  assert.match(this.accountMessage, /Account created successfully/);
});

When('I verify customer {string} is listed', async function (customerName) {
  const [firstName, lastName] = customerName.split(' ');
  assert.equal(await this.bankingPage.customerExists(firstName, lastName), true);
});

When('I log in as customer {string}', async function (customerName) {
  const [firstName, lastName] = customerName.split(' ');
  await this.bankingPage.openCustomerLogin();
  await this.bankingPage.loginAsCustomer(firstName, lastName);
});

When('I deposit {int}', async function (amount) {
  this.depositMessage = await this.bankingPage.deposit(amount);
});

Then('the deposit confirmation should be displayed', async function () {
  assert.equal(this.depositMessage, 'Deposit Successful');
});

When('I withdraw {int}', async function (amount) {
  this.withdrawMessage = await this.bankingPage.withdraw(amount);
});

Then('the withdrawal confirmation should be displayed', async function () {
  assert.equal(this.withdrawMessage, 'Transaction successful');
});

Then('the withdrawal error should be displayed', async function () {
  assert.match(this.withdrawMessage, /insufficient balance|not enough balance|Transaction Failed/i);
});

Then('the account balance should be {string}', async function (expectedBalance) {
  assert.equal(await this.bankingPage.getBalance(), expectedBalance);
});

When('I open the transaction history', async function () {
  await this.bankingPage.openTransactions();
});

Then('the transaction history should contain a deposit of {int}', async function (amount) {
  assert.equal(await this.bankingPage.transactionContains(amount, 'Credit'), true);
});

Then('the transaction history should contain a withdrawal of {int}', async function (amount) {
  assert.equal(await this.bankingPage.transactionContains(amount, 'Debit'), true);
});