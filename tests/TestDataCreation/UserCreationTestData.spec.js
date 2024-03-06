const {test, expect} = require('@playwright/test');
const {POManager}= require("../../PageObjects/POManager")
// json >>string >> js object
const testdata=JSON.parse(JSON.stringify(require("../../TestData/TestDemoTestData.json")));
const { stringify } =  require("csv-stringify");
const fs = require('fs')
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, '..' ,'..','TestData','user_maintenance_test_data2.csv'));
const columns = [
    "firstName",
    "lastName",
    "phoneNumber",
    "emailAddress",
    "role",
    "accountStatus",
];

test(`Reading user creation data and Writing to csv`, async ({ page }) => {
    const stringifier = stringify({ header: true, columns: columns });
    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();
    await loginpage.validLogin();
    const userMaintenace = poManager.getUserMaintenancePage();
    await userMaintenace.navigateToUserMaintenance();
    await userMaintenace.userDataPreLoad(stringifier);
    stringifier.pipe(writeStream);
});