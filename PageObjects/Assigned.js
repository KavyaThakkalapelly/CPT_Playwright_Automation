const { expect } = require("@playwright/test");
const {navigateToPages}= require('../Utilities/navigationToPages')
class Assigned
{
    constructor(page)
    {
        this.page=page;
        this.assigned = page.getByRole('link', { name: 'Assigned' });
        this.assignedPageHeading = page.getByRole('heading', { name: 'Assigned' })
        this.assignedPageLoadObj= page.locator("[data-auto-id='common_card_0']");
    }
    
    async navigateToAssignedPage()
    {
     await navigateToPages(this.assignedPageLoadObj, this.assigned, this.assignedPageHeading,'Assigned')
    }
}
module.exports={Assigned}