const express = require("express");
const axios = require('axios');
const { posts }= require('./endpoints/index')
const { authenticate } = require('./middlewares')
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const postsHandlers = users({axios})
app.post("/", authenticate,postsHandlers.post);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


