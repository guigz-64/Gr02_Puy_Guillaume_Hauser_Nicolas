var level = require('level');
var db = level('./db',{valueEncoding:'json'});
const express = require('express');
var router = express.Router();

    router.get('/api/account/signup',(req,res)=>{
        res.send('Welcome to our page');
    })

    router.post('/api/account/signup',(req,res,next)=>{
        const{body}=req;
        //console.log(req.body);
        const{
            username,
            email,
            password
        } = body;
        
    
        if (!username){
            res.send('First name cannot be blank.');
            //res.end();
    
        }
        
        //email=email.toLowerCase();
        if (!email){
            return res.send('Email cannot be blank.');
            //res.end();
    
        }
        db.get(username, function(err, username){
            if(err){
                
                res.send('Server don t respond')
                //res.end();
            }else if (username!==null){
                 res.send("It already exists")
                 //res.end();
    
            }                 
                 });
    
                 //Save a new user 
                 db.put(username,{email,password},function(err){
                     res.send("Welcome to our website  !");
                     //res.end();
                     db.get(username,function(err,username){
                         console.log(username);
                     })
                 })
     
    })

module.exports = router;

