const { expect } = require("@playwright/test");
const {navigateToPages}= require('../Utilities/navigationToPages')
class FinancialReport
{
    constructor(page)
    {
        this.page=page;
        this.financialReports= page.getByRole('link', { name: 'Financial Report' });
        this.financialReportsPageHeading= page.getByRole('heading', { name: 'Financial Report' })
        this.financialPageLoadObj= page.locator("tbody tr [class='font-bold']").nth(1);

    }
    

    async navigateToFinancialReport()
    {
     await navigateToPages(this.financialPageLoadObj, this.financialReports, this.financialReportsPageHeading,'Financial Report')
    }
}
module.exports={FinancialReport}