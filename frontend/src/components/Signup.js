import React, { Component } from 'react';
import { Card, Menu, Input, Form, Layout } from 'antd';
import AUTH_SERVICE from '../services/auth';
import { Link } from 'react-router-dom'

const {Header} = Layout

class Signup extends Component {
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
     AUTH_SERVICE.signup(this.state.user)
    
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      this.props.history.push('/login')
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
           <Menu.Item key="2"><Link to='/team'>Teams</Link></Menu.Item>
           <Menu.Item key="3"><Link to='/login'>Login</Link></Menu.Item>
           <Menu.Item key="4"> 
       </Menu.Item>
          
         </Menu>
         
       </Header> 
       
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh'
        }}
      >
       
        <Card style={{ width: '80vw', height: '70vh',  backgroundImage: 'url("/image/oval-bg.png")', backgroundSize: 'cover'  }}>
        <div style={{}}>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Sign Up</p>
          <Form onSubmit={this.onSubmit}>
            <Form.Item>
            <label>Email</label>
            <br></br>
              <Input onChange={this.handleInput} style={{width: '30vw'}} type="email" name="email" placeholder="Email" />
            </Form.Item>
            <Form.Item>
            <label>User Name</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="userName"
                placeholder="User name"
              />
            </Form.Item>
            <Form.Item>
            <label>Facebook Name</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="fb"
                placeholder="Facebook Name"
              />
            </Form.Item>
            <Form.Item>
            <label>Password</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
            <label>Game you play</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="game"
                placeholder="Counter Strike, League of Legends, Overwatch"
              />
            </Form.Item>
           
            <Form.Item>
           <Input style={{width: '20vw'}}  type="submit"  value="Signup" /> 
            </Form.Item>
            
          </Form>
          </div>
 
        </Card>
      </div>
      </div>
    );
  }
}

export default Signup;