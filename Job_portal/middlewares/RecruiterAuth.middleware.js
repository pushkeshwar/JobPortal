export const RecruiterAuth = (req, res, next) => {
    if (req.session.RecruiterEmail) {
      next();
    } else {
      res.redirect('/recruiter-login');
    }  };
  