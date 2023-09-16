import JobModel from "../models/job.model.js";
export default class JobController{
    getJobs(req,res){
        const jobs=JobModel.getAll();
        res.render("jobs",{
            jobs:jobs,
            search:true,
            RecruiterEmail:req.session.RecruiterEmail,
            RecruiterName:req.session.RecruiterName,
            CandidateEmail:req.session.CandidateEmail,
            CandidateName:req.session.CandidateName,
        });
    }

    SearchJob(req,res){
        console.log(req.body);
        const {search}=req.body;
        const jobfound= JobModel.getByName( search)
        console.log(jobfound);
        res.render("jobs",{
            jobs:jobfound,
            search:true,
            RecruiterEmail:req.session.RecruiterEmail,
            RecruiterName:req.session.RecruiterName,
            CandidateEmail:req.session.CandidateEmail,
            CandidateName:req.session.CandidateName,
        });
    }

    viewDetails(req,res){
        const id = req.params.id;
        const Cmail=req.session.CandidateEmail;
        const jobfound= JobModel.getById(id);
        console.log("job found jo view deatils me h" + jobfound);
        const applied=JobModel.checkApplied(jobfound,Cmail);
        console.log(applied);
        if (jobfound) {
            res.render('jobdetails', {
                applied:applied,
                search:false,
                job:jobfound,
                errorMessage: null,
                CandidateEmail:req.session.CandidateEmail,
                CandidateName:req.session.CandidateName,
                RecruiterEmail:req.session.RecruiterEmail,
                RecruiterName:req.session.RecruiterName,
            });
        }
    }
}
