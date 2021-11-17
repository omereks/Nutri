var mysql = require('mysql2')
var cors =  require('cors')
var express = require('express');
var app = express();
app.use(express.json())
app.use(cors())

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  insecureAuth : false,
})

db.connect()

// q = "SELECT * FROM nurti.nutrient;"
// db.query(q, function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });


app.post("/api/addUser", (req,res) => {
  const id = req.body.id;
  const gender = req.body.gender;

  const query = "INSERT... ? ?"
  console.log(query, [id, gender])

})

app.get("/api/isuser", (req,res) => {
  // console.log(req)
  const id = req.query.id;
  var resultQ = 3;
  const query = "SELECT COUNT(id) AS c FROM nurti.users WHERE id="+id+";"
  db.query(query, function (err, result, fields) {
    console.log(result);
    resultQ = result[0].c;
    console.log(resultQ)
    if(resultQ==1)
      res.send(true);
    if(resultQ==0)
      res.send(false);
  });
  

  // db.end();
})





module.exports = app;
