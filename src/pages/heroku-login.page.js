class HerokuLoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flash = page.locator('#flash');
  }

  async open() {
    await this.page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'domcontentloaded' });
    await this.usernameInput.waitFor();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getFlash() {
    await this.flash.waitFor({ state: 'visible' });
    return this.flash.innerText();
  }

  async hasErrorStyling() {
    return this.flash.evaluate((element) => element.classList.contains('error'));
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Logout', exact: true }).click();
  }
}

module.exports = HerokuLoginPage;