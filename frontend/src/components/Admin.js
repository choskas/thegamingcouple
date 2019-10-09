import React, { Component } from 'react';
import { MyContext } from '../context';
import {  Button } from 'antd';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import AUTH_SERVICE from '../services/auth';




export default class Admin extends Component {
  
  state = {
    user: {
    },
    games: []
  };



  


  componentDidMount() {
    
    let user= JSON.parse(localStorage.user)
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      
      this.setState({user})
      
     }
    
   if (user.role !== 'admin') return this.props.history.push('/login');
   AUTH_SERVICE.gamesHome()
   .then(res => {
    this.setState({
        games: res.data.game
    
    })
 
})
.catch(err => {
    console.log(err)
}) 
  }

  



  render() {
    const {user} = this.state
    const {games} = this.state
    return (
        <div style={{backgroundColor: 'black', height: '100vh'}}>
       <NavBar {...this.props} />
      <div style={{ display: 'flex', backgroundColor: 'black', justifyContent: 'space-around', color: 'white', marginTop: '2vh', marginLeft: '10%',  width: '70vw', height: '60vh', flexDirection: 'row', backgroundImage: 'url("/image/oval-bg.png")', backgroundSize: 'cover'}}>
      
       <div style={{ marginLeft: '10vw', marginRight: '5vw' }}>
       <h2 style={{color: 'white'}}>Username:</h2>
       <p style={{fontSize: '1.2rem'}}>{user.userName}</p>
       <h2 style={{color: 'white'}}>Email: </h2>
       <p style={{fontSize: '1.2rem'}}>{user.email}</p>
      
      
       </div>
       <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
       <img src={user.img} style={{width:"18vw", height:'18vw', borderRadius:'50%', objectFit: 'cover', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac'}} alt="profilephoto"/>
       </div>
     <Link to="/creategame">  <Button type="primary" style={{width: '12vw', float: 'left', marginTop: '80px'}}>Create Game</Button> </Link>
     {games.map((game, index)=>(
        <div key={index} style={{display: 'flex', flexDirection: 'row'}} >
        <Link  to={`/editgame/${game._id}`}>  <Button  type="primary" style={{width: '15vw', float: 'left', marginTop: '80px', marginRight: '5vw', overflow: 'hidden'}}>Edit game {game.name}</Button> </Link>
 
        </div>
      ))}
      </div>
      </div>
      
      </div>
      
    );
  }
}



Admin.contextType = MyContext;