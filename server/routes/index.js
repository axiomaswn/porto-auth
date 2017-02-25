var express = require('express');
var router = express.Router();
const models = require('../models/user')
const hash = require('password-hash');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  let user = {
    username : req.body.username,
    password : req.body.password
  }
  models.findOne({username : user.username},function(err,data){

        if(!data){
        res.json({notfound:'user ga ketemu'})
        }
        if(data)
        {
          if (hash.verify(user.password, data.password)) {
            var token = jwt.sign({
              username: data.username
            },'SECRETNIH')
            res.json({
              initoken:token,
              username:user.username})
          }
          else {
            res.json({message:'salah password coy'})
          }
        }




  })
});

router.post('/register', function(req, res, next) {
  // let username = req.body.username
  // let password = req.body.password
  let user = {
    username : req.body.username,
    password : hash.generate(req.body.password)
  }
  models.create(user, function(err,user){
    if(err){
      res.json({err:err})

    }
    if (user) {
      res.json({user:user})
    }
  })
});

router.post('/verify', function(req, res, next) {

  let token = req.body.token

  jwt.verify(token,'SECRETNIH',function(err,decoded){
          if(err) console.log(err);
          if(decoded){
              let user = {
                username : decoded.username
              }

              models.findOne(user,function(err,data){
                if(err) console.log(err);
                if(data)
                res.json({status : true})
                if(!data)
                res.json({status : false})

              })
          }

  })




});


module.exports = router;
