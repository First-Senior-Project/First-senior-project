const express = require("express")
const app = express()
const cors=require('cors')
const mysql2 = require("mysql2")
const { urlencoded } = require("body-parser")

const config= {

    host:"127.0.0.1",
    user:"root",
    password:"chimonen3sal",
    database: "kardili"
}
const connection =mysql2.createConnection(config)

connection.connect((err)=> err ? console.log(err): console.log('db connected'))
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))  

app.get("/api/getOneOwner/:id_owner",(req,res)=>{
  const idowner=req.params.id_owner;
  const sqlSelect = "SELECT * FROM store_owner WHERE id_owner=?"
  connection.query(sqlSelect,[idowner],(err,result)=>{
      err ?   console.log(err) :  res.status(200).json(result)
  })
})
app.get("/api/getOwners",(req,res)=>{
    const sqlSelect = "SELECT * FROM store_owner"
    connection.query(sqlSelect,(err,result)=>{
        err ?   console.log(err) :  res.status(200).json(result)
    })
})
app.get("/api/getClient/:store_owner_id_owner",(req,res)=>{
    const idOwner=req.params.store_owner_id_owner;
    const sqlSelect = "SELECT * FROM clients WHERE store_owner_id_owner=?"
    connection.query(sqlSelect,[idOwner],(err,result)=>{
        err ?   console.log(err) :  res.status(200).json(result)
    })
})
app.get("/api/getOne/:idclients",(req,res)=>{
    const idclients=req.params.idclients;
    const sqlSelect = "SELECT * FROM clients WHERE idclients=?"
    connection.query(sqlSelect,[idclients],(err,result)=>{
        err ?   console.log(err) :  res.status(200).json(result)
    })
})
app.get("/api/getConditionally",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const sqlSelect = "SELECT idclients FROM clients WHERE email=? AND password=?"
    connection.query(sqlSelect,[email,password],(err,result)=>{
        err ?   console.log(err) :  res.status(200).json(result)
    })
})



app.post("/api/insertOwner",(req,res)=>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email=req.body.email;
    const password=req.body.password;
    const sqlInsert = "INSERT INTO store_owner (first_name,last_name,email,password) VALUES (?,?,?,?)"
    connection.query(sqlInsert,[first_name,last_name,email,password],(err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error inserting data into database.' });
        } else {
            res.status(201).json('posted');
        }
    });
      })

      function checkCredentials(email, password) {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM clients WHERE email = ? AND password = ?"; 
          connection.query(query, [email, password], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      }

      
  app.post('/api/authenticateClient', (req, res) => {
    const { email, password } = req.body;
    checkCredentials(email, password)
      .then((authenticated) => {
        if (authenticated) {
          res.status(200).json({ message: 'Authentication successful',data:authenticated[0] });
        } else {
          res.status(401).json({ message: 'Authentication failed' });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
  function checkCredentialss(email, password) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM store_owner WHERE email = ? AND password = ?"; 
      connection.query(query, [email, password], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
app.post('/api/authenticateOwner', (req, res) => {
const { email, password } = req.body;
checkCredentialss(email, password)
  .then((authenticated) => {
    if (authenticated) {
      res.status(200).json({ message: 'Authentication successful',data:authenticated[0] });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});


app.post("/api/insertClient",(req,res)=>{
    console.log(req.body);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email=req.body.email;
    const password=req.body.password;
    const idOwner=req.body.store_owner_id_owner;
    const sqlInsert = "INSERT INTO clients (first_name,last_name,email,password,store_owner_id_owner) VALUES (?,?,?,?,?)"
    connection.query(sqlInsert,[first_name,last_name,email,password,idOwner],(err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error inserting data into database.' });
        } else {
            res.status(201).json('posted');
        }
    });
      })
      app.delete('/api/deleteClient/:idclient', (req, res) => {
        const idclient = req.params.idclient;
        const sqlDelete = "DELETE FROM clients WHERE idclients= ? AND balance=0";
        connection.query(sqlDelete, idclient, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json('Error deleting client');
          } else {
            res.status(200).json('Client deleted successfully');
          }
        });
      });
app.put("/api/addBalance/:idclients", (req, res) => {
    const toAdd = req.body.balance;
    const idclient = req.params.idclients; 
    const sqlUpdate = "UPDATE clients SET balance = balance+? WHERE idclients = ?"; 
    connection.query(sqlUpdate, [toAdd, idclient], (err, result) => {
        if (err) {
            console.log(err); 
        } else {
            res.status(200).json('done');
        }
    });
});
app.put("/api/retrieveBalance/:idclients", (req, res) => {
    const toAdd = req.body.balance; 
    const idclient = req.params.idclients; 
    const sqlUpdate = "UPDATE clients SET balance = balance - ? WHERE idclients = ?"

    connection.query(sqlUpdate, [toAdd, idclient], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json('done');
        }
    });
});

app.post("/api/insertInquiry",(req,res)=>{
  console.log(req.body);
  const name = req.body.name;
  const email=req.body.email;
const inquiry=req.body.inquiry;
  const sqlInsert = "INSERT INTO contacts (name,email,inquiry) VALUES (?,?,?)"
  connection.query(sqlInsert,[name,email,inquiry],(err,result)=>{
      if (err) {
          console.log(err);
          res.status(500).json({ error: 'Error inserting data into database.' });
      } else {
          res.status(201).json('posted');
      }
  });
    })

app.listen(3001,()=>{
    console.log("running on port 3001")
})