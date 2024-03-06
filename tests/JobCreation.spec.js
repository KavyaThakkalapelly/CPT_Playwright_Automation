const {test, expect} = require('@playwright/test');
const {POManager}= require("../PageObjects/POManager")
// json >>string >> js object
const testdata=JSON.parse(JSON.stringify(require("../TestData/TestDemoTestData.json")));
const { parse } =  require("csv-parse/sync");
const fs = require('fs')
const path = require('path');
const records = parse(fs.readFileSync(path.join(__dirname, '..' ,'TestData','job_postings_test_data.csv')), {
  columns: true,
  skip_empty_lines: true
});
for (const record of records) {
  console.log(record.hospitalName, record.unit, record.reasonRequest);
  test(`Job Creation for ${record.hospitalName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();
    await loginpage.validLogin(testdata.url_QA, testdata.username_QA, testdata.password_QA);
    const jobPosting = poManager.getJobPostingsPage();
    await jobPosting.navigateToJobPostings();
    await jobPosting.createJob(record);
  })
}