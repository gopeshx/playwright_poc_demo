class BankingPage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login', exact: true });
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login', exact: true });
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer', exact: true });
    this.openAccountTab = page.getByRole('button', { name: 'Open Account', exact: true });
    this.customersTab = page.getByRole('button', { name: 'Customers', exact: true });
    this.homeButton = page.getByRole('button', { name: 'Home', exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.depositButton = page.getByRole('button', { name: 'Deposit', exact: true });
    this.withdrawButton = page.getByRole('button', { name: /Withdrawl|Withdrawal/ });
    this.transactionsButton = page.getByRole('button', { name: 'Transactions', exact: true });
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.customerSelect = page.locator('select[ng-model="custId"]');
    this.accountCustomerSelect = page.locator('select[ng-model="custId"]');
    this.accountSelect = page.locator('select[ng-model="accountNo"]');
    this.currencySelect = page.locator('select[ng-model="currency"]');
    this.amountInput = page.locator('input[ng-model="amount"]');
    this.balance = page.locator('div.center strong').nth(1);
    this.transactionRows = page.locator('table tbody tr');
  }

  async open() {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login', { waitUntil: 'domcontentloaded' });
        await this.customerLoginButton.waitFor({ timeout: 10000 });
        return;
      } catch (error) {
        if (attempt === 2) {
          throw error;
        }
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async acceptAlert() {
    const dialog = await this.page.waitForEvent('dialog');
    const message = dialog.message();
    await dialog.accept();
    return message;
  }

  async openManagerPanel() {
    await this.managerLoginButton.click();
    await this.addCustomerTab.waitFor();
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.removeExistingCustomers(firstName, lastName);
    await this.addCustomerTab.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
    const alertPromise = this.acceptAlert();
    await this.page.getByRole('button', { name: 'Add Customer', exact: true }).last().click();
    return alertPromise;
  }

  async openAccount(firstName, lastName, currency) {
    await this.openAccountTab.click();
    await this.accountCustomerSelect.waitFor();
    await this.selectLastCustomerOption(this.accountCustomerSelect, firstName, lastName);
    await this.currencySelect.selectOption({ label: currency });
    const alertPromise = this.acceptAlert();
    await this.page.getByRole('button', { name: 'Process', exact: true }).click();
    return alertPromise;
  }

  async customerExists(firstName, lastName) {
    await this.customersTab.click();
    await this.page.locator('table').waitFor();
    const tableText = await this.page.locator('table').innerText();
    return tableText.includes(firstName) && tableText.includes(lastName);
  }

  async openCustomerLogin() {
    await this.homeButton.click();
    await this.customerLoginButton.click();
    await this.customerSelect.waitFor();
  }

  async loginAsCustomer(firstName, lastName) {
    this.currentCustomer = { firstName, lastName };
    await this.selectLastCustomerOption(this.customerSelect, firstName, lastName);
    await this.loginButton.click();
    await this.accountSelect.waitFor();
    await this.page.waitForFunction(
      () => document.querySelectorAll('select[ng-model="accountNo"] option').length > 0
    );
    await this.accountSelect.selectOption({ index: 0 });
    await this.depositButton.first().waitFor();
  }

  async selectLastCustomerOption(select, firstName, lastName) {
    const customerName = `${firstName} ${lastName}`;
    const customerValue = await select.locator('option').evaluateAll(
      (options, name) => options.filter((option) => option.textContent.trim() === name).at(-1)?.value,
      customerName
    );

    if (!customerValue) {
      throw new Error(`Customer option not found: ${customerName}`);
    }

    await select.selectOption(customerValue);
  }

  async deposit(amount) {
    await this.depositButton.click();
    await this.amountInput.fill(String(amount));
    await this.page.getByRole('button', { name: 'Deposit', exact: true }).last().click();
    const confirmation = this.page.getByText('Deposit Successful', { exact: true });
    await confirmation.waitFor();
    const message = await confirmation.innerText();
    await this.page.waitForTimeout(3000);
    await this.openCustomerLogin();
    await this.loginAsCustomer(this.currentCustomer.firstName, this.currentCustomer.lastName);
    await this.depositButton.first().waitFor();
    return message;
  }

  async withdraw(amount) {
    await this.transactionsButton.click();
    await this.withdrawButton.click();
    await this.page.locator('button[ng-click="withdrawl()"].btn-primary').waitFor();
    const visibleAmountInput = this.page.locator('input[ng-model="amount"]:visible');
    await visibleAmountInput.fill(String(amount));
    const currentBalance = Number((await this.page.locator('body').innerText()).match(/Balance\s*:\s*(\d+)/)?.[1] ?? 0);
    const expectedBalance = currentBalance - Number(amount);
    const result = this.page.locator('span.error').filter({ hasText: /Transaction (successful|Failed)/i });
    for (let attempt = 0; attempt < 2; attempt += 1) {
      await this.page.locator('form:visible button[type="submit"]').click();
      const resultMessage = result.waitFor({ state: 'visible', timeout: 5000 })
        .then(() => result.innerText())
        .catch(() => undefined);
      const balanceUpdate = this.page.waitForFunction(
        (value) => document.body.innerText.includes(`Balance : ${value} ,`),
        expectedBalance,
        { timeout: 5000 }
      ).then(() => 'Transaction successful').catch(() => undefined);
      const message = await Promise.race([resultMessage, balanceUpdate]);

      if (message) {
        return message;
      }
    }

    throw new Error('Withdrawal did not produce a result message or balance update');
  }

  async getBalance() {
    const pageText = await this.page.locator('body').innerText();
    const balance = pageText.match(/Balance\s*:\s*(\d+)/)?.[1];
    return `$${balance ?? 0}`;
  }

  async removeExistingCustomers(firstName, lastName) {
    await this.customersTab.click();
    await this.page.locator('table').waitFor();
    const matchingRows = this.page.locator('table tbody tr').filter({ hasText: firstName }).filter({ hasText: lastName });

    while (await matchingRows.count()) {
      await matchingRows.first().getByRole('button', { name: 'Delete', exact: true }).click();
      await this.page.waitForTimeout(200);
    }
  }

  async openTransactions() {
    await this.transactionsButton.click();
    await this.page.waitForTimeout(500);
  }

  async transactionContains(amount, type) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      await this.page.waitForTimeout(1500);
      const historyText = await this.page.locator('body').innerText();
      if (historyText.includes(String(amount)) && historyText.toLowerCase().includes(type.toLowerCase())) {
        return true;
      }

      if (attempt === 0) {
        const backButton = this.page.getByRole('button', { name: 'Back', exact: true });
        if (await backButton.isVisible().catch(() => false)) {
          await backButton.click();
        }
        await this.transactionsButton.click();
        await this.page.waitForTimeout(1000);
      }
    }

    return false;
  }
}

module.exports = BankingPage;