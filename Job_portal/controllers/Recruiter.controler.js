import JobModel from "../models/job.model.js";
import RecruiterModel from "../models/recruiter.model.js"
import JobApplyModel from "../models/jobapply.model.js";
export default class RecruiterController{
    
    getloginpage(req,res){
        res.render("recruiterlogin",{
            errorMessage: null,
            search:false,
        });
    }

    getRegister(req,res){
        res.render("recruiterRegister",{search:false, errorMessage: null});
    }
    
    postRegister(req,res){
        const { name, email, password } = req.body;
        console.log(req.body);
        RecruiterModel.add(name,email,password);
        req.session.RecruiterName = name;
        res.redirect("/recruiter-login");
    }

    postLogin(req,res){
        const { email, password } = req.body;
        console.log(req.body);
        const user= RecruiterModel.isValidUser(email, password);
        console.log("user dekho:"+user);
        if(!user){
            return res.render('recruiterlogin', {
            errorMessage: 'Invalid Credentials',
            search:false,
        });}
        if(req.session.RecruiterName===undefined){
            req.session.RecruiterName=RecruiterModel.getName(email);
        }
        req.session.RecruiterEmail = email;
        console.log(req.session.RecruiterEmail)
        res.redirect("/recruiter-dashboard");
        // res.render("recruiterdashboard");
    }

    getDashboard(req,res){
        const Remail = req.session.RecruiterEmail;
        console.log(Remail);
        const jobfound= JobModel.getByRecruiterEmail(Remail);
        console.log(jobfound);
        res.render("recruiterdashboard",{
            jobs:jobfound,
            search:false,
            errorMessage:null,
            RecruiterEmail:req.session.RecruiterEmail,
            RecruiterName:req.session.RecruiterName,
        });
    }

    addJob(req,res){
        console.log(req.body);
        const date= JobModel.getDate();
        const postedby= req.session.RecruiterEmail;
        const {cname , roles, location, pack, deadline, opening, skills }=req.body;
        JobModel.add(
            cname ,
            roles,
            deadline,
            opening,
            0,
            date,
            location,
            pack,
            skills,
            postedby,
        )
        const jobs=JobModel.getAll();
        console.log(jobs);
        res.redirect("/recruiter-dashboard");
    }

    getEditJob(req,res){
        const id = req.params.id;
        const jobfound=JobModel.getById(id);
        res.render("editjob",{
            errorMessage:null,
            job:jobfound,
            search:false,
            RecruiterEmail:req.session.RecruiterEmail,
            RecruiterName:req.session.RecruiterName,
        });
    }

    postEditJob(req,res){
        console.log(req.body);
        const id = req.params.id;
        console.log("ye h id: " + id);
        const {cname , roles, location, pack, deadline, opening, skills }=req.body;
        // console.log(cname , roles, location, pack, deadline, opening, skills );
        JobModel.edit(id,cname , roles, location, pack, deadline, opening, skills);
        res.redirect("/recruiter-dashboard")
    }

    deleteJob(req,res){
        const id = req.params.id;
        console.log(" bhai controller me aa gaya ")
        const jobfound= JobModel.delete(id);
        res.redirect("/recruiter-dashboard");
    }
    
    viewApplies(req, res){
        const id = req.params.id;
        const appliedjobs=JobApplyModel.getById(id);
        console.log(appliedjobs);
        res.render("viewapplies",{
            jobs:appliedjobs,
            search:false,
            RecruiterEmail:req.session.RecruiterEmail,
            RecruiterName:req.session.RecruiterName,
        });
    }

    logout(req, res) {
        // on logout, destroy the session
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/login');
          }
        });
    }
}