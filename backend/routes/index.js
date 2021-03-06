const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const passport = require('../config/passport')
const Event = require('../models/Event')
const Game = require('../models/Game')
const Team = require('../models/Team')
const uploadCloud = require ('../config/cloudinary')


/* GET home page */


router.get('/allusers', (req,res,next)=>{
  User.find()
  .then((user) => res.status(201).json({ user }))
  .catch((err) => console.log(err))
})


router.post('/signup', (req,res,next) =>{
  User.register(req.body, req.body.password)
  .then((user) => res.status(201).json({ user }))
    .catch((err) => console.log(err))
})

router.post('/login', passport.authenticate('local'), (req,res,next) =>{
  const { user } = req 
  res.status(200).json({user})
})

router.get('/logout', (req,res,next)=>{
  req.logout()
  res.status(200).json({msg: 'Logged out'})
})

router.get('/profile', isAuth, (req,res,next) =>{
  User.findById(req.user.id)
  .then((user)=> req.status(200).json({user}))
  .catch((err)=> res.status(500).json({err}))
}) 

router.delete('/deleteuser', isAuth, (req,res,next)=>{
  User.findByIdAndDelete(req.user.id)
  .then((user)=> req.status(200).json({user}))
  .catch((err)=> res.status(500).json({err}))
})

router.put('/edit', isAuth, uploadCloud.single('img'), (req,res,next)=>{
  if(req.file){
    req.body.img = req.file.secure_url
  }
  User.findByIdAndUpdate(req.user._id, {...req.body}, {new: true})
  .then((user) => res.status(200).json({ message: 'changes updated', user: user }))
  .catch((err) => console.log(err))
})


router.get('/game/:id', (req,res,next) =>{
  Game.findById(req.params.id)
  .then((game) => res.status(200).json({ game }))
  .catch((err) => console.log(err));
})


router.get('/gamesall', (req,res,next) =>{
  Game.find()
  .then((game) => res.status(200).json({ game }))
  .catch((err) => console.log(err));
})

///

router.put('/editgame/:id', isAuth ,uploadCloud.single('img'), (req,res,next)=>{
  if(req.file){
    req.body.img = req.file.secure_url
  }
  Game.findByIdAndUpdate(req.params.id, {...req.body})
  
  .then(game => res.status(200).json({ game }))
  .catch((err) => res.status(err).json({ err }))
})

router.delete('/deletegame/:id', isAuth, (req,res,next)=>{
 

  Game.findByIdAndDelete(req.params.id)
   
   .then(game => res.status(200).json({ game }))
   .catch((err) => res.status(err).json({ err }))
})

router.get('/eventsall', (req,res,next)=>{
  Event.find()
  .then((event) => res.status(200).json({ event }))
  .catch((err) => console.log(err));
})

router.get('/event/:id', (req,res,next)=>{
  Event.findById(req.params.id)
  .then((event) => res.status(200).json({ event }))
  .catch((err) => console.log(err));
})

router.get('/eventregister', isAuth, (req,res,next)=>{
  User.findById(req.user._id)
  .then((user) => res.status(200).json({ user }))
  .catch((err) => res.status(500).json({ err }))

})

router.get('/teamsall', (req,res,next)=>{
  Team.find()
  .populate('owner')
  
  .then((team) => { console.log(team)
    res.status(200).json({ team })
  })
  .catch((err) => console.log(err));
})

router.get('/hometeams', (req,res,next)=>{
  Team.find()
  .populate('owner')
  .limit(4)
  
  .then((team) => { console.log(team)
    res.status(200).json({ team })
  })
  .catch((err) => console.log(err));
})

router.get('/team', (req,res,next)=>{
  Team.findById(req.params._id).populate('owner')
  .then((team) => res.status(200).json({ team }))
  .catch((err) => console.log(err));
})

router.post('/createteam', isAuth, uploadCloud.single('img'), (req,res,next)=>{
  if(req.file){
    req.body.img = req.file.secure_url
  }
  Team.create( {...req.body, owner: req.user._id})
  .then((team) =>res.status(200).json({team}))
  .catch((err)=> res.status(500).json({err}))
})

router.put('/editteam/:id', isAuth, uploadCloud.single('img'), (req,res,next)=>{
  if(req.file){
    req.body.img = req.file.secure_url
  }

 Team.findByIdAndUpdate(req.params.id, {...req.body})
  
  .then(team => res.status(200).json({ team }))
  .catch((err) => res.status(err).json({ err }))
})

router.get('/teamregister/:id', (req,res,next)=>{
  Team.findById(req.params.id)
  .populate('owner members')
  
  .then((team) => res.status(200).json({ team }))
  .catch((err) => res.status(err).json({ err }))
})

router.get('/oneuserteams', isAuth, (req,res,next)=>{
  Team.find({owner: req.user.id})
  .then((teams)=> res.status(200).json({teams}))
  .catch((err)=> res.status(500).json({err}))
})

router.delete('/deleteteam/:id', isAuth, (req,res,next)=>{
 

 Team.findByIdAndDelete(req.params.id)
  
  .then(team => res.status(200).json({ team }))
  .catch((err) => res.status(err).json({ err }))
})

router.get('/getmembers/:id', (req,res,next) =>{
  Team.find(req.params.id).populate('members')
  .then((members)=> res.status(200).json({members}))
  .catch((err)=> res.status(500).json({err}))
})


router.post('/creategame', isAuth, uploadCloud.single('img'), (req,res,next)=>{
  if(req.file){
    req.body.img = req.file.secure_url
  }
  Game.create( {...req.body})
  .then((event) =>res.status(200).json({event}))
  .catch((err)=>  console.log(err))
})




function isAuth(req,res,next){
  req.isAuthenticated() ? next() : res.status(401).json({msg: 'Log in first'})
}


router.post('/addmember/:id', isAuth, uploadCloud.single('img'), (req,res,next)=>{
 
  


  Team.findByIdAndUpdate(req.params.id, {members: req.body})
 
  .then(team => res.status(200).json({ team }))
  .catch((err) => res.status(err).json({ err }))

})

function checkAdmin(req, res, next){
   if (req.user.role === 'admin'){
     next()
   } else {
    res.status(401).json({msg: 'Log in as admin first'})
   }
}

module.exports = router;
