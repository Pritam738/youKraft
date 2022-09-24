const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/UserRoute');
const MessageRoute = require('./routes/MessageRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.use('/users', UserRoute);
app.use('/messages', MessageRoute);

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});