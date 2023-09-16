import {body,validationResult,} from 'express-validator';
import JobModel from '../models/job.model.js';

const CandidatevalidateRequest = async ( req,res,next) => {
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('email is required'),
        // body('password').notEmpty().withMessage('password is required')
        body('password').isLength({min:8}).withMessage('password should have 8 characters'),
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
    return res.render('candidateregister', {
        search:false,
      errorMessage:
        validationErrors.array()[0].msg,
    });
  }
  next();
}

export default CandidatevalidateRequest;