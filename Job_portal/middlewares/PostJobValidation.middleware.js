import {body,validationResult,} from 'express-validator';
import JobModel from '../models/job.model.js';

const PostJobValidation = async ( req,res,next) => {
    const rules = [
        body('cname').notEmpty().withMessage('Name cannot be empty'),
        body('roles').notEmpty().withMessage('please select one role'),
        body('deadline').notEmpty().withMessage('Deadline cannot be empty'),
        body('opening').notEmpty().withMessage('Opening cannot be empty'),
        body('location').notEmpty().withMessage('Location cannot be empty'),
        body('pack').notEmpty().withMessage('Package cannot be empty'),
        body('skills').notEmpty().withMessage('Skills cannot be empty'),
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
    const jobfound= JobModel.getById(id);
    return res.render('recruiterdashboard', {
        job:jobfound,
        search:false,
      errorMessage:
        validationErrors.array()[0].msg,
    });
  }
  next();
}

export default PostJobValidation;