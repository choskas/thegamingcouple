import React from "react";
import { Card, Input, Form, Button, Layout } from 'antd';
import { MyContext } from '../context/index';
import AUTH_SERVICE from '../services/auth';
import NavBar from './NavBar'
const {Footer} = Layout




export default class ProfileEdit extends React.Component {
  state = {
    updateUser: {}
  };

  componentDidMount (){
    //  this.setState({updateUser: this.context.state.loggedUser})
    //  console.log(this.state)
    if (localStorage.user) {
      let updateUser = JSON.parse(localStorage.user)
   
      this.setState({updateUser})
    }
  }

  handleInput = (e) => {
    const { updateUser } = this.state;
 
    if (e.target.files) updateUser.img = e.target.files[0]
    else {
    const key = e.target.name;
    updateUser[key] = e.target.value;
  }
    this.setState({ updateUser });
    
  };

  
  onSubmit = (e) => {
    e.preventDefault()

  
   
   
    const fd = new FormData()
    for (const key in this.state.updateUser){fd.append(key, this.state.updateUser[key])}
  
      AUTH_SERVICE.edit(fd)
        .then(res => {
          console.log(res)
          localStorage.user = JSON.stringify(res.data.user)
          this.props.history.push('/profile')
        })
        .catch(e => console.log(e));
   
  };


  render() {
 




    return (
      <div style={{backgroundColor: 'black'}}>
      <NavBar {...this.props} />
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

       
        <Card style={{ width: '80vw', height: '70vh', backgroundColor: 'black', color: 'white',   boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', backgroundSize: 'cover'  }}>
        <div>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Edit Profile</p>
          <Form onSubmit={this.onSubmit} encType="multipart/form-data">
            <Form.Item>
            <label style={{color: 'white'}}>Photo Upload</label>
            <br></br>
             
              <input name="img" type="file" onChange={this.handleInput} />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Main Game</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="game"
                placeholder="Madrid, Barcelona, Miami, Paris, Berlin, Amsterdam, México, Sao Paulo"
              />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Email</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="email"
                placeholder="WebDev, UX/UI, Data Analytics"
              />
            </Form.Item>
            <Form.Item>
            <Button style={{width: '20vw'}}  type="button" onClick={this.onSubmit}  value="Confirm">Confirm</Button>
            </Form.Item>
         
            
          </Form>
          </div>
          <div style={{display:'flex', flexDirection:'column', alignContent: 'right', textAlign: 'center', marginLeft: '10vw', justifyContent:'space-between'}}></div>
        </Card>
      </div>
      <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
      </div>
    );
  }
}


ProfileEdit.contextType = MyContext;