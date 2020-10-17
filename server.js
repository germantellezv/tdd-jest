const express = require("express");
const axios = require('axios');
const { users }= require('./endpoints/index')
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const userHandlers = users({axios})
app.get("/", userHandlers.get);
app.post("/", );
app.put("/:id", );
app.delete("/:id", );

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


