import express from 'express';
const app = express();

require('dotenv').config();

const port = process.env.PORT


app.use('/', require('./routes'))

app.listen(port, () => console.log(`App listening on port ${port}!`))