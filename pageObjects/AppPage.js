class AppPage {
    constructor(page) {
        this.page = page;
        this.firstCardBody = page.locator(".card-body b").first();
        this.cartLink = page.locator("[routerlink*='cart']");
        this.firstListItem = page.locator("div li").first();
        this.productVisible = page.locator("h3:has-text('zara coat 3')");
        this.checkoutButton = page.locator("text=Checkout");
        this.countryInput = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.userNameText = page.locator(".user__name [type='text']").first();
        this.submitButton = page.locator(".action__submit");
        this.thankYouText = page.locator(".hero-primary");
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");
        this.tableBody = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async addProductToCart(productName) {
        const products = this.page.locator(".card-body");
        const count = await products.count();
        for (let i = 0; i < count; ++i) {
            if (await products.nth(i).locator("b").textContent() === productName) {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async checkoutProduct(email) {
        await this.cartLink.click();
        await this.firstListItem.waitFor();
        const bool = await this.productVisible.isVisible()
        await this.checkoutButton.click();
        await this.countryInput.type("ind");
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await this.submitButton.click();
        const orderId = await this.orderIdLocator.textContent();
        console.log(orderId);
        return orderId;
    }

    async verifyOrder(orderId) {
        await this.myOrdersButton.click();
        await this.tableBody.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetailsText = await this.orderIdDetails.textContent();
        return orderIdDetailsText;
        ;
    }
}

module.exports = AppPage;