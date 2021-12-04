var mysql = require('mysql2')
var cors =  require('cors')
var express = require('express');
const e = require('express');
var app = express();
app.use(express.json())
app.use(cors())

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mako1234',
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
/************************************************************************************************
 * get: return foods with prefix (max 5) of the input.
*************************************************************************************************/
app.get("/api/foodexist", (req,res) =>{
  const use = 'USE nurti;'
  db.query(use)
  const prefix = req.query.foodname
  //const prefix = "\""+req.query.foodname+"%"+"\"" //req.query.foodname
  //const valuer = '+'+req.query.foodname+'+'+'%'
  console.log(prefix)
  const prefixquery = "SELECT description FROM food WHERE description LIKE '"+prefix+"%'"+" LIMIT 5;"
  console.log(prefixquery)
  db.query(prefixquery,function(err,result,fields){
    if (err){
      console.log(err)
    }else{
      console.log(result[0])
      let suggest = result.map(food => food.description);
      console.log(suggest)
      res.send(suggest)
    }

  })
}



);

/************************************************************************************************
 * post: add food to food eaten 
*************************************************************************************************/
app.post("/api/addFood", (req,res) =>{
    const foodAdd=req.body.params.foodValue
    const use = 'USE nurti;'
    db.query(use)
    console.log(req)
    // check if the food exists in the foods table
    const idquery = "SELECT food_id FROM food WHERE description='"+foodAdd+"';"  // the id of the food (return null if it dont exists)
    db.query(idquery,function(err,result,fields){
      if(err){
        console.log(err)
      }else{
        if(result.length == 0){
          res.send("false")
        }else{
          foodEatenObject = "hi"//{id:req.body.params.foodId,user_id:"anonymous",food_id=result,amount:req.body.params.foodAmount}
          console.log(result[0].food_id)
          food_id = result[0].food_id
          const insertQuery = "INSERT INTO nurti.food_eaten (id,user_id,food_id,amount) VALUES ("+req.body.params.foodId+","+req.body.params.userId+","+food_id+","+req.body.params.foodAmount+")"
          console.log(insertQuery) // for test
          db.query(insertQuery,function(err,result,fields){
            if(err){
              console.log(err)
            }else{
              
            }
          })
          res.send("True")
        }
      }
    })
})
/************************************************************************************************
 * post update the amount of food in food_eaten 
*************************************************************************************************/
app.post("/api/updateAmount",(req,res) =>{
  const use = "USE nurti;"
  db.query(use)
  console.log(req.body.params.foodAmount)
  console.log(req.body.params.foodId)
  const changeAmountQuery = "UPDATE food_eaten SET amount="+req.body.params.foodAmount+" WHERE id="+req.body.params.foodId+";"
  console.log(changeAmountQuery)
  db.query(changeAmountQuery,function(err,result,fields){
    if(err){
      console.log(err)
    }else{
      res.send("complete")
    }
  })
})

/************************************************************************************************
 * post delete from food_eaten 
*************************************************************************************************/
app.post("/api/deleteFood",(req,res) =>{
  const use = "USE nurti;"
  db.query(use)
  console.log(req)
  const foodRemoveName=req.body.params.foodValue
  console.log(foodRemoveName)
  // find  the food id 
  const idquery = "SELECT food_id FROM food WHERE description='"+foodRemoveName+"';"  // the id of the food (return null if it dont exists)
  db.query(idquery,function(err,result,fields){
    if(err){
      console.log(err)
    }else{
      console.log(result)
      food_id = result[0].food_id // the food id
      const deleteQuery = "DELETE FROM food_eaten WHERE food_id="+food_id+";"
      console.log(deleteQuery)
      db.query(deleteQuery)
    }
  })
})

module.exports = app;
