require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const port = process.env.PORT || 3000
mongoose.set('strictQuery', false);

const logoutHtml = 'style="display: inline;"';

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
    wpm: {type: Number, default: 0},
    gameScore: {type: Number, default: 0},
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
            res.render('home', { username : username, logoutHtml:logoutHtml });
          }
        })
      }else{
        res.render('home', { username : username, logoutHtml:"" });
      }
    
});

app.post('/', (req, res)=>{
    
    let wpm = parseInt(req.body.wpm);
    console.log(wpm);
    if(req.isAuthenticated()){
      User.findById({_id: req.user._id}).then((user, err)=>{
        if(err){
         console.log(err);
       }else{
         wpm = user.wpm + wpm;
         user.updateOne({
          wpm: wpm,
          }).catch(err =>{
            console.log(err)
         })
       }
     })
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
          res.render('game', { username : username, logoutHtml:logoutHtml });
        }
      })
    }else{
      res.render('game', { username : username, logoutHtml:"" });
    }
})

app.post('/game', (req, res)=>{
  let gameScore = parseInt(req.body.gameScore);
  console.log(gameScore);
  if(req.isAuthenticated()){
    User.findById({_id: req.user._id}).then((user, err)=>{
      if(err){
        console.log(err);
      }else{
        gameScore = user.gameScore + gameScore;
        user.updateOne({
          gameScore: gameScore,
        }).catch(err =>{
          console.log(err)
        })
      }
    })
  }
})

app.get('/Leaderboard', (req, res)=>{
    
  let username =  "";
    if(req.isAuthenticated()){
      console.log('authenticated')
      User.findById({_id: req.user._id}).then((user, err)=>{
        if(err){
          console.log(err);
        }else{
          //get all users
          User.find({}).then((users, err)=>{
            username = user.username.slice(0, user.username.indexOf('@')) ;
            res.render('leaderbourd', {username : username, users: users, logoutHtml:logoutHtml});
          }) 
        }
      })
    }else{
      //get all users
      User.find({}).then((users, err)=>{
        users.sort((b, a) => a.gameScore - b.gameScore); //gameScore from biggest to smallest
        res.render('leaderbourd', {username : username, users: users, logoutHtml:""});
      })
    }
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
          res.render('learning', { username : username, logoutHtml:logoutHtml });
        }
      })
    }else{
      res.render('learning', { username : username, logoutHtml:"" });
    }
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.get('/about', (req, res)=>{
  let username =  "";
  if(req.isAuthenticated()){
      console.log('authenticated')
      User.findById({_id: req.user._id}).then((user, err)=>{
        if(err){
          console.log(err);
        }else{
          username = user.username.slice(0, user.username.indexOf('@'));
          res.render('about', { username : username, logoutHtml:logoutHtml });
        }
      })
    }else{
      res.render('about', { username : username, logoutHtml:"" });
    }
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

  if(req.isAuthenticated()){
    console.log('authenticated')
    User.findById({_id: req.user._id}).then((user, err)=>{
      if(err){
        console.log(err);
      }else{
        User.findById({_id: req.user._id}).then((user, err)=>{
          if(err){
            console.log(err);
          }else{
            username = user.username.slice(0, user.username.indexOf('@'));
            res.render('profile', {logoutHtml:"", username:username, gameScore: user.gameScore, wpm: user.wpm});          
          }
        })
      }
    })
  }else{
    res.render('login', {logoutHtml:""});
  }
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