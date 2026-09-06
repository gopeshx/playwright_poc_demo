class WebTablesPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('#addNewRecordButton');
    this.searchBox = page.locator('#searchBox');
    this.modal = page.locator('.modal-content');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.locator('#submit');
    this.rows = page.locator('table tbody tr');
    this.ageHeader = page.locator('table thead th').filter({ hasText: 'Age' });
    this.pageSizeSelect = page.locator('select.-pageSizeOptions');
  }

  async open() {
    await this.page.goto('https://demoqa.com/webtables', { waitUntil: 'domcontentloaded' });
    await this.addButton.waitFor();
  }

  async addRecord(record) {
    if (await this.recordRow(record.email).count()) {
      await this.deleteRecord(record.email);
    }
    await this.addButton.click();
    await this.modal.waitFor({ state: 'visible' });
    await this.fillForm(record);
    await this.submitButton.click();
    await this.recordRow(record.email).waitFor();
  }

  async fillForm(record) {
    await this.firstNameInput.fill(record.firstName);
    await this.lastNameInput.fill(record.lastName);
    await this.emailInput.fill(record.email);
    await this.ageInput.fill(String(record.age));
    await this.salaryInput.fill(String(record.salary));
    await this.departmentInput.fill(record.department);
  }

  recordRow(email) {
    return this.rows.filter({ hasText: email }).first();
  }

  async search(value) {
    await this.searchBox.fill(value);
    await this.page.waitForTimeout(300);
  }

  async clearSearch() {
    await this.searchBox.fill('');
    await this.page.waitForTimeout(300);
  }

  async editRecord(email, salary) {
    const row = this.recordRow(email);
    await row.getByTitle('Edit').click();
    await this.modal.waitFor({ state: 'visible' });
    const unchangedValues = {
      firstName: await this.firstNameInput.inputValue(),
      lastName: await this.lastNameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      age: await this.ageInput.inputValue(),
      department: await this.departmentInput.inputValue()
    };
    await this.salaryInput.fill(String(salary));
    await this.submitButton.click();
    await this.recordRow(email).waitFor();
    return unchangedValues;
  }

  async deleteRecord(email) {
    const row = this.recordRow(email);
    await row.getByTitle('Delete').click();
    await row.waitFor({ state: 'detached' });
  }

  async visibleRecordCount() {
    return this.rows.count();
  }

  async setRowsPerPage(size) {
    if (await this.pageSizeSelect.count()) {
      await this.pageSizeSelect.selectOption(String(size));
      return (await this.pageSizeSelect.inputValue()) === String(size);
    }
    return false;
  }

  async getAges() {
    return this.rows.evaluateAll((rows) => rows
      .map((row) => row.querySelectorAll('td')[2]?.textContent.trim())
      .filter(Boolean)
      .map(Number));
  }

  async sortByAge(direction) {
    const before = await this.getAges();
    await this.ageHeader.click();
    await this.page.waitForTimeout(300);
    const after = await this.getAges();
    const expected = direction === 'ascending'
      ? [...after].sort((left, right) => left - right)
      : [...after].sort((left, right) => right - left);
    return JSON.stringify(after) === JSON.stringify(expected)
      && JSON.stringify(before) !== JSON.stringify(after);
  }
}

module.exports = WebTablesPage;