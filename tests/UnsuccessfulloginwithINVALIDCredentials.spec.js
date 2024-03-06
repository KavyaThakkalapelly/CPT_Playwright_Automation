const{test, expect}=require('@playwright/test')
const {POManager}=require('../PageObjects/POManager');
const testdata= JSON.parse(JSON.stringify(require("../TestData/TestDemoTestData.json")))

test("Test Case 75670: Unsuccessful login with INVALID credentials", async ({page})=>
{
    const poManager=new POManager(page);
    const login=poManager.getLoginPage();
    await login.validateLoginWithInvalidCredentials(testdata.url_QA,testdata.username_invalid,testdata.password_invalid);
    
})