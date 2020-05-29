require('dotenv').config();

import express from "express";
import { createConnection } from 'typeorm';
import * as ormConfig from '../ormconfig.js';
import bodyParser from 'body-parser';

const AuthRoutes = require('./Api/Users/UserRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

createConnection(ormConfig).then(async (connection) => {
  app.use('/', AuthRoutes);

  app.listen(5000, () => {
      console.log('Server Working');
  });
}).catch(err => {
  console.log(err);
});


module.exports = app;