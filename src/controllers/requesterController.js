import {Client_, Hospital, Bloodrequest, User_} from '../models';
import emailServices from '../services/emails'

const User = User_;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const email = require('../services/emails')

import utils from '../../util/utils';


export default {

    createRequester: async (req, res) => {

        const reqArgs = [
            'firstName',
            'lastName',
            'email'
        ]

        let userData = utils.validateParameters(reqArgs, req.body, res);//validate parameters]
        let otp = utils.generateOTP(4);

        try {

            // await Client.destroy({truncate:true})

            let r = await Client_.create({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                otp: otp
            })


            if (r) {
                let user = await Client_.findOne({
                    where: {
                        email: userData.email
                    }
                })

                emailServices.sendRequestOTPEmail(user.dataValues, otp)
                res.send({
                    status: "success",
                    message: "Requester created"

                })
            }
        } catch (err) {

            res.send(err)
        }

    },

    fetchrequesters: async (req, res) => {

        res.send({
            status: 200,
            message: "data fetched",


            data: await Client_.findAll({
                attributes: {
                    exclude: ['createdAt, updatedAt']
                }
            })
        })

    },

    postBloodRequest: async (req, res) => {

        const reqArgs = [
            'bloodGroup',
            'hospital',
            'otp'
        ]
        console.log(req.body)


        let userData = utils.validateParameters(reqArgs, req.body, res);//validate parameters]
        let matchingBloodGroups = canMatchBlood(userData.bloodGroup)

        //check otp

        let r = await Client_.findOne({
            where: {otp: userData.otp}

        })
        if (!r) {
            return res.status(403).send({
                status: "failed",
                message: "Bad otp",

            })
        }

        //check the user DB for donors matching the blood group and hospital location

        let hospital = await Hospital.findOne({
            where: {
                id: userData.hospital
            }
        });
        console.log(hospital)

        let donorsInBloodGroupAndLg =await User.findAll({
            where: {
                lg: hospital.lg,
                bloodGroup: {
                    [Op.or]: matchingBloodGroups
                }
            }
        })



        //mail users
        for (let user of donorsInBloodGroupAndLg) {

         email.sendRequestNewBloodRequestNotificationEmail(user.dataValues)
        }

        if(!donorsInBloodGroupAndLg [0]){
            res.send({
                status:"failed",
                message:"No donor found"
            })
        }
        res.send({
            status:"success",
            message:"blood request sent out"
        })
    }
}

function canMatchBlood(group) {

    switch (group) {
        case 'A+':
            return ['A+', 'A-', 'O+', 'O-'];
            break;
        case 'A-':
            return ['A-', 'O-'];
            break;
        case 'B+':
            return ['B+', 'B-', 'O+', 'O-'];
            break;
        case 'B-':
            return ['B-', 'O-'];
            break;
        case 'AB+':
            return ['A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'O+', 'O-'];
            break;
        case 'AB-':
            return ['AB-', 'A-', 'O-'];
            break;
        case 'O+':
            return ['O+', 'O-'];
            break;
        case 'O-':
            return ['O-'];
            break;


    }


}
