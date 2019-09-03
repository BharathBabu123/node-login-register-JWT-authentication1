const pg = require('pg');                                                            //npm install pg
const url = 'postgres://postgres:Admin@123@localhost:5432/postgres';
const client = new pg.Client(url);
const jwt = require('jsonwebtoken');                                                  //npm install jsonwebtoken

client.connect(function (err) {
  if (err) {
    return console.error('Please hit valid url');
  }
});

// ----------------------------------------------------------------------------------------------------------------------------

async  function Registrationform(req, res) {
    var user = {
      username: req.body.username,
      password: req.body.password
    }
    let InseartQuarry = `INSERT INTO handloom.registrationlogin(username,password) VALUES ('${user.username}','${user.password}')`;
  try{
    let result= await client.query(InseartQuarry)
    res.send(user)
  }
    catch(err){
  console.log('Please Enter A Valid Query' + err);
    }
  }
//`````````````````````````````````````````````
  function Loginpage(req, res) {
    var info = {
      username: req.body.username,
      password: req.body.password
    }
    let SigleIdQurey = `SELECT * from handloom.registrationlogin where username='${info.username}' and password='${info.password}'`
    client.query(SigleIdQurey)
      .then(result => {
        if (result.rows.length > 0) 
        {
          jwt.sign({ data: result.rows }, "handloomsecretekey", { expiresIn: '60s' }, (err, token) => {
            res.send({ "token": token })
          });
        }
        else {
          res.send("INVALIDE AUTHORIZATION")
        }
      })
      .catch(err => console.error("PLease Provide a Valid SingleId URL" + err))
  
  }



  function Delete(req, res) {
    id = req.body.id;
    let DeleteQuary = `DELETE from handloom.registrationlogin where id = ${id}`;
    //**IN Promise Format**/
    client.query(DeleteQuary)
      .then(result => res.send(result))
      .catch(err => console.error(err))

    }

    async function message(req, res) {
     res.json({ welcome: "YOU SUCSEESFULLY CREATED handloom" })
   }
   
   module.exports = {Lip: Loginpage, msg: message, Ref:Registrationform, Dlt: Delete} 