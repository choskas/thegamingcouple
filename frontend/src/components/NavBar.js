import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'

import {
    Link
} from 'react-router-dom'
import axios from 'axios'

import {Layout, Menu, Carousel, Card, Icon, Avatar} from 'antd'
import {TwitchStream} from 'react-twitch-stream'

import { MyContext } from '../context';
const {Header, Footer} = Layout
const {Meta} = Card



class NavBar extends React.Component {

	

  render(){
    if(!localStorage.user) {
      return(
         
          <Header 
          style={{ background: 'black'}}
          >
          <Link to='/'>
        <img style={{width: 'auto', height: '60px', float: 'left', marginRight: '20px'}} src='/images/54516548_480886059109258_4540151525636308992_n.jpg'></img>
        </Link>
        <Menu 
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', background: 'black'}}
        >
          <Menu.Item key="5" ><Link to ='/'>Home</Link></Menu.Item>
          <Menu.Item key="1"><Link to='/team'>Teams</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/signup'>Sign Up</Link></Menu.Item>
          <Menu.Item key="4"> <Link to='/login'>Log in</Link></Menu.Item>
          
        
        </Menu>
        </Header>
   
      )
    } else {
      return (
        <Header
        style={{ background: 'black'}}
        >
        <Link to='/'>
      <img style={{width: 'auto', height: '60px', float: 'left'}} src='/images/54516548_480886059109258_4540151525636308992_n.jpg'></img>
      </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', background: 'black'}}
        >
          <Menu.Item key="4"><Link to ='/'>Home</Link></Menu.Item>
          <Menu.Item key="1"><Link to='/team'>Teams</Link></Menu.Item>
          <Menu.Item key="8"><Link to='/allevents'>Events</Link></Menu.Item>
          <Menu.Item key="3" onClick={this.context.logOut}><Link to= "/">Logout</Link></Menu.Item>
          <Menu.Item style={{float: 'right', width: 'auto', height: '60px'}} key="7"><Link to='/profile'> <img style={{width: '50px', objectFit: 'cover', height: '50px', borderRadius:'50%'}} src= {JSON.parse(localStorage.user).img} alt='profile img' /> </Link></Menu.Item>
          <Menu.Item style={{float: 'right'}} key="6"><Link to='/profile'>{JSON.parse(localStorage.user).userName}</Link></Menu.Item>
     
        </Menu>
        </Header>
      )
    }
  }
}
NavBar.contextType = MyContext;
export default NavBar
