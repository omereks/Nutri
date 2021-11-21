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
  const id = req.body.params.id;
  const gender = req.body.params.gender;

  const query = "INSERT INTO nurti.users (id, gender) VALUES ("+id+", "+gender+");"
  db.query(query)

  const query2 = "INSERT INTO nurti.recommended_values_per_users (user_id, nutrient_id, amount) \
  SELECT users.ID as user_id, recommended_values.nutrient_id as nutrient_id, recommended_values.amount as amount \
  FROM nurti.users, nurti.recommended_values \
  WHERE users.gender="+gender+" AND recommended_values.gender="+gender+" AND users.ID="+id+";" 

  db.query(query2)

  res.sendStatus(200);
})

app.get("/api/isuser", (req,res) => {
  // console.log(req)
  const id = req.query.id;
  var resultQ = 3;
  const query = "SELECT COUNT(id) AS exist FROM nurti.users WHERE id="+id+";"
  db.query(query, function (err, result, fields) {
    resultQ = result[0].exist;
    if(resultQ==1)
      res.send(true);
    if(resultQ==0)
      res.send(false);
  });
  

  // db.end();
})





module.exports = app;
