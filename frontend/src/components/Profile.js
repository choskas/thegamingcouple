import React, { Component } from 'react';
import { MyContext } from '../context/index';
import {  Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../services/auth';


const {Header} = Layout



export default class Profile extends Component {
  
  state = {
    user: {
    },
    teams: []
  };


  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/login');
    const userinfo = this.context.state.loggedUser
    this.setState( userinfo );
    console.log(userinfo)
    console.log(this.context.state.loggedUser)
    AUTH_SERVICE.allTeams()
    .then(({data})=> this.setState({teams: data.teams}))
    .catch((err)=> console.log(err))
  }

  
  
  
  logout() {
    localStorage.clear();
    window.location.href = '/';
}


  render() {
    const user = this.state
    const {teams} = this.state
    return (
        <div>
        <Header>
         
        
        <div className="logo"></div>
        
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
          <Menu.Item key="2">Teams</Menu.Item>
          <Menu.Item key="3" onClick={this.logout}>Logout</Menu.Item>
          <Menu.Item key="4"> 
      </Menu.Item>
         
        </Menu>
        
      </Header> 
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
        <Link to={`/editteam/${team._id}`}>  <Button  type="primary" style={{width: '10vw', float: 'left', marginTop: '80px'}}>Edit Team {team.name}</Button> </Link>
      ))}
      </div>
      </div>
      
    );
  }
}



Profile.contextType = MyContext;