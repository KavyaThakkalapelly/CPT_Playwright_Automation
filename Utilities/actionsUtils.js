// actionsUtils.js

class ActionsUtils {
    constructor(page) {
        this.page = page;
    }

    async scrollDownByPixels(pixels) {
        await this.page.evaluate((pixels) => window.scrollBy(0, pixels), pixels);
    }

    async scrollToElement(elementLocator) {
        if (typeof elementLocator === 'string') {
            // If the element locator is a string, assume it's a CSS selector
            const element = await this.page.locator(elementLocator);
            await element.scrollIntoViewIfNeeded();
        } else if (elementLocator instanceof Object && elementLocator.locator) {
            // If the element locator is an object with a "locator" property, assume it's a Playwright Locator
            await elementLocator.scrollIntoViewIfNeeded();
        } else {
            throw new Error('Invalid element locator format');
        }
    }
}

module.exports = ActionsUtils;
