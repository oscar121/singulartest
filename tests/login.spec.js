const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const testData = require('../utilities/testData');

test.describe('Login', () => {
  test('with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto(testData.urls.baseUrl);
    await loginPage.login(testData.success.username, testData.success.password);
    const count = await page.locator('.inventory_item').count();

    expect(count).toBeGreaterThan(1);
  });

  test('with invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto(testData.urls.baseUrl);
    await loginPage.login(testData.error.username, testData.error.password);

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});