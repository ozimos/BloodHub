import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {BloodTypes} from '../models';


const bloodTypesSeed = [
    {
        bloodType:"A+"
    },  {
        bloodType:"A-"
    },{
        bloodType:"B-"
    },{
        bloodType:"B+"
    },{
        bloodType:"O-"
    },{
        bloodType:"O+"
    },{
        bloodType:"AB+"
    },{
        bloodType:"AB-"
    }

]


export default {


    populate: async (req, res) => {
        await BloodTypes.destroy({truncate:true}); //empty DB
        for (let type of bloodTypesSeed) {

            let _r = await BloodTypes.create(type)
            console.log(_r)
        }
        res.send({
            message:"success",
            status:200
        })
    },

    fetch: async (req, res) => {

        console.log(await BloodTypes.findAll({attributes:{
                exclude: ['createdAt, updatedAt']
            }}))
        res.send({
            status: 200,
            message:"data fetched",

            data:await BloodTypes.findAll({attributes:{
                    exclude: ['createdAt, updatedAt']
                }})
        })
    }
}
