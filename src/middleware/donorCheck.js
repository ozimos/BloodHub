import { User } from '../models';

function donorCheck(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email.toLowerCase()
    }
  }).then((user) => {
    if (!user.donor) {
      return res.status(404).send({
        success: false,
        message: 'You are not signed up as a donor.'
      });
    } else {
      next();
    }
  });
}

module.exports = donorCheck;