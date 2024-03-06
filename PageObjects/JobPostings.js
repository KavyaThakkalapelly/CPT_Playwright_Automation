const { expect } = require("@playwright/test");
const {navigateToPages}= require('../Utilities/navigationToPages')

class JobPostings
{
    constructor(page)
    {
        this.page=page;
        this.jobPostingpageLoadObj=page.locator("[data-auto-id='job_card_0']")
        this.jobPosting = page.getByRole('link', { name: 'Job Postings' });
        this.jobPostingsPageHeading= page.getByRole('heading', { name: 'Job Postings' })
         this.addJobButton= page.locator("[data-auto-id='btn_add_new']")
         this.hospitalDropdown= page.locator("#hospital");
        this.reactDropdownSelection= page.locator("//div[contains(@class,'select__menu-list')]/div/span");
        this.reactDropdownClick= page.locator("//div[contains(@class,'select__menu-list')]/div"); 
         this.unitDropdown= page.locator('#unit');
         this.titleDropdown= page.locator("#title");
         this.numberOfPositions= page.locator("#positions");
         this.shiftLenghDropdown=page.locator("#shiftlength");
         this.shiftDropdown=page.locator("#shift");
         this.reasonRequestDropdown= page.locator("#reasonrequest");
         this.lengthOfAssignmentDropdown= page.locator("#assignmentduration")
         this.startDate= page.locator(".react-datepicker__input-container")
         this.monthHeader = page.locator("//div[@class='react-datepicker__current-month']")
         this.nextMonth = page.locator("button[aria-label='Next Month']");
         this.calenderValue= page.locator(".react-datepicker div[aria-disabled='false']")
         this.notes= page.locator("#notes");
         this.jobSubmitButton= page.locator("[type='submit']");
         this.cancelButton=page.locator("[data-auto-id='btn_cancel']");
         this.ApproveYesButton= page.locator("[data-auto-id='btn_popover_yes']")
         this.toastMsg= page.locator("[title='Job Posting has been added successfully.']")
         this.cardJobTitle=page.locator("[data-auto-id='card_job_title_0']");
         this.cardHospitalName = page.locator("[data-auto-id='card_hospital_0']");
         this.cardUnit = page.locator("[data-auto-id='card_unit_0']");
         this.cardPostions = page.locator("[data-auto-id='card_available_positions_card_0']");
         this.resultCount=page.locator("[data-auto-id='result_count']")
        this.jobPostingStatusDropDownClick=page.locator("[data-auto-id='status_filter_item']");
        this.activeTextOnCard=page.locator("//div/span[contains(text(), 'Active')]");
        this.activeInStatusDropDown=page.locator("input#Active");
        this.pendingReviewInStatusDropDown=page.locator("[id='Pending Review']");
        this.statusDropdownApplyButton=this.page.getByRole('button',{name: 'Apply'})
        this.pageNavigator=this.page.locator("[class='page_link']")

    }
    async navigateToJobPostings()
    {
     await navigateToPages(this.jobPostingpageLoadObj, this.jobPosting, this.jobPostingsPageHeading,'Job Postings');
     
    }
   async createJob(record)
   {
    await this.addJobButton.click();
    await this.hospitalDropdown.click();
    await this.reactDropDownDyanamic(record.hospitalName);
    await this.page.waitForTimeout(3000);
    await this.unitDropdown.click();
    await this.reactDropDownDyanamic(record.unit);
    await this.page.waitForTimeout(500);
    await this.titleDropdown.click();
    await this.reactDropDownDyanamic(record.title);
    await this.page.waitForTimeout(500);
    await this.numberOfPositions.type(record.numberOfPositions);
    await this.shiftLenghDropdown.click();
    await this.reactDropDownDyanamic(record.shiftLength);
    await this.page.waitForTimeout(500);
    await this.shiftDropdown.click();
    await this.reactDropDownDyanamic(record.shift);
    await this.page.waitForTimeout(500);
    await this.reasonRequestDropdown.click();
    await this.reactDropDownDyanamic(record.reasonRequest);
    await this.page.waitForTimeout(500);
    await this.lengthOfAssignmentDropdown.click();
    await this.reactDropDownDyanamic(record.lengthOfAssignment);
    await this.page.waitForTimeout(500);
    await this.startDate.click();
    await this.page.waitForTimeout(1000);
     const startDateValue = new Date(record.startDate);
     const monthValue = startDateValue.toLocaleString('default', { month: 'long' });
    let index =0;
     while (index < 36) {
      let headerMonthValue = await this.monthHeader.textContent();
       if (headerMonthValue.includes(monthValue) && headerMonthValue.includes(startDateValue.getFullYear())) {
         break;
       } else {
         await this.nextMonth.click();
       }
       index++;
     }
    let dateResult = await this.calenderValue;
    for(let i=0;i< await dateResult.count();i++){
      let dateValue= await dateResult.nth(i).textContent();
      if(dateValue === startDateValue.getDate().toString()){
        await dateResult.nth(i).click();
      }
    }
    await this.notes.type(record.notes);
    await this.jobSubmitButton.click();
   await this.page.waitForTimeout(4000);
   await expect(this.toastMsg).toBeVisible();
   await expect(this.toastMsg).toHaveText("Job Posting has been added successfully.")

   }

