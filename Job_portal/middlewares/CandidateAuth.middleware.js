export const CandidateAuth = (req, res, next) => {
    if (req.session.CandidateEmail) {
      next();
    } else {
      res.redirect('/candidate-login');
    }};
  