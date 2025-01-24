const { test, expect } = require('@playwright/test');

test('Browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await console.log(await page.title());
});


test('Page context playwright test', async ({ page }) => {
    await page.goto('https:/google.com');
    await expect(page).toHaveTitle('Google');
});