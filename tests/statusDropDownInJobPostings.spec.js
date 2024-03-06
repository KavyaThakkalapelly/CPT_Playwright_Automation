const{test,expect}= require('@playwright/test');
const{POManager}= require('../PageObjects/POManager');
const testdata= JSON.parse(JSON.stringify(require('../TestData/TestDemoTestData.json')))
test('status Drop-down in Job Postings', async ({page}) =>
{

    const poManager=new POManager(page);
    const login= poManager.getLoginPage();
    await login.validLogin(testdata.url_QA, testdata.username_QA, testdata.password_QA);
    const jobposting = poManager.getJobPostingsPage();
    await jobposting.navigateToJobPostings();
    await jobposting.jobStatus();


})
