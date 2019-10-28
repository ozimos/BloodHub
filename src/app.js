import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const whitelist = ['http://localhost:3000', 'https://bloodhub.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

const port = process.env.PORT;


app.use('/', require('./routes'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
