const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const passport = require('../config/passport')
const Event = require('../models/Event')
const Game = require('../models/Game')
const Team = require('../models/Team')

/* GET home page */
router.get('/', (req, res, next) => {
  Game.find()
  Event.find()
  Team.find()
  res.status(200).json({ msg: 'all things' });
});

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
  User.findById(req.user._id)
  .then((user)=> req.status(200).json({user}))
  .catch((err)=> res.status(500).json({err}))
}) 

router.get('/profileedit', isAuth, (req,res,next)=>{
  User.findByIdAndUpdate(req.user._id, {...req.body})
  .then((user) => res.status(200).json({ user }))
  .catch((err) => console.log(err))
})


router.get('/game', (req,res,next) =>{
  Game.findById(req.params._id)
  .then((game) => res.status(200).json({ game }))
  .catch((err) => console.log(err));
})


router.get('/gameall', (req,res,next) =>{
  Game.find()
  .then((game) => res.status(200).json({ game }))
  .catch((err) => console.log(err));
})

router.get('/eventsall', (req,res,next)=>{
  Event.find()
  .then((event) => res.status(200).json({ event }))
  .catch((err) => console.log(err));
})

router.get('/event', (req,res,next)=>{
  Event.findById(req.params._id)
})

router.get('/eventregister', isAuth, (req,res,next)=>{
  User.findById(req.user._id)
  .then((user) => res.status(200).json({ user }))
  .catch((err) => res.status(500).json({ err }))

})

router.get('/teamsall', (req,res,next)=>{
  Team.find()
  .then((team) => res.status(200).json({ team }))
  .catch((err) => console.log(err));
})

router.get('/team', (req,res,next)=>{
  Team.findById(req.params._id)
  .then((team) => res.status(200).json({ team }))
  .catch((err) => console.log(err));
})

router.post('/createteam', (req,res,next)=>{
  const {team} = req
  res.status(200).json({team})
})

router.get('/teamregister', isAuth, (req,res,next)=>{
  User.findById(req.user._id)
  .then((user) => res.status(200).json({ user }))
  .catch((err) => res.status(500).json({ err }))
})



function isAuth(req,res,next){
  req.isAuthenticated() ? next() : res.status(401).json({msg: 'Log in first'})
}

module.exports = router;
