const express = require("express")
const app = express()
const cors=require('cors')
const mysql2 = require("mysql2")
const { urlencoded } = require("body-parser")

const config= {

    host:"127.0.0.1",
    user:"root",
    password:"root",
    database: "kardili"
}
const connection =mysql2.createConnection(config)

connection.connect((err)=> err ? console.log(err): console.log('db connected'))
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))  


app.get("/api/getLinaA7NA",(req,res)=>{
    const sqlSelect = "SELECT * FROM store_owner"
    connection.query(sqlSelect,(err,result)=>{
        err ?   console.log(err) :  res.status(200).json(result)
    })
})
app.get("/api/getClient",(req,res)=>{
    const idOwner=req.body.store_owner_id_owner;
    const sqlSelect = "SELECT * FROM clients WHERE store_owner_id_owner=?"
    connection.query(sqlSelect,[idOwner],(err,result)=>{
        err ?   console.log(err) :  res.status(200).json(result)
    })
})


app.post("/api/insertOwner",(req,res)=>{
    console.log(req.body);
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
app.delete('/api/deleteClient/:idclient',(req,res)=>{
    const idclient = req.params.idclient
    const sqlDelete = "DELETE FROM clients WHERE idclients= ? AND balance=0 "
    connection.query(sqlDelete,idclient,(err,result)=>{
        err ?   console.log(err) :  res.status(200).json('done')
    })
})
app.put("/api/updateBalance+/:idclients", (req, res) => {
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
app.put("/api/updateBalance-/:idclients", (req, res) => {
    const toAdd = req.body.balance; 
    const idclient = req.params.idclients; 
    const sqlUpdate = "UPDATE clients SET balance = balance-? WHERE idclients = ?"; 
    connection.query(sqlUpdate, [toAdd, idclient], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json('done');
        }
    });
});
app.listen(3001,()=>{
    console.log("running on port 3001")
})
