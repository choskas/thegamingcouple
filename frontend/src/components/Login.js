import React, { Component } from 'react';
import { Card, Menu, Input, Form, Layout } from 'antd';
import AUTH_SERVICE from '../services/auth';
import { MyContext } from '../context';
import { Link } from 'react-router-dom'

const {Header} = Layout
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
          <Menu.Item key="3"><Link to='/signup'>Sign Up</Link></Menu.Item>
          <Menu.Item key="4"> 
      </Menu.Item>
         
        </Menu>
        
      </Header> 


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
      </div>
    );
  }
}

Login.contextType = MyContext;

export default Login;