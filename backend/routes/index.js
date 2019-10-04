const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const passport = require('../config/passport')
const Event = require('../models/Event')
const Game = require('../models/Game')
const Team = require('../models/Team')
const uploadCloud = require ('../config/cloudinary')


/* GET home page */
router.get('/', (req, res, next) => {
  Game.find()
  Event.find().limit(5)
  Team.find().limit(5)
  res.status(200).json({ msg: 'all things' });
});

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

router.post('/edit', isAuth, uploadCloud.single('img'), (req,res,next)=>{
  if(req.file){
    req.body.img = req.file.secure_url
  }
  User.findByIdAndUpdate(req.user._id, {...req.body}, {new: true})
  .then((user) => res.status(200).json({ message: 'changes updated', user: user }))
  .catch((err) => console.log(err))
})


router.get('/game', (req,res,next) =>{
  Game.findById(req.params._id)
  .then((game) => res.status(200).json({ game }))
  .catch((err) => console.log(err));
})


router.get('/gamesall', (req,res,next) =>{
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
  Team.find().populate('owner')
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

router.post('/editteam/:id', isAuth, uploadCloud.single('img'), (req,res,next)=>{
  if(req.file){
    req.body.img = req.file.secure_url
  }
  console.log('sdfsdfsdfdfelelele',req.body)
  const {name, img, description, members} = req.body
 Team.findByIdAndUpdate(req.params.id, {...req.body})
  
  .then((team) =>{ 
    for (const key in req.body){
      team[key] = req.body[key]
    }
    console.log('<<<<<<<<<<<<<<<<', team)
   
    
    team.save()
    .then(team => res.status(200).json({ team })
    .catch(err => console.log(err))
   
    
    )})
  .then(team => res.status(200).json({ team }))
  .catch((err) => res.status(err).json({ err }))
})

router.get('/teamregister/:id', (req,res,next)=>{
  Team.findById(req.params.id)
  .populate('owner')
  .then((team) => res.status(200).json({ team }))
  .catch((err) => res.status(err).json({ err }))
})

router.get('/oneuserteams', isAuth, (req,res,next)=>{
  Team.find({owner: req.user.id})
  .then((teams)=> res.status(200).json({teams}))
  .catch((err)=> res.status(500).json({err}))
})

router.get('/getmembers/:id', (req,res,next) =>{
  Team.find(req.params.id).populate('members')
  .then((members)=> res.status(200).json({members}))
  .catch((err)=> res.status(500).json({err}))
})

function isAuth(req,res,next){
  req.isAuthenticated() ? next() : res.status(401).json({msg: 'Log in first'})
}

module.exports = router;
