var mysql = require('mysql')
var cors =  require('cors')
var express = require('express');
var app = express();
app.use(express.json())
app.use(cors())


// var db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
// })
// db.connect()



app.post("/api/addUser", (req,res) => {
  const id = req.body.id;
  const gender = req.body.gender;

  const query = "INSERT... ? ?"
  console.log(query, [id, gender])

})

app.get("/api/isuser", (req,res) => {
  const id = req.query.id;

  const query = "SELECT COUNT("+id+") FROM table WHERE id = "+id+";"
  // TODO: mysql query

  console.log(query)
  if(id==1)
    res.send(true);
  if(id==2)
    res.send(false);
})




// db.end()

module.exports = app;
