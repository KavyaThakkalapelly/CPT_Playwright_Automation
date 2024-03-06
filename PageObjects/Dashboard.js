const { expect } = require("@playwright/test");
class Dashboard
{
    constructor(page)
    {
        this.page=page;
        this.dashboard= page.locator('#breadcrumb-container').getByText('Dashboard');
        this.welcomeInDashboard=page.locator("[class='sc-jvIDnw krLQzo']");
        //this.welcomeInDashboard= page.getByTestId('welcome');
        this.dashboardHospitalDropdown=page.locator("[data-testid='dashboardHospitalDropdown']")
    }
    async defaultPageDashboard()
    {
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveTitle('ciro talent management')
       // await this.dashboard.waitFor();
        //await expect(this.dashboard).toHaveText("Dashboard");
        await expect(this.welcomeInDashboard).toContainText('Welcome')
    }
}
module.exports={Dashboard}