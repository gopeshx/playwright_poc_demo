class SauceLoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorContainer = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('.error-button');
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    await this.loginButton.waitFor();
  }

  async login(username = '', password = '') {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getError() {
    await this.errorContainer.waitFor({ state: 'visible' });
    return this.errorContainer.innerText();
  }

  async hasErrorStyling() {
    return this.errorContainer.evaluate((element) => {
      const container = element.closest('.error-message-container');
      const styles = container && getComputedStyle(container);
      return container?.classList.contains('error')
        && styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
    });
  }
}

module.exports = SauceLoginPage;