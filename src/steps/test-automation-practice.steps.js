const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');
const path = require('node:path');

Given('the Test Automation Practice page is accessible', async function () {
  await this.testAutomationPracticePage.open();
});

When('I fill the practice form with valid data', async function () {
  await this.testAutomationPracticePage.fillForm();
});

Then('the form controls should contain the selected values', async function () {
  assert.equal(await this.testAutomationPracticePage.nameInput.inputValue(), 'Emma Stone');
  assert.equal(await this.testAutomationPracticePage.emailInput.inputValue(), 'emma.stone@test.com');
  assert.equal(await this.testAutomationPracticePage.maleRadio.isChecked(), true);
  assert.equal(await this.testAutomationPracticePage.mondayCheckbox.isChecked(), true);
  assert.equal(await this.testAutomationPracticePage.countrySelect.inputValue(), 'usa');
  assert.equal(await this.testAutomationPracticePage.colorSelect.inputValue(), 'blue');
  assert.equal(await this.testAutomationPracticePage.animalSelect.inputValue(), 'cat');
});

When('I upload the single practice file', async function () {
  this.singleUpload = await this.testAutomationPracticePage.uploadSingle(path.join(__dirname, '..', 'data', 'practice-upload-one.txt'));
});

Then('the single file input should contain {string}', function (fileName) {
  assert.match(this.singleUpload, new RegExp(fileName));
});

When('I upload the two practice files', async function () {
  this.multipleUpload = await this.testAutomationPracticePage.uploadMultiple([
    path.join(__dirname, '..', 'data', 'practice-upload-one.txt'),
    path.join(__dirname, '..', 'data', 'practice-upload-two.txt')
  ]);
});

Then('the multiple file input should contain {string}', function (fileName) {
  assert.equal(this.multipleUpload.includes(fileName), true);
});

When('I accept the simple practice alert', async function () {
  this.practiceAlertMessage = await this.testAutomationPracticePage.handleAlert('simple');
});

When('I dismiss the confirmation practice alert', async function () {
  this.practiceAlertMessage = await this.testAutomationPracticePage.handleAlert('confirm');
});

When('I answer the prompt practice alert with {string}', async function (answer) {
  this.practiceAlertMessage = await this.testAutomationPracticePage.handleAlert('prompt', answer);
});

Then('the practice alert message should be {string}', function (expectedMessage) {
  assert.equal(
    this.practiceAlertMessage.replace(/:$/, ''),
    expectedMessage.replace(/:$/, '')
  );
});

When('I drag the practice item to its target', async function () {
  this.dropMessage = await this.testAutomationPracticePage.dragAndDrop();
});

Then('the practice drop target should say {string}', function (expectedMessage) {
  assert.equal(this.dropMessage, expectedMessage);
});

When('I double click Copy Text after entering {string}', async function (value) {
  await this.testAutomationPracticePage.fieldOne.fill(value);
  this.copiedText = await this.testAutomationPracticePage.copyText();
});

Then('the second field should contain {string}', function (expectedValue) {
  assert.equal(this.copiedText, expectedValue);
});

Then('the static table should contain {int} data rows', async function (expectedCount) {
  assert.equal(await this.testAutomationPracticePage.sortStaticTable(), expectedCount);
});

When('I open pagination page {int}', async function (pageNumber) {
  this.paginationRows = await this.testAutomationPracticePage.selectPaginationPage(pageNumber);
});

Then('the pagination table should contain data rows', function () {
  assert.ok(this.paginationRows > 0);
});