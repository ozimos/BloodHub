import db from "../models";
import {} from "../services/emails";

const { Hospital } = db;
const hospitalSeed = [
  {
    name: "St Charles Hospital",
    street: "3 oshinkalu nbsp close off randle avenue",
    lg: "surulere",
    state: "Lagos"
  },
  {
    name: "Citizen Medical Centre",
    street: "86 Norman Williams Street, Ikoyi",
    lg: "obalende",
    state: "Lagos"
  },
  {
    name: "Family health Hospital",
    street: "9 Akobi Crescent Off Ishaga Road, Surulere",
    lg: "surulere",
    state: "Lagos"
  },
  {
    name: "First Consultants Medical Centre",
    street: "6/24 Ikoyi Road, Ikoyi, Obalende",
    lg: "obalende",
    state: "Lagos"
  }
];

export default {
  populate: async (req, res) => {
    await Hospital.destroy({ truncate: true }); //empty DB
    for (let hospital of hospitalSeed) {
      let _r = await Hospital.create(hospital);
      console.log(_r);
    }
    res.send({
      message: "success",
      status: 200
    });
  },

  fetch: async (req, res) => {
    res.send({
      status: 200,
      message: "data fetched",

      data: await Hospital.findAll({
        attributes: {
          exclude: ["createdAt, updatedAt"]
        }
      })
    });
  }
};
