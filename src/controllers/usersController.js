import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../models";
import {} from "../services/emails";

dotenv.config();
const saltRound = 13;
const { User, Donor } = db;
export default class UsersController {
  static signup(req, res) {
    return User.findOne({
      where: {
        email: req.body.email.toLowerCase()
      }
    }).then(users => {
      if (users) {
        return res.status(409).json({
          message: "User already exists"
        });
      }
      if (req.body.password !== req.body.verifyPassword) {
        return res.status(400).json({ message: "password did not match" });
      } // password encrypt at 2 raised to power 13
      const myPassword = bcrypt.hashSync(req.body.password, saltRound);
      return Donor.create(
        {
          user: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            password: myPassword,
            street: req.body.street,
            lg: req.body.lg,
            state: req.body.state,
            email: req.body.email.toLowerCase()
          },
          bloodGroup: req.body.bloodGroup,
          document: req.body.document
        },
        {
          include: [{ association: "user" }]
        }
      )
        .then(({ user }) => {
          return res.status(201).json({
            message: "Your account has been created!, Your details",
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        })
        .catch(error =>
          res.status(500).json({ message: "Server Error", error })
        );
    });
  }

  static signin(req, res) {
    User.findOne({
      where: { email: req.body.email.toLowerCase() }
    }).then(user => {
      console.log(user);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong email or password"
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, hash) => {
        if (!hash) {
          return res
            .status(403)
            .json({ success: false, message: "Wrong email or password" });
        } else if (hash) {
          const payload = {
            email: req.body.email.toLowerCase()
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h"
          });
          return res.status(200).json({
            success: true,
            message: "Login Successful!",
            token,
            user
          });
        }
      });
    });
  }
}
