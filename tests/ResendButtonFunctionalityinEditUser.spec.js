const {test}= require('@playwright/test')
const {POManager}=require('../PageObjects/POManager')
const testdata=JSON.parse(JSON.stringify(require("../TestData/TestDemoTestData.json")))

test("Resend Welcome Email for Users who are not Activated Yet", async ({page})=>
{
const poManager= new POManager(page)
const login=poManager.getLoginPage()
await login.validLogin(testdata.url_QA, testdata.username_QA, testdata.password_QA);
const userMaintenace=poManager.getUserMaintenancePage();
await userMaintenace.navigateToUserMaintenance();
await userMaintenace.resendWelcomeEmail();
}
)