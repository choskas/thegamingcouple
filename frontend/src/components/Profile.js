import React, { Component } from 'react';
import { MyContext } from '../context';
import {  Button } from 'antd';
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../services/auth';
import NavBar from './NavBar'





export default class Profile extends Component {
  
  state = {
    user: {
    },
    teams: []
  };



  


  componentDidMount() {
    

    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      
      this.setState({user})
     }
   if (!localStorage.user) return this.props.history.push('/login');

   
    AUTH_SERVICE.allTeams()
    .then(({data})=> this.setState({teams: data.teams}))
    .catch((err)=> console.log(err))
  }

  



  render() {
    const {user} = this.state
    const {teams} = this.state
    
    return (
        <div style={{backgroundColor: 'black', height: '100vh'}}>
       <NavBar {...this.props} />
      <div style={{display: 'flex', backgroundColor: 'black', justifyContent: 'space-around', color: 'white', marginTop: '2vh', marginLeft: '10%',  width: '70vw', height: '60vh', flexDirection: 'row', backgroundImage: 'url("/image/oval-bg.png")', backgroundSize: 'cover'}}>
      
       <div style={{ marginLeft: '10vw', marginRight: '5vw' }}>
       <h2 style={{color: 'white'}}>Username:</h2>
       <p style={{fontSize: '1.2rem'}}>{user.userName}</p>
       <h2 style={{color: 'white'}}>Email: </h2>
       <p style={{fontSize: '1.2rem'}}>{user.email}</p>
       <h2 style={{color: 'white'}}>Your main game:</h2>
       <p style={{fontSize: '1.2rem'}}>{user.game}</p>
      
       </div>
       <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
       <img src={user.img} style={{width:"18vw", height:'18vw', borderRadius:'50%', objectFit: 'cover', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac'}} alt="profilephoto"/>
       </div>
     <Link to="/edit">  <Button type="primary" style={{width: '12vw', float: 'left', marginTop: '80px'}}>Edit Profile</Button> </Link>
     <Link to="/team">  <Button type="primary" style={{width: '12vw', float: 'left', marginTop: '80px'}}>Join a team</Button> </Link>
     <Link to="/createteam">  <Button type="primary" style={{width: '12vw', float: 'left', marginTop: '80px', overflow: 'hidden'}}>Create a Team</Button> </Link>
      {teams.map((team, index)=>(
        <div key={index} style={{display: 'flex', flexDirection: 'row'}} >
        <Link  to={`/editteam/${team._id}`}>  <Button  type="primary" style={{width: '15vw', float: 'left', marginTop: '80px', marginRight: '5vw', overflow: 'hidden'}}>Edit Team {team.name}</Button> </Link>
        <Link  to={`/addmember/${team._id}`}>  <Button   type="primary" style={{width: '20vw', float: 'left', marginTop: '80px', overflow: 'hidden'}}>Add Member to: {team.name}</Button> </Link>
        </div>
      ))}
      </div>
      </div>
      
      </div>
      
    );
  }
}



Profile.contextType = MyContext;