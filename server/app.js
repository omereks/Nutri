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
  const prefixquery = "SELECT description FROM nurti.food WHERE description LIKE '"+prefix+"%'"+" LIMIT 5;"
  db.query(prefixquery,function(err,result,fields){
    if (err){
      console.log(err)
    }else{
      let suggest = result.map(food => food.description);
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
    // check if the food exists in the foods table
    foodAddString = JSON.stringify(foodAdd)
    const idquery = "SELECT food_id FROM nurti.food WHERE description="+foodAddString+";"  // the id of the food (return null if it dont exists)
    db.query(idquery,function(err,result,fields){
      if(err){
        console.log(err)
      }else{
        if(result.length == 0){
          res.send("false")
        }else{
          food_id = result[0].food_id
          const insertQuery = "INSERT INTO nurti.food_eaten (user_id,food_id,amount) VALUES ("+req.body.params.userId+","+food_id+","+req.body.params.foodAmount+")"
          db.query(insertQuery,function(err,result,fields){
            if(err){
              console.log(err)
            }else{
              
            }
          })
          res.send(food_id.toString())
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
  const changeAmountQuery = "UPDATE nurti.food_eaten SET amount="+req.body.params.foodAmount+" WHERE food_id="+req.body.params.foodId+" AND user_id="+req.body.params.userId+";"
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
  const userId = req.body.params.userId
  db.query(use)
  const foodRemoveName=req.body.params.foodValue
  // find  the food id 
  foodToRemove = JSON.stringify(foodRemoveName)
  const idquery = "SELECT food_id FROM nurti.food WHERE description="+foodToRemove+";"  // the id of the food (return null if it dont exists)
  db.query(idquery,function(err,result,fields){
    if(err){
      console.log(err)
    }else{
      food_id = result[0].food_id // the food id
      const deleteQuery = "DELETE FROM nurti.food_eaten WHERE food_id="+food_id+" AND user_id="+userId+";"
      db.query(deleteQuery)
    }
  })
})
/************************************************************************************************
 * get: get the food list of specific user 
*************************************************************************************************/
app.get("/api/userFoodList",(req,res) => {
  const use = "USE nurti;"
  db.query(use)
  var foodList = []
  const userQueryFood = "SELECT food_eaten.food_id,food.description,food_eaten.amount FROM nurti.food_eaten INNER JOIN nurti.food ON food_eaten.food_id = food.food_id WHERE food_eaten.user_id="+req.query.userID+";"
  db.query(userQueryFood,function(err,result,fields){
    if(err){
      console.log(err)
    }else{
      foodList = result
      res.send(foodList)
    }
  })
  //res.send("hi")
})

module.exports = app;