     async jobStatus()
  {
  await this.jobPosting.click();
 await this.jobPostingStatusDropDownClick.click();
 await this.activeInStatusDropDown.click();
 await this.pendingReviewInStatusDropDown.click();
 await expect(this.activeInStatusDropDown).toBeChecked();
 await expect(this.pendingReviewInStatusDropDown).toBeChecked();
 await this.statusDropdownApplyButton.click();
 await this.page.waitForTimeout(1000);
 await this.jobPostingStatusDropDownClick.click();
 await this.page.getByRole('button',{name: 'Clear'}).click();
  expect( await this.page.locator("[id='Pending Review']").isChecked()).toBeFalsy();
  await this.page.getByRole('button',{name: 'Apply'}).click();
const pageLengthTotal=await this.resultCount.textContent();
let pageResult=pageLengthTotal.split(" ")[0];
let TotalJobResult=parseInt(pageResult);
console.log('page length is '+TotalJobResult);
// let pageValue=TotalJobResult/24;
// if(TotalJobResult%24>0)
// {
//   pageValue=TotalJobResult+1;
// } 
//      let elementCount =0;
//      for(let i=0;i<pageValue;i++)
//      {
//       const elements = await this.page.$$("//div/span[contains(text(), 'Active')]");
//       elementCount =elementCount+elements.length;
//      await this.pageNavigator.nth(i).click();
//      await this.jobPostingpageLoadObj.waitFor();
//      console.log("elements found are "+elementCount)
//      }

  } 
  async jobCreationPrePopulateData(stringifier) {
    for(let i=0;i<10;i++){

    await this.addJobButton.click();
    await this.page.waitForTimeout(3000);
    await this.hospitalDropdown.click();
    const hospitalNameValue = await this.getDropdownvaluesList();
    await this.page.waitForTimeout(7000);
    await this.unitDropdown.click();
    const unitDropdownValue = await this.getDropdownvaluesList();
    if(!unitDropdownValue){
      await this.validateExit();
      continue;
    }
    await this.page.waitForTimeout(500);
    await this.titleDropdown.click();
    const titleDropdownValue= await this.getDropdownvaluesList();
    if(!titleDropdownValue){
      await this.validateExit();
      continue;
    }
    await this.page.waitForTimeout(500);
    const numberOfPositionsValue = parseInt(Math.random().toFixed(2).replace("0.", ""));
    await this.shiftLenghDropdown.click();
    const shiftLengthValue= await this.getDropdownvaluesList();
    if(!shiftLengthValue){
      await this.validateExit();
      continue;
    }
    await this.page.waitForTimeout(500);
    await this.shiftDropdown.click();
    const shiftValue= await this.getDropdownvaluesList();
    await this.page.waitForTimeout(500);
    await this.reasonRequestDropdown.click();
    const reasonRequestValue= await this.getDropdownvaluesList();
    await this.page.waitForTimeout(1000);
    await this.lengthOfAssignmentDropdown.click();
    const lengthOfAssignmentValue= await this.getDropdownvaluesList();
    await this.page.waitForTimeout(1000);
    const startDateValue= '8/16/2023';
    const NotesValue= "Job Created on "+startDateValue+"for "+hospitalNameValue+" ";
    await this.cancelButton.click();
    await this.page.waitForTimeout(1000);
    await this.ApproveYesButton.click();
    await this.page.waitForTimeout(2000);
    await stringifier.write([hospitalNameValue, unitDropdownValue.split(' ')[0], titleDropdownValue, numberOfPositionsValue, shiftLengthValue, shiftValue, reasonRequestValue, lengthOfAssignmentValue, startDateValue, NotesValue]);
    }


  }

  async validateExit(){
    await this.page.waitForTimeout(3000);
    await this.cancelButton.click();
    await this.page.waitForTimeout(1000);
    //await this.ApproveYesButton.click();
    //await this.page.waitForTimeout(2000);  
  }
  async validateJobPostingCard(record) {
    await this.page.waitForTimeout(1000);
    if(record.hospitalName === await this.cardHospitalName.textContent())
    {
      console.log("validated hospital name succesfully");
    }

  }

  async getDropdownvaluesList() {
    let jobDropDownValuesArray = [];
    for (let i = 0; i < await this.reactDropdownSelection?.count(); i++) {
      let reactDropdownValue = await this.reactDropdownSelection.nth(i).textContent();
      jobDropDownValuesArray.push(reactDropdownValue);
    }
    const dropDownValue = await this.pickRandom(jobDropDownValuesArray);
    const index = jobDropDownValuesArray.indexOf(dropDownValue);
    console.log(dropDownValue + "******************" + index);
    if(index == -1){
      return dropDownValue;
    }
    await this.reactDropdownClick.nth(index).click();
    return dropDownValue.toString();
  }

pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
  async reactDropDownDyanamic(testData) {
    for (let i = 0; i < await this.reactDropdownSelection.count(); i++) {
      let reactDropdownValue = await this.reactDropdownSelection.nth(i).textContent();
      if (reactDropdownValue.includes(testData)) {
        await this.reactDropdownClick.nth(i).click();
      }
    }
  }
}
module.exports={JobPostings}