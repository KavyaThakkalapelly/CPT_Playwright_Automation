const{test,expect}=require('@playwright/test')
const{POManager}=require('../PageObjects/POManager')
const testdata=JSON.parse(JSON.stringify(require('../TestData/TestDemoTestData.json')))

test('Test Case 75639:Successful login with valid credentials ', async ({page})=>
{
    const poManager= new POManager(page);
    const loginpage=poManager.getLoginPage();
    await loginpage.validLogin();
    await page.waitForTimeout(1000);
    console.log('Logged to CPT Successfully')
    await loginpage.logoutFunction();
    
})