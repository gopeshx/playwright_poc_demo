class CartPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.cartRows = page.locator('#tbodyid tr');
  }

  async open() {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
  }

  async containsProduct(productName) {
    await this.cartRows.first().waitFor();
    return (await this.cartRows.filter({ hasText: productName }).count()) > 0;
  }
}

module.exports = CartPage;