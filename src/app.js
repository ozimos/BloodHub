import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {config} from 'dotenv'
import routes from './routes'

const app = express();

config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const whitelist = ["http://localhost:3000", "https://bloodhub.herokuapp.com"];

const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));
app.options("*", cors(corsOptionsDelegate));

app.use(routes);

export default app