const {test, expect} = require('@playwright/test');
const {POManager}= require("../PageObjects/POManager")
// json >>string >> js object
const testdata=JSON.parse(JSON.stringify(require("../TestData/TestDemoTestData.json")));

// test.describe.configure({ mode: 'serial' });
//   let page;
// test.beforeAll(async ({ browser }) => {
//   page = await browser.newPage();
// });
test.only('Login to CPT and Navigate to all Pages', async ({page})=>
{
  const poManager= new POManager(page);
  /* Login to CPT */
  const loginpage = poManager.getLoginPage();
  await loginpage.validLogin(testdata.url_QA,testdata.username_QA, testdata.password_QA);
  const dashboard = poManager.getDashboardPage();
 /* Landing on default page Dashboard */
  await dashboard.defaultPageDashboard();
  await page.waitForTimeout(1000);
  /* navigate to UserMaintenance Page */
  /* Verify the Page Heading */ 
  const userMaintenace= poManager.getUserMaintenancePage();
  await userMaintenace.navigateToUserMaintenance();
  await page.waitForTimeout(1000);
  /* navigate to Job Postings Page */
  /* Verify the Page Heading */ 
  const jobPostings= poManager.getJobPostingsPage();
  await jobPostings.navigateToJobPostings();
  await page.waitForTimeout(1000);
   /* navigate to Candidate Page */
  /* Verify the Page Heading */ 
  const candidates= poManager.getCandidatesPage();
  await candidates.navigateToCandidates();
  await page.waitForTimeout(1000);
   /* navigate to Assigned Page */
  /* Verify the Page Heading */ 
  const assigned=poManager.getAssignedPage();
  await assigned.navigateToAssignedPage();
  await page.waitForTimeout(1000);
   /* navigate to StartStops Page */
  /* Verify the Page Heading */ 
  const startstops=poManager.getStartsStopsPage();
  await startstops.navigateToStartsStops();
  await page.waitForTimeout(1000);
   /* navigate to Financial Reports Page */
  /* Verify the Page Heading */ 
  const financialReports=poManager.getFinancialReportPage();
  await financialReports.navigateToFinancialReport();
  await page.waitForTimeout(1000);
  /* Logout From CPT */
  await loginpage.logoutFunction();
}

)