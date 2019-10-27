import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models';

dotenv.config();
const saltRound = 13;

export default class UsersController {
  static signup(req, res) {
    return User.findOne({
      where: {
        email: req.body.email.toLowerCase()
      }
    }).then((users) => {
      // checks to see if user already exist
      if (users) {
        return res.status(409).json({
          message: 'User already exists'
        });
      } // ensures both entries to password match
      if (req.body.password !== req.body.verifyPassword) {
        // passwords must match
        return res.status(400).json({ message: 'password did not match' });
      } // password encrypt at 2 raised to power 13
      const myPassword = bcrypt.hashSync(req.body.password, saltRound);
      // creates account
      return User.create({
        name: req.body.name,
        phone: req.body.phone,
        password: myPassword,
        address: req.body.address,
        email: req.body.email.toLowerCase(),
        bloodGroup: req.body.bloodGroup,
        document: req.body.document
      })
        .then((user) => {
          const message = 'Your account has been created!, Your details';
          return res.status(201).json({
            message,
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        })
        .catch(error =>
          res.status(500).json({ message: 'Server Error', error }));
    });
  }

  static signin(req, res) {
    User.findOne({
      where: { email: req.body.email.toLowerCase() }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'Wrong email or password'
          });
        }
        bcrypt.compare(req.body.password, user.password, (err, hash) => {
          if (!hash) {
            return res
              .status(403)
              .json({ success: false, message: 'Wrong email or password' });
          } else if (hash) {
            const payload = {
              name: req.body.name,
              phone: req.body.phone,
              address: req.body.address,
              email: req.body.email.toLowerCase(),
              bloodGroup: req.body.bloodGroup,
              document: req.body.document
            };
            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: '24h'
            });
            return res.status(200).json({
              success: true,
              message: 'Login Successful!',
              token,
              user
            });
          }
        });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          error
        });
      });
  }
}