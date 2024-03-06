const {test, expect} = require('@playwright/test');
async function navigateToPages(PageLoadObj, pageElementToClick, pageHeading, expectedHeading)
    {

        await pageElementToClick.click();
       // await page.waitForLoadState("networkidle");
       await PageLoadObj.waitFor();
        await expect(pageHeading).toHaveText(expectedHeading)
    }

    module.exports= {navigateToPages}