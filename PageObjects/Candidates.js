const { expect } = require("@playwright/test");
const {navigateToPages}= require('../Utilities/navigationToPages')
class Candidates
{
    constructor(page)
    {
        this.page=page;
        this.candidates= page.getByRole('link', { name: 'Candidates' });
        this.candidatesPageLoadObj= page.locator("[data-auto-id='candidate_card_0']");
        this.CandidatesPageHeading= page.getByRole('heading', { name: 'Candidates' })
    }
    async navigateToCandidates()
    {
        await navigateToPages(this.candidatesPageLoadObj, this.candidates, this.CandidatesPageHeading,'Candidates')
    }
}
module.exports={Candidates}