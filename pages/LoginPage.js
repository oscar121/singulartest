class LoginPage {
	constructor(page) {
		this.page = page;
		this.username = page.locator('#user-name');
		this.pass = page.locator('#password');
		this.loginButton = page.locator('#login-button');
	}

	async goto(url) {
		await this.page.goto(url);
	}

	async login(username, password) {
		await this.username.fill(username);
		await this.pass.fill(password);
		await this.loginButton.click();
	}

}

module.exports = { LoginPage };