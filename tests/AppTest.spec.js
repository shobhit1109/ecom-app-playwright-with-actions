const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const AppPage = require('../pageObjects/AppPage');

test('@Web Client App login', async ({ page }) => {
    const email = "anshika@gmail.com";
    const password = "Iamking@000";
    const productName = 'ZARA COAT 3';

    const loginPage = new LoginPage(page);
    const appPage = new AppPage(page);

    await loginPage.goto();
    await loginPage.login(email, password);
    await page.waitForLoadState('networkidle');
    await appPage.firstCardBody.waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    await appPage.addProductToCart(productName);
    const orderId = await appPage.checkoutProduct(email);
    await appPage.verifyOrder(orderId);
});
