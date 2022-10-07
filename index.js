/**
 * FreeCodeCamp Timestamp microservice
 * Receive a string parameter and gives a JSON with unix and natural date format
 * @author Lior Chamla
 */
var http = require('http');
var path = require('path');
var express = require('express');
var strftime = require('strftime');
var router = express();
var server = http.createServer(router);
var cors = require('cors');
const dayjs = require('dayjs')
router.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
router.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
router.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
// static files (html, css ...)

// route on GET with a parameter we call :date
router.get("/api/:date?", (req, res) => {
  const givenDate = req.params.date;
  let date;

  // check if no date provided
  if (!givenDate) {
    date = new Date();
  } else {
    // check if unix time:
    //    number string multiplied by 1 gives this number, data string gives NaN
    const checkUnix = givenDate * 1;
    date = isNaN(checkUnix) ? new Date(givenDate) : new Date(checkUnix);
  }

  //check if valid format
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});

// listening to port and processing
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  var addr = server.address();
  console.log("Timestamp microservice listening at", addr.address + ":" + addr.port);
});