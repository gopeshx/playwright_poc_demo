class SignupPage {
  constructor(page) {
    this.page = page;
    this.signupLink = page.getByRole('link', { name: 'Sign up', exact: true });
    this.signupModal = page.locator('#signInModal');
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signupButton = this.signupModal.getByRole('button', { name: 'Sign up', exact: true });
  }

  async register(usernamePrefix, password) {
    const username = `${usernamePrefix}_${Date.now()}`;
    await this.signupLink.click();
    await this.signupModal.waitFor({ state: 'visible' });
    await this.usernameInput.waitFor();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    const dialogPromise = this.page.waitForEvent('dialog', { timeout: 10000 });
    await this.signupButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();

    return { username, message };
  }
}

module.exports = SignupPage;