import React, { Component } from 'react';
import { Card, Menu, Input, Form, Layout } from 'antd';
import AUTH_SERVICE from '../services/auth';
import { MyContext } from '../context';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const {Header, Footer} = Layout
class Login extends Component {
  state = {
    user: {}
  };

  handleInput = (e) => {
    const { user } = this.state;
    const key = e.target.name;
    user[key] = e.target.value;
    this.setState({ user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    AUTH_SERVICE.login(this.state.user)
      .then((response) => {
        this.context.logUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        this.props.history.push('/profile');
        console.log(response.data.user)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  

  render() {
    return (
<div>
<NavBar {...this.props} />


      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100vw',
          height: '100vh',
         
        }}
      >


        
         
         
        
       <div>
        <Card style={{ width: '80vw', height: '70vh', color: 'white', backgroundColor: 'black', backgroundSize: 'cover'  }}>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Login</p>
        <div>
          <Form onSubmit={this.onSubmit} style={{marginTop:'20vh'}}>
          
            <Form.Item>
            
            <label style={{fontSize: '2rem', color: 'white'}}>User Name</label>
            <br></br>
              <Input onChange={this.handleInput} type="text" name="userName" placeholder="User name" style={{width: '30vw'}} />
            </Form.Item>
            <Form.Item>
            <label style={{fontSize: '2rem', color: 'white'}}>Password</label>
            <br></br>
              <Input
                onChange={this.handleInput}
                type="password"
                name="password"
                placeholder="Password"
                style={{width: '30vw'}}
              />
            </Form.Item>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Form.Item>
              <Input type="submit" value="Login" style={{float: 'right', width: '10vw', marginRight: '10vw', marginTop: '1vh'}} />
            </Form.Item>
            
            </div>
          </Form>
          </div>
       
        </Card>
        </div>
       
      </div>
      <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
      </div>
    );
  }
}

Login.contextType = MyContext;

export default Login;