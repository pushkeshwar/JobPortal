import express from "express";
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import CandidateController from "./controllers/candidate.controller.js";
import RecruiterController from "./controllers/Recruiter.controler.js";
import JobController from "./controllers/job.contrller.js";
import RecruitervalidateRequest from "./middlewares/Recruitervalidation.middleware.js";
import session from 'express-session';
import CandidatevalidateRequest from "./middlewares/Candidatevalidation.middleware.js";
import { uploadFile } from "./middlewares/fileupload.middleware.js";
import PostJobValidation from "./middlewares/PostJobValidation.middleware.js";
import ApplyJobValidation from "./middlewares/ApplyJobValidation.middleware.js";
import { CandidateAuth } from "./middlewares/CandidateAuth.middleware.js";
import { RecruiterAuth } from "./middlewares/RecruiterAuth.middleware.js";



const candidatecontroller= new CandidateController();
const recruitercontroller=new RecruiterController();
const jobcontroller=new JobController();
const server=express();

server.use(
    session({
      secret: 'SecretKey',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
);

server.use('/public',express.static('public'));
server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set('view engine', 'ejs');
server.set(
  'views',
  path.join(path.resolve(),'views')
);

server.get("/",candidatecontroller.getIntroPage);
server.get("/recruiter-login",recruitercontroller.getloginpage);
server.post("/recruiter-login",recruitercontroller.postLogin);
server.get("/jobs",jobcontroller.getJobs);
server.post("/jobs",jobcontroller.SearchJob)
server.get("/recruiter-register",recruitercontroller.getRegister);
server.post("/recruiter-register",RecruitervalidateRequest,recruitercontroller.postRegister);
server.get("/details/:id",jobcontroller.viewDetails);
server.get("/recruiter-dashboard",RecruiterAuth,recruitercontroller.getDashboard);
server.post("/recruiter-dashboard",RecruiterAuth,PostJobValidation,recruitercontroller.addJob);

server.get("/candidate-register",candidatecontroller.getRegister);
server.post("/candidate-register",CandidatevalidateRequest,candidatecontroller.postRegister);

server.get("/candidate-login",candidatecontroller.getloginpage);
server.post("/candidate-login",candidatecontroller.postLogin);

server.get("/candidate-dashboard",CandidateAuth,candidatecontroller.getDashboard);
server.get("/logout",candidatecontroller.logout);
server.get("/logout",recruitercontroller.logout);

server.post("/details/:id",uploadFile.single('resume'),CandidateAuth, ApplyJobValidation,candidatecontroller.postApply)

server.get("/applicants/:id",RecruiterAuth,recruitercontroller.viewApplies);

server.get("/update/:id",RecruiterAuth,recruitercontroller.getEditJob);
server.post("/update/:id",RecruiterAuth,recruitercontroller.postEditJob)

server.post("/delete/:id",RecruiterAuth,recruitercontroller.deleteJob);



server.listen(5000, () => {
    console.log('Server is running on port 5000');
});