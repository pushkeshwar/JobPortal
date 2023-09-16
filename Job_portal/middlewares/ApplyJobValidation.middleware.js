import {body,validationResult,} from 'express-validator';
import JobModel from '../models/job.model.js';

const ApplyJobValidation = async ( req,res,next) => {
    const rules = [
        body('Name').notEmpty().withMessage('Name cannot be empty'),
        body('Email').notEmpty().withMessage('Email select one role'),
        body('Phone').notEmpty().withMessage('Phone cannot be empty'),
        body('resume').custom((value, { req }) => {
            if (!req.file) {
              throw new Error('please Upload Resume');
            }
            return true;
          }),
        // body('password').isLength({min:8}).withMessage('password should have 8 characters'),
    ]


    // 2. run those rules.
    await Promise.all(
    rules.map((rule) => rule.run(req))
    );

    // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);
  console.log(validationErrors);
  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    const id = req.params.id;
    const Cmail=req.session.CandidateEmail;
    const jobfound=JobModel.getById(id);
    const applied=JobModel.checkApplied(jobfound,Cmail);
    return res.render('jobdetails', {
        job:jobfound,
        search:false,
        applied:applied,
        CandidateEmail:req.session.CandidateEmail,
        CandidateName:req.session.CandidateName,
        RecruiterEmail:req.session.RecruiterEmail,
        RecruiterName:req.session.RecruiterName,
      errorMessage:
        validationErrors.array()[0].msg,
    });
  }
  next();
}

export default ApplyJobValidation;
