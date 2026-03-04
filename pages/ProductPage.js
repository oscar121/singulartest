class ProductPage {
	constructor(page) {
		this.inventory = page.locator('.inventory_item');
		this.cartButton = page.locator('.shopping_cart_link');
	}

	async checkProducts() {
		const count = await this.inventory.count();
		return count;
	}
	async getProductName() {
		return await this.inventory.first().locator('.inventory_item_name ').innerText();
	}
	async addProduct() {
		await this.inventory.first().getByRole('button').click();
	}
	async checkProductsCart() {
		return await this.cartButton.locator('.shopping_cart_badge');
	}
}

module.exports = { ProductPage };