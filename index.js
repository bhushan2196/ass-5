const express = require("express");
const fs = require("fs");
const { isArray } = require("util");

const app = express();

const PORT = 3000;
app.use(express.json());

// checking all fields are avilable or not

function checker(req, res, next) {
  let todo = req.body;
  if (todo.ID == undefined) {
    res.send("invalid request body.");
  } else if (todo.Name == undefined) {
    res.send("invalid request body.");
  } else if (todo.Rating == undefined) {
    res.send("invalid request body.");
  } else if (todo.Description == undefined) {
    res.send("invalid request body.");
  } else if (todo.Genre == undefined) {
    res.send("invalid request body.");
  } else if (todo.Cast == undefined) {
    res.send("invalid request body.");
  }
  next();
}


// data validation middleware
function validtion(req, res, next) {
  let todo = req.body;
 

  if (typeof todo.ID != "number" || todo.ID == "") {
    res.send("400 bad request. some data is incorrect.");
  }
  else if(typeof todo.Name !="string" || todo.Name=="" ){
      res.send("400 bad request. some data is incorrect.")
  }
  else if(typeof todo.Rating !="number" || todo.Rating==""){
    res.send("400 bad request. some data is incorrect.")
  }
  else if(typeof todo.Description !="string" || todo.Description==""){
    res.send("400 bad request. some data is incorrect.")
  }
  else if(typeof todo.Genre !="string" || todo.Genre==""){
    res.send("400 bad request. some data is incorrect.")
  }
  else if(!Array.isArray(todo.Cast) || todo.Cast==[]){
    res.send("400 bad request. some data is incorrect. cast")
  }

  next();
  let msg='\ndata uploaded'
  fs.appendFileSync('./res.txt',msg)
}

app.post("/", [checker, validtion], (req, res) => {
  let todo=req.body
  let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
  data.todos.push(todo);



  fs.writeFileSync('./db.json',JSON.stringify(data),"utf-8")

 

  // console.log(data);
  // 
  res.send(`${res.statusCode} data recived `);

});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
