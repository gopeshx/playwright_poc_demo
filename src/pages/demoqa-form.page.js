class DemoQaFormPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.mobileInput = page.locator('#userNumber');
    this.submitButton = page.locator('#submit');
    this.genderInputs = page.locator('input[name="gender"]');
  }

  async open() {
    await this.page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });
    await this.firstNameInput.waitFor();
  }

  async submit() {
    await this.submitButton.click();
  }

  async fillInvalidMobile(mobile) {
    await this.mobileInput.fill(mobile);
    await this.submit();
  }

  async requiredFieldsAreInvalid() {
    return this.firstNameInput.evaluate((element) => !element.checkValidity())
      && this.lastNameInput.evaluate((element) => !element.checkValidity())
      && this.mobileInput.evaluate((element) => !element.checkValidity())
      && this.genderInputs.first().evaluate((element) => !element.checkValidity());
  }

  async invalidMobileIsStyled() {
    return this.mobileInput.evaluate((element) => !element.checkValidity()
      && (element.matches(':invalid') || element.classList.contains('was-validated')));
  }
}

module.exports = DemoQaFormPage;