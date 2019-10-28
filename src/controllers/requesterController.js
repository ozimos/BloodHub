import { User, Hospital } from "../models";
import emailServices from "../services/emails";

import utils from "../../util/utils";

export default {
  createRequester: async (req, res) => {
    const reqArgs = ["firstName", "lastName", "email"];

    let userData = utils.validateParameters(reqArgs, req.body, res); //validate parameters]

    try {
      // await User.destroy({truncate:true})

      let r = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      });

      if (r) {
        let user = await User.findOne({
          where: {
            email: userData.email
          }
        });

        emailServices.sendRequestOTPEmail(user.dataValues);
        res.send({
          status: "success",
          message: "Requester created"
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  fetchrequesters: async (req, res) => {
    res.send({
      status: 200,
      message: "data fetched",

      data: await User.findAll({
        attributes: {
          exclude: ["createdAt, updatedAt"]
        }
      })
    });
  },

  postBloodRequest: (req, res) => {}
};
