require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs');
const https = require('https');

const app = require('./app')
const port = process.env.PORT;
https.createServer({
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
  },app ).listen(port);


// app.listen(port, () => {
//     console.log(`Server is running at port ${port}`);
// })
