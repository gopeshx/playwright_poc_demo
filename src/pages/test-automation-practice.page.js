class TestAutomationPracticePage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.addressInput = page.locator('#textarea');
    this.maleRadio = page.locator('#male');
    this.femaleRadio = page.locator('#female');
    this.mondayCheckbox = page.locator('#monday');
    this.countrySelect = page.locator('#country');
    this.colorSelect = page.locator('#colors');
    this.animalSelect = page.locator('#animals');
    this.singleFileInput = page.locator('#singleFileInput');
    this.multipleFilesInput = page.locator('#multipleFilesInput');
    this.alertButton = page.locator('#alertBtn');
    this.confirmButton = page.locator('#confirmBtn');
    this.promptButton = page.locator('#promptBtn');
    this.fieldOne = page.locator('#field1');
    this.fieldTwo = page.locator('#field2');
    this.copyButton = page.getByRole('button', { name: 'Copy Text', exact: true });
    this.draggable = page.locator('#draggable');
    this.droppable = page.locator('#droppable');
    this.staticRows = page.locator('table').filter({ hasText: 'Learn Selenium' }).locator('tbody tr');
    this.paginationRows = page.locator('table').filter({ hasText: 'Smartphone' }).locator('tbody tr');
  }

  async open() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded' });
    await this.nameInput.waitFor();
  }

  async fillForm() {
    await this.nameInput.fill('Emma Stone');
    await this.emailInput.fill('emma.stone@test.com');
    await this.phoneInput.fill('9876543210');
    await this.addressInput.fill('1 Automation Street');
    await this.maleRadio.check();
    await this.mondayCheckbox.check();
    await this.countrySelect.selectOption({ label: 'United States' });
    await this.colorSelect.selectOption({ label: 'Blue' });
    await this.animalSelect.selectOption({ label: 'Cat' });
  }

  async uploadSingle(filePath) {
    await this.singleFileInput.setInputFiles(filePath);
    return this.singleFileInput.inputValue();
  }

  async uploadMultiple(filePaths) {
    await this.multipleFilesInput.setInputFiles(filePaths);
    return this.multipleFilesInput.evaluate((input) => [...input.files].map((file) => file.name));
  }

  async handleAlert(type, answer) {
    const button = { simple: this.alertButton, confirm: this.confirmButton, prompt: this.promptButton }[type];
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = button.evaluate((element) => element.click());
    const dialog = await dialogPromise;
    const message = dialog.message();
    if (type === 'confirm') await dialog.dismiss();
    else await dialog.accept(answer);
    await clickPromise;
    return message;
  }

  async dragAndDrop() {
    await this.draggable.dragTo(this.droppable);
    return this.droppable.innerText();
  }

  async copyText() {
    await this.fieldOne.fill('Playwright');
    await this.copyButton.dblclick();
    return this.fieldTwo.inputValue();
  }

  async sortStaticTable() {
    return this.staticRows.filter({ hasText: /Selenium|Java|Javascript/i }).count();
  }

  async selectPaginationPage(pageNumber) {
    await this.page.getByRole('link', { name: String(pageNumber), exact: true }).click();
    await this.page.waitForTimeout(300);
    return this.paginationRows.count();
  }
}

module.exports = TestAutomationPracticePage;