import express from 'express';
import bodyParser from 'body-parser';

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;


app.use('/', require('./routes'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
