const express = require('express');//npm install express
var app = express();
var cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');//npm install body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const loginpage = require('./loginpage');

app.post("/login", loginpage.Lip);
// registration using Async Await
app.post("/Registration",async(req,res,next)=>{
 return loginpage.Ref(req,res,next)
}
 );


//======================TOKEN-VALIDATION==========================//

app.use((req, res, next) => {
  const bearerHeader = req.headers['authorization']
  console.log(bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    console.log(token);

    jwt.verify(token, "handloomsecuritykey", function (err, authData) {
      if (err) {
        res.send("invalid token ps provide a valid token")
      }
      else {
        next();
      }
    });

  }
  else {
    res.send("undefine authorization");
  }
})
//===========XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX==========//
app.post('/DeleteData', loginpage.Dlt);
// app.post('./Registrationpage' , loginpage.Ref);
app.get("/message", loginpage.msg);
app.listen(9999, function () {

  console.log("Example app listening at http://localhost:9999")
});