const mysql=require('mysql');
const express=require('express');
const path=require('path');

const app=express();
app.use(express.json());

//MYSQL connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gudli0056',
    database:'myCollege'
});

db.connect((err)=>{
    if(err)throw err;
    console.log('Connected to MYSQL');
});

//serve HTML form
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.use(express.urlencoded({extended:true}));
//insert student
app.post('/students',(req,res)=>{
    const {id,name}=req.body;
    const sql='INSERT INTO student (id,name) VALUES (?,?)';
    db.query(sql,[id,name],(err,result)=>{
        if(err)
            console.error('Error Inserting data',err);
        console.log('Inserted student',id);
        res.send('student successfully added to the DB');
    });
});

//start server
app.listen(3000,()=>{
    console.log('API running at http://localhost:3000');
});