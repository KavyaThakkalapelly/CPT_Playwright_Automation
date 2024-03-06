const {LoginPage}= require("./LoginPage");
const {Dashboard}= require("./Dashboard");
const {UserMaintenance}= require("./UserMaintenance");
const {JobPostings}= require("./JobPostings");
const {Candidates}=require("./Candidates");
const {Assigned}=require("./Assigned");
const {StartsStops}=require("./StartsStops"); 
const {FinancialReport}= require("./FinancialReport");
class POManager
{
    constructor(page)
    {
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.dashBordPage= new Dashboard(this.page);
        this.userMaintenace= new UserMaintenance(this.page);
        this.jobPostings=new JobPostings(this.page);
        this.candidates=new Candidates(this.page);
        this.assigned=new Assigned(this.page);
        this.startsstops= new StartsStops(this.page);
        this.financialReports=new FinancialReport(this.page);

    }
    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashBordPage;
    }
    getUserMaintenancePage()
    {
        return this.userMaintenace;
    }
    getJobPostingsPage()
    {
        return this.jobPostings;
    }
    getCandidatesPage()
    {
        return this.candidates;
    }
    getAssignedPage()
    {
        return this.assigned;
    }
    getStartsStopsPage()
    {
        return this.startsstops;
    }
    getFinancialReportPage()
    {
        return this.financialReports;
    }
}
module.exports={POManager}
