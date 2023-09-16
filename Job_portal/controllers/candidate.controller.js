import CandidateModel from "../models/candidate.model.js";
import JobModel from "../models/job.model.js";
import JobApplyModel from "../models/jobapply.model.js";
import MailNotification from "../middlewares/MailNotification.middleware.js";

export default class CandidateController{
    getIntroPage(req,res){
        res.render("intropage",{
            errorMessage: null,
            search:false,
            RecruiterEmail:req.session.RecruiterEmail,
            RecruiterName:req.session.RecruiterName,
            CandidateEmail:req.session.CandidateEmail,
            CandidateName:req.session.CandidateName,
        });
    }

    getRegister(req,res){
        res.render("candidateregister",{ search:false,errorMessage: null});
    }

    postRegister(req,res){
        const { name, email, password } = req.body;
        console.log(req.body);
        CandidateModel.add(name,email,password);
        req.session.CandidateName = name;
        res.redirect("/candidate-login");
    }

    getloginpage(req,res){
        res.render("recruiterlogin",{
            search:false,
            errorMessage: null});
    }

    postLogin(req,res){
        const { email, password } = req.body;
        console.log(req.body);
        const user= CandidateModel.isValidUser(email, password);
        if(!user){
            return res.render('recruiterlogin', {
            errorMessage: 'Invalid Credentials',
            search:false,
        });}
        if(req.session.CandidateName===undefined){
            req.session.CandidateName=CandidateModel.getName(email);
        }
        req.session.CandidateEmail = email;
        console.log(req.session.RecruiterEmail)
        res.redirect("/candidate-dashboard");
        // res.render("intopage");
        // res.send("login success");
    }

    getDashboard(req,res){
        const Cemail = req.session.CandidateEmail;
        console.log(Cemail);
        const jobfound= JobModel.getByCandidateEmail(Cemail);
        console.log(jobfound);
        res.render("candidatedashboard",{
            jobs:jobfound,
            search:false,
            CandidateEmail:req.session.CandidateEmail,
            CandidateName:req.session.CandidateName,
        });
    }

    postApply(req,res){
        var arr=[];
        const Cmail=req.session.CandidateEmail;
        const { Name, Email, Phone } = req.body;
        const id = req.params.id;
        console.log(req.file.filename);
        const resume =
        'Resume/' + req.file.filename;
        const jobfound=JobModel.getById(id);
        jobfound.applicants+=1;
        arr=jobfound.appliedby;
        arr.push(req.session.CandidateEmail);
        jobfound.appliedby=arr;
        console.log(JobModel.getAll());
        JobApplyModel.add(id,Name,Email,Phone,resume);
        const applied=JobModel.checkApplied(jobfound,Cmail);
        var apply = JobApplyModel.getApply();
        MailNotification(Email,Name);
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
        // res.send("applied");
    }

    logout(req, res) {
        // on logout, destroy the session
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/');
          }
        });
      }
}