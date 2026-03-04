const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const testData = require('../utilities/testData');

test.describe('Product Checkout', () => {
  test('with one item', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    //Login
    await loginPage.goto(testData.urls.baseUrl);
    await loginPage.login(testData.success.username, testData.success.password);
    
    //Chekc products list
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    const count = await productPage.checkProducts();
    const productname = await productPage.getProductName();

    await expect(count).toBeGreaterThan(0);

    //Add product to cart
    await productPage.addProduct();
    const cartCount = await productPage.checkProductsCart();
    await expect(cartCount).toBeVisible();

    //Go to checkout
    await page.locator('.shopping_cart_link').click();

    //Validate cart items
    const checkoutCount = await checkoutPage.checkProducts();
    await expect(checkoutCount).toBeGreaterThan(0);

    const checkoutProductname = await checkoutPage.getProductName();
    await expect(checkoutProductname).toBe(productname);

    //Continue checkout
    await page.locator('#checkout').click();

    //Add user information
    await checkoutPage.information(testData.fakeuser.name, testData.fakeuser.lastname, testData.fakeuser.zip);
    await page.locator('#continue').click();

    //Checkout overview
    await expect(page.locator('.summary_info')).toBeVisible();

    await page.locator('#finish').click();

    await expect(page.locator('#checkout_complete_container')).toBeVisible();
  });

  
});