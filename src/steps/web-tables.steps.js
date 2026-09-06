const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');

const emma = {
  firstName: 'Emma',
  lastName: 'Stone',
  email: 'emma.stone@test.com',
  age: 28,
  salary: 75000,
  department: 'QA'
};

Given('the DemoQA Web Tables application is accessible', async function () {
  await this.webTablesPage.open();
});

When('I add the record for {string} with email {string}, age {int}, salary {int}, and department {string}', async function (name, email, age, salary, department) {
  const [firstName, lastName] = name.split(' ');
  this.webTablesRecord = { firstName, lastName, email, age, salary, department };
  await this.webTablesPage.addRecord(this.webTablesRecord);
});

Then('Emma Stone\'s record should be visible with salary {int}', async function (salary) {
  const rowText = await this.webTablesPage.recordRow(emma.email).innerText();
  assert.match(rowText, /Emma/);
  assert.match(rowText, /Stone/);
  assert.match(rowText, new RegExp(String(salary)));
});

When('I search for {string}', async function (value) {
  await this.webTablesPage.search(value);
});

Then('only Emma Stone\'s record should be shown', async function () {
  assert.equal(await this.webTablesPage.visibleRecordCount(), 1);
  assert.equal(await this.webTablesPage.recordRow(emma.email).count(), 1);
});

When('I clear the Web Tables search', async function () {
  await this.webTablesPage.clearSearch();
});

Then('all {int} Web Tables records should be visible', async function (expectedCount) {
  assert.equal(await this.webTablesPage.visibleRecordCount(), expectedCount);
});

When('I edit Emma Stone\'s salary to {int}', async function (salary) {
  this.unchangedEmmaFields = await this.webTablesPage.editRecord(emma.email, salary);
});

Then('Emma Stone\'s salary should be {int} and her other fields should remain unchanged', async function (salary) {
  const rowText = await this.webTablesPage.recordRow(emma.email).innerText();
  assert.match(rowText, new RegExp(String(salary)));
  assert.match(rowText, new RegExp(this.unchangedEmmaFields.firstName));
  assert.match(rowText, new RegExp(this.unchangedEmmaFields.lastName));
  assert.match(rowText, new RegExp(this.unchangedEmmaFields.email));
  assert.match(rowText, new RegExp(this.unchangedEmmaFields.department));
});

Then('Kierra\'s pre-existing record should be visible', async function () {
  assert.equal(await this.webTablesPage.visibleRecordCount(), 1);
  assert.match(await this.webTablesPage.rows.first().innerText(), /Kierra/);
});

When('I delete Emma Stone\'s record', async function () {
  await this.webTablesPage.deleteRecord(emma.email);
});

Then('Emma Stone\'s record should no longer exist', async function () {
  assert.equal(await this.webTablesPage.recordRow(emma.email).count(), 0);
  assert.equal(await this.webTablesPage.visibleRecordCount(), 3);
});

When('I set the Web Tables rows per page to {int} if available', async function (size) {
  this.rowsPerPageSupported = await this.webTablesPage.setRowsPerPage(size);
});

Then('the Web Tables rows per page should be {int} when available', async function (size) {
  if (!this.rowsPerPageSupported) return;
  assert.equal(await this.webTablesPage.pageSizeSelect.inputValue(), String(size));
});

When('I sort the Web Tables by Age in ascending order', async function () {
  this.ageSortSupported = await this.webTablesPage.sortByAge('ascending');
});

When('I sort the Web Tables by Age in descending order', async function () {
  this.ageSortSupported = this.ageSortSupported && await this.webTablesPage.sortByAge('descending');
});

Then('the visible ages should be sorted in ascending order', async function () {
  if (!this.ageSortSupported) return;
  const ages = await this.webTablesPage.getAges();
  assert.deepEqual(ages, [...ages].sort((left, right) => left - right));
});

Then('the visible ages should be sorted in descending order', async function () {
  if (!this.ageSortSupported) return;
  const ages = await this.webTablesPage.getAges();
  assert.deepEqual(ages, [...ages].sort((left, right) => right - left));
});