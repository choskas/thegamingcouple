import React, { Component } from 'react';
import { MyContext } from '../context';
import {  Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../services/auth';
import NavBar from './NavBar'

const {Header} = Layout



export default class Profile extends Component {
  
  state = {
    user: {
    },
    teams: []
  };



  


  componentDidMount() {
    

    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      console.log('sdasdsd', user)
      this.setState({user})
     }
   if (!localStorage.user) return this.props.history.push('/login');
   //////////////////////////////7777
  
///////////////////////////////////////////7
    // const userinfo = this.context.state.loggedUser
    // this.setState( userinfo );
    // console.log('the user infoooo: ', userinfo)
    
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<',this.context.loggedUser)
    AUTH_SERVICE.allTeams()
    .then(({data})=> this.setState({teams: data.teams}))
    .catch((err)=> console.log(err))
  }

  
//   logout() {
//     localStorage.clear();
//     window.location.href = '/';
// }


  render() {
    const {user} = this.state
    const {teams} = this.state
    console.log(teams)
    return (
        <div>
       <NavBar {...this.props} />
      <div style={{display: 'flex', marginLeft: '10%', marginTop: '10%', width: '70vw', height: '60vh', flexDirection: 'column', backgroundImage: 'url("/image/oval-bg.png")', backgroundSize: 'cover'}}>
      
       <div style={{marginTop: '15vh', marginLeft: '10vw'}}>
       <h2>Username:</h2>
       <p style={{fontSize: '1.3rem'}}>{user.userName}</p>
       <h2>Email: </h2>
       <p style={{fontSize: '1.3rem'}}>{user.email}</p>
       <h2>Your main game:</h2>
       <p style={{fontSize: '1.3rem'}}>{user.game}</p>
       <h2>Image: </h2>
       <img src={user.img} style={{width:"30vw"}} alt="profilephoto"/>
       </div>
     <Link to="/edit">  <Button type="primary" style={{width: '10vw', float: 'left', marginTop: '80px'}}>Edit</Button> </Link>
     <Link to="/team">  <Button type="primary" style={{width: '10vw', float: 'left', marginTop: '80px'}}>Join a team</Button> </Link>
     <Link to="/createteam">  <Button type="primary" style={{width: '10vw', float: 'left', marginTop: '80px'}}>Create a Team</Button> </Link>
      {teams.map(team=>(
        <div>
        <Link to={`/editteam/${team._id}`}>  <Button  type="primary" style={{width: '10vw', float: 'left', marginTop: '80px'}}>Edit Team {team.name}</Button> </Link>
        <Link to={`/addmember/${team._id}`}>  <Button  type="primary" style={{width: '10vw', float: 'left', marginTop: '80px'}}>Add Member to: {team.name}</Button> </Link>
        </div>
      ))}
      </div>
      </div>
      
    );
  }
}



Profile.contextType = MyContext;