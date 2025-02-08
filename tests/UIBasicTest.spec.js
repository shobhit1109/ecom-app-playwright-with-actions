const { test, expect } = require('@playwright/test');

test.only('Browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //await console.log(await page.title());
    await userName.fill('rahulshetty');
    await password.fill('learning');
    await signIn.click();
    const alertText = await page.locator("[style*='block']").textContent();
    console.log(alertText);
    expect(alertText).toContain('Incorrect username/password');
    await userName.fill('')
    await userName.fill('rahulshettyacademy');
    await signIn.click();
    await page.waitForTimeout(10000);
});


test('Page context playwright test', async ({ page }) => {
    await page.goto('https:/google.com');
    await expect(page).toHaveTitle('Google');
});