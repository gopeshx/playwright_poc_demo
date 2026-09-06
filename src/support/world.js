const { World, setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.homePage = undefined;
    this.cartPage = undefined;
    this.signupPage = undefined;
    this.bankingPage = undefined;
    this.webTablesPage = undefined;
    this.sauceLoginPage = undefined;
    this.herokuLoginPage = undefined;
    this.demoQaFormPage = undefined;
    this.testAutomationPracticePage = undefined;
    this.addedProductName = undefined;
    this.signupResult = undefined;
  }
}

setWorldConstructor(CustomWorld);