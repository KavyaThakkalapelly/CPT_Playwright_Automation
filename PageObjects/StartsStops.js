const { expect } = require("@playwright/test");
const {navigateToPages}= require('../Utilities/navigationToPages')
class StartsStops
{
    constructor(page)
    {
      this.page=page;
      this.startstopsPageLoadObj= page.locator("[data-auto-id='common_card_0']");
      this.startstops= page.getByRole('link', { name: 'Starts / Stops' });
      this.startstopsPageHeading = page.getByRole('heading', { name: 'Starts / Stops' });
    }
  
    async navigateToStartsStops()
    {
     await navigateToPages(this.startstopsPageLoadObj, this.startstops, this.startstopsPageHeading,'Starts / Stops')
    }
}
module.exports={StartsStops}