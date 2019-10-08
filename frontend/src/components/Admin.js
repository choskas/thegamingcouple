import React, { Component } from 'react';
import { MyContext } from '../context';
import {  Button } from 'antd';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'





export default class Admin extends Component {
  
  state = {
    user: {
    },
    teams: []
  };



  


  componentDidMount() {
    
    let user= JSON.parse(localStorage.user)
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      
      this.setState({user})
      
     }
    
   if (user.role !== 'admin') return this.props.history.push('/login');

  }

  



  render() {
    const {user} = this.state
    const {teams} = this.state
    console.log(teams)
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
    
      </div>
      </div>
      
      </div>
      
    );
  }
}



Admin.contextType = MyContext;