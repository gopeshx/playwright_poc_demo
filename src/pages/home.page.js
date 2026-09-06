class HomePage {
  constructor(page) {
    this.page = page;
    this.phonesCategory = page.getByRole('link', { name: 'Phones' });
    this.laptopsCategory = page.getByRole('link', { name: 'Laptops' });
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });
    this.productCards = page.locator('#tbodyid .card');
  }

  async open() {
    await this.page.goto('/');
    await this.page.locator('#contcar').waitFor();
  }

  async selectRandomMobileAndAddToCart() {
    return this.selectRandomDeviceAndAddToCart('Phones');
  }

  async selectRandomDeviceAndAddToCart(category) {
    const categoryLinks = {
      Phones: this.phonesCategory,
      Laptops: this.laptopsCategory,
      Monitors: this.monitorsCategory
    };
    const categoryLink = categoryLinks[category];

    if (!categoryLink) {
      throw new Error(`Unsupported Demoblaze category: ${category}`);
    }

    const currentFirstProductName = await this.productCards.first().locator('.card-title a').innerText().catch(() => '');
    await categoryLink.click();

    if (category !== 'Phones') {
      await this.page.waitForFunction(
        ({ selector, previousName }) => {
          const product = document.querySelector(selector);
          return product && product.textContent.trim() !== previousName;
        },
        {
          selector: '#tbodyid .card .card-title a',
          previousName: currentFirstProductName
        }
      );
    }

    await this.productCards.first().waitFor();

    const productCount = await this.productCards.count();
    const randomIndex = Math.floor(Math.random() * productCount);
    return this.selectMobileAndAddToCart(randomIndex);
  }

  async selectFirstMobileAndAddToCart() {
    await this.phonesCategory.click();
    await this.productCards.first().waitFor();
    return this.selectMobileAndAddToCart(0);
  }

  async selectFirstLaptopAndAddToCart() {
    await this.laptopsCategory.click();
    await this.productCards.first().waitFor();
    return this.selectMobileAndAddToCart(0);
  }

  async selectMobileAndAddToCart(index) {
    const product = this.productCards.nth(index);
    const productName = await product.locator('.card-title a').innerText();

    await product.locator('.card-title a').click();
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.getByRole('link', { name: 'Add to cart', exact: true }).click();
    const dialog = await dialogPromise;
    await dialog.accept();

    return productName;
  }
}

module.exports = HomePage;