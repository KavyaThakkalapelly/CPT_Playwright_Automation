const { expect } = require("@playwright/test");
const {getConfig}=require("../config");


class LoginPage
{
  
    constructor(page)
    {
      this.page=page;
      this.username= page.locator("#okta-signin-username");
      this.password= page.locator("[type='password']");
      this.remember= page.getByText('Remember me');
      this.signIn= page.locator("[type='submit']");
      this.errorMessageForInvalidCredentials=page.locator("[role='alert']")
      this.ellipsis= page.locator("[cursor='pointer']");
      this.logoutButton= page.getByRole('button', {name : 'Logout'})
      
    }
    async validLogin()
    {
        let configData= await getConfig();
        await this.page.goto(configData.baseUrl);
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle('ciro')
        await this.username.type(configData.username);
        await this.password.type(configData.password);
        await this.remember.click();
        await this.signIn.click();
        await this.page.waitForTimeout(1000);
        //await this.page.waitForLoadState('networkidle');
        const pageTitle= await this.page.title();   
        console.log('Page title:', pageTitle); 
        //await expect(this.page).toHaveTitle('ciro talent management');        
    }
    async validateLoginWithInvalidCredentials(url,username,password)
    {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle('ciro')
        await this.username.type(username);
        await this.password.type(password);
        await this.signIn.click();
        await this.page.waitForLoadState('networkidle');
        let errorMessage= await this.errorMessageForInvalidCredentials.textContent();
        await expect(this.errorMessageForInvalidCredentials).toContainText("The username or password provided is not recognized, incorrect, or your account does not exist. If you know you have an account, please try to reset your username or password.")
        await expect(this.page).toHaveTitle('ciro');
    }
    async logoutFunction(){
        await this.ellipsis.click();
        await this.logoutButton.click();
    }
}
module.exports= {LoginPage};
