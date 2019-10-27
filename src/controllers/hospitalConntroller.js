import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {Hospital} from '../models';
import {} from '../services/emails'


const hospitalSeed = [
    {
        name: "St Charles Hospital",
        address: "3 oshinkalu nbsp close off randle avenue",
        lg: "surulere"
    },
    {
        name: "Citizen Medical Centre",
        address: "86 Norman Williams Street, Ikoyi, Lagos Nigeria",
        lg: "obalende"
    },
    {
        name: "Family health Hospital",
        address: "9 Akobi Crescent Off Ishaga Road, Surulere, Lagos Nigeria",
        lg: "surulere"
    },
    {
        name: "First Consultants Medical Centre",
        address: "6/24 Ikoyi Road, Ikoyi, Obalende, Lagos, Nigeria",
        lg: "obalende"
    }
]


export default {


    populate: async (req, res) => {
        await Hospital.destroy({truncate:true}); //empty DB
        for (let hospital of hospitalSeed) {

            let _r = await Hospital.create(hospital)
            console.log(_r)
        }
 res.send({
     message:"success",
     status:200
 })
    },

    fetch: async (req, res) => {

        res.send({
            status: 200,
            message:"data fetched",

            data:await Hospital.findAll({attributes:{
                    exclude: ['createdAt, updatedAt']
                }})
        })
    }
}
