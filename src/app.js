import express from 'express';
import bodyParser from 'body-parser';

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://bloodhub.herokuapp.com/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = process.env.PORT;


app.use('/', require('./routes'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
