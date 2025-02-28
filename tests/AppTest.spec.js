const { test, expect } = require('@playwright/test');

test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const loginButton = page.locator("[value='Login']");
    const firstCardBody = page.locator(".card-body b").first();
    const cartLink = page.locator("[routerlink*='cart']");
    const firstListItem = page.locator("div li").first();
    const productVisible = page.locator("h3:has-text('zara coat 3')");
    const checkoutButton = page.locator("text=Checkout");
    const countryInput = page.locator("[placeholder*='Country']");
    const dropdown = page.locator(".ta-results");
    const userNameText = page.locator(".user__name [type='text']").first();
    const submitButton = page.locator(".action__submit");
    const thankYouText = page.locator(".hero-primary");
    const orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    const myOrdersButton = page.locator("button[routerlink*='myorders']");
    const tableBody = page.locator("tbody");
    const rows = page.locator("tbody tr");
    const orderIdDetails = page.locator(".col-text");

    await page.goto("https://rahulshettyacademy.com/client");
    await userEmail.fill(email);
    await userPassword.fill("Iamking@000");
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await firstCardBody.waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    await page.locator(".card-body").filter({hasText:productName}).getByRole("button",{name:"Add to Cart"}).click();

    await cartLink.click();

    await firstListItem.waitFor();
    const bool = await productVisible.isVisible();
    expect(bool).toBeTruthy();
    await checkoutButton.click();

    await countryInput.pressSequentially("ind");

    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(userNameText).toHaveText(email);
    await submitButton.click();
    await expect(thankYouText).toHaveText(" Thankyou for the order. ");
    const orderId = await orderIdLocator.textContent();
    console.log(orderId);

    await myOrdersButton.click();
    await tableBody.waitFor();

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetailsText = await orderIdDetails.textContent();
    expect(orderId.includes(orderIdDetailsText)).toBeTruthy();
});
