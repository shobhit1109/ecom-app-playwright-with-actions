const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const AppPage = require('../pageObjects/AppPage');

test('@Web Client App login', async ({ page }) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
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
    const orderText = await appPage.verifyOrder(orderId);
    expect(orderId.includes(orderText)).toBeTruthy()

    
    
});
