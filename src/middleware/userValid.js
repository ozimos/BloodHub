import { User } from '../models';

function userValid(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email.toLowerCase()
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'This user is not signed up.'
      });
    } else {
      next();
    }
  });
}

module.exports = userValid;