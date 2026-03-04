class CheckoutPage {
	constructor(page) {
		this.cart = page.locator('.cart_list');
		this.cartItems = page.locator('.cart_item');
		this.firtName = page.locator('#first-name');
		this.lastName = page.locator('#last-name');
		this.zip = page.locator('#postal-code');
	}

	async checkProducts() {
		const count = await this.cart.count();
		return count;
	}

	async getProductName() {
		return await this.cartItems.first().locator('.inventory_item_name ').innerText();
	}

    async information(name, lastname, zip) {
		await this.firtName.fill(name);
		await this.lastName.fill(lastname);
		await this.zip.fill(zip);
	}
}

module.exports = { CheckoutPage };