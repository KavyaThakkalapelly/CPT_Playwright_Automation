const { expect } = require("@playwright/test");
const {fs} = require("fs");
const fetch = require("node-fetch");
const{navigateToPages}= require('../Utilities/navigationToPages')
const ActionsUtils = require("../Utilities/actionsUtils");
const testdata=JSON.parse(JSON.stringify(require("../TestData/TestDemoTestData.json")))
class UserMaintenance
{

    constructor(page)
    {
        this.page=page;
        this.counter=3;
        this.userCreationPageLoadObj= page.locator("[data-testid='card']").nth(0);
        this.userMaintenance= page.getByRole('link', { name: 'User Maintenance' });
       this.userMaintenanceBreadcrumb= page.locator("[class='Breadcrumbs-module_lastBreadcrumb__mYl3I']");
        this.addUserButton = page.locator("div[data-auto-id='btn_add_new']");
        //this.addUserButton=page.locator("//button[text()=\"Add User\"]");
        this.firstName = page.locator("#firstname");
        this.lastName = page.locator("#lastname");
        this.phoneNumber = page.locator("#phonenumber");
        this.emailAddress = page.locator("#emailaddress");
        this.addButton = page.locator("button[type='submit']")
        this.generaluserRole=page.locator("[for='General User']")
        this.humanResourceRole= page.locator("[for='Human Resources']")
        this.financeRole= page.locator("[for='Finance']")
        this.toastMsg= page.locator("[title='User has been added successfully.']")
        this.searchBox= page.locator("input#searchInput");
        //this.emailAddressOnCardObj= page.locator("p [class='sc-cxULra fdvuOV']")
         this.emailId= testdata.emailId;
         this.xpathForEmailId=`//p/span[contains(text(), '${this.emailId}')]`
       this.emailAddressLoc= page.locator(this.xpathForEmailId)
       //this.emailAddressLoc=page.locator("//p/span[contains(text(), 'kavya12')]/parent::p/parent::div/following-sibling::div//button")

        this.adminTab = page.getByText('ADMINISTRATIVE');
        this.resendButton= page.locator("//div/button[contains(text(), 'Resend')]")
        this.cancelButton=page.locator("//div/button[contains(text(), 'Cancel')]")
    }
    async resendWelcomeEmail()
    {
       await this.emailAddressLoc.click();
       if(this.resendButton.isVisible())
       {
        await this.resendButton.click();
        console.log("Resend Email send Successfully")
       }
        else
        {
          await this.cancelButton.click();
          console.log("User is already Activated")
        }
    }
    
    async readFromFs()
    {
        const dataToWrite = {
            counter: '1'
            
          };
           const jsonFilePath = 'require("../TestData/TestDemoTestData.json")';
           fs.writeFileSync(jsonFilePath, JSON.stringify(dataToWrite));
    }
    async generateUsername()
    {
        console.log("counter is "+this.counter);
        this.counter=this.counter++;
        return `$Auto_Test_User${this.counter}`;
        
    }
    
    async navigateToUserMaintenance()
    {
     await navigateToPages(this.userCreationPageLoadObj, this.userMaintenance, this.userMaintenanceBreadcrumb,'User Maintenance')
    }
 
    async userCreation(record) {
        const actionsUtils = new ActionsUtils(this.page);
        //await this.userMaintenance.click();
        //await this.page.waitForTimeout(1000);
        await this.addUserButton.click();
        await this.page.waitForTimeout(1000);
        await actionsUtils.scrollToElement(this.addButton);
        await this.firstName.fill(record.firstName);
        await this.page.waitForTimeout(1000);
        await this.lastName.fill(record.lastName);
        await this.page.waitForTimeout(1000);
        await this.phoneNumber.fill(record.phoneNumber);
        await this.page.waitForTimeout(1000);
        await this.emailAddress.fill(record.emailAddress);
        await this.page.waitForTimeout(1000);
        if (record.role=='General User')
        {
            await this.generaluserRole.click()
        }
        else if(record.role=='Human Resources')
        {
            await this.humanResourceRole.click()
        }
        else if(record.role=='Finance')
        {
            await this.financeRole.click();
        }
    
       await this.addButton.click();
        await this.page.waitForTimeout(4000);
        await expect(this.toastMsg).toBeVisible();
     }

    async userDataPreLoad(stringifier) {
        try {
            const response = await Promise.all([
                this.fetchNames(this.pickRandom(['male', 'female'])),
                this.fetchNames('surnames')
            ]);
            for(let i=0;i<50;i++){
                const [firstNames, lastNames] = response;
                const firstNameValue = this.pickRandom(firstNames.data);
                const lastNameValue = this.pickRandom(lastNames.data);
                console.log("*****"+firstNameValue+"******"+lastNameValue);
                const emailAddressValue = firstNameValue + '.' + lastNameValue + '@cpt.com';
                const phoneNumberValue = parseInt(Math.random().toFixed(10).replace("0.", ""));
                const role = this.pickRandom(['General User', 'Human Resources', 'Finance']);
                stringifier.write([firstNameValue, lastNameValue, phoneNumberValue, emailAddressValue,  role, 'Active']);
            }
        } catch (error) {
            console.error('Unable to generate name:', error);
        }
    }

     async fetchData(url) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        } catch (error) {
          console.error('Unable to fetch data:', error);
        }
      }
      
       fetchNames(nameType) {
        return this.fetchData(`https://www.randomlists.com/data/names-${nameType}.json`);
      }
      
       pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
      }
}
module.exports={UserMaintenance}