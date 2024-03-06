const {test, expect} = require('@playwright/test');
const {POManager}= require("../../PageObjects/POManager")
// json >>string >> js object
const testdata=JSON.parse(JSON.stringify(require("../../TestData/TestDemoTestData.json")));
const { stringify } =  require("csv-stringify");
const fs = require('fs')
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, '..' ,'..','TestData','job_postings_test_data2.csv'));
const columns = ["hospitalName",
"unit",
"title",
"numberOfPositions",
"shiftLength",
"shift",
"reasonRequest",
"lengthOfAssignment",
"startDate",
"notes"];

test(`Reading job creation data and Writing to csv`, async ({ page }) => {
    const stringifier = stringify({ header: true, columns: columns });
    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();
    await loginpage.validLogin(testdata.url_QA, testdata.username_QA, testdata.password_QA);
    const jobPosting = poManager.getJobPostingsPage();
    await jobPosting.navigateToJobPostings();
    await jobPosting.jobCreationPrePopulateData(stringifier);
    stringifier.pipe(writeStream);
});