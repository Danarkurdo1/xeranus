require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const port = process.env.PORT || 3000;
mongoose.set('strictQuery', false);

// serve static Folder
const path = require('path');
app.use(express.static(__dirname + '/public'));

// serve views folder ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: process.env.TOP_SECRET,
    resave: false,
    saveUninitialized: false,
  }));


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const userSchema =new mongoose.Schema({
    username: String,
    password: String,
    wpm: String,
    gameScore: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
  done(null, user);
});



//route
app.get('/', (req, res)=>{
  let username =  "";
    if(req.isAuthenticated()){
        console.log('authenticated')
        User.findById({_id: req.user._id}).then((user, err)=>{
          if(err){
            console.log(err);
          }else{
            username = user.username.slice(0, user.username.indexOf('@')) || "danar";
            res.render('home', { username : username });
          }
        })
      }else{
        res.render('home', { username : username });
      }
    
});


app.get('/game', (req, res)=>{
  let username =  "";
  if(req.isAuthenticated()){
      console.log('authenticated')
      User.findById({_id: req.user._id}).then((user, err)=>{
        if(err){
          console.log(err);
        }else{
          username = user.username.slice(0, user.username.indexOf('@')) ;
          res.render('game', { username : username });
        }
      })
    }else{
      res.render('game', { username : username });
    }
})

app.get('/Leaderboard', (req, res)=>{
    //get all users
    User.find({}).then((users, err)=>{
      res.render('leaderbourd', {users: users});
    })
})

app.get('/learning', (req, res)=>{
  let username =  "";
  if(req.isAuthenticated()){
      console.log('authenticated')
      User.findById({_id: req.user._id}).then((user, err)=>{
        if(err){
          console.log(err);
        }else{
          username = user.username.slice(0, user.username.indexOf('@'));
          res.render('learning', { username : username });
        }
      })
    }else{
      res.render('learning', { username : username });
    }
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.post('/register', (req, res)=>{
 
    User.register({username: req.body.username}, req.body.password, (err, user)=>{
        if(err){
          console.log(err);
          res.redirect('/signup');
        }else{
          passport.authenticate('local')(req, res, ()=>{
            console.log("signed up");
            res.redirect('/');
          });
        }
      });

})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.post('/login', (req, res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
      });
    
      req.login(user, (err)=>{
        if(err){
          console.log(err);
          res.redirect('/login');
        }else{
          passport.authenticate('local')(req, res, ()=>{
            console.log('logged in')
            res.redirect('/');
          });
        }
      });
})

app.post('/logout',(req, res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
});

app.listen(port, ()=>{
    console.log("server started...");
})