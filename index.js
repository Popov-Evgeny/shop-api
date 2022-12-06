const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:3000' || 'https://popov-evgeny.github.io/shop-app/'}));
app.use(express.json());
app.use(express.static('public'));



const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));