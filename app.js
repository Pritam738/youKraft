require('dotenv').config({silent: true})
const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/UserRoute');
const MessageRoute = require('./routes/MessageRoute');
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); //Helmet helps you secure your Express apps by setting various HTTP headers.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const apiKey = req.get('API-Key')
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({error: 'unauthorised'})
  } else {
    next()
  }
})
const db = require("./models");
db.sequelize.sync();

app.use('/users', UserRoute);
app.use('/messages', MessageRoute);

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});