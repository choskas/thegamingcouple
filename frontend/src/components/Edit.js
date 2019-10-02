import React from "react";
import { Link } from "react-router-dom";
import { Card, Input, Form, Button } from 'antd';
import { MyContext } from '../context/index';
import AUTH_SERVICE from '../services/auth';
import axios from 'axios'
let url = "http://localhost:3000/api/edit";


export default class ProfileEdit extends React.Component {
  state = {
    updateUser: {}
  };

  handleInput = (e) => {
    const { updateUser } = this.state;
 
    if (e.target.files) updateUser.img = e.target.files[0]
    const key = e.target.name;
    updateUser[key] = e.target.value;
    this.setState({ updateUser });
    
  };

  onSubmit = (e) => {
    e.preventDefault()
    const userinfo = this.context.state.loggedUser
    console.log('ejfjfjfjfjfdjfjdjfdjf',userinfo)
   
   
    const fd = new FormData()
    for (const key in this.state.updateUser){fd.append(key, this.state.updateUser[key])}
  
      AUTH_SERVICE.edit(fd)
        .then(res=> console.log(res))
        .catch(e => console.log(e));
   
    this.props.history.push('/profile')
  };

handleFile = (e) =>{
  this.setState({[e.target.name]: e.target.files[0]})
 
console.log(e.target.files[0])
}

//update de cosas xd
  render() {
 
let user = this.state.updateUser

console.log('djdjdjdjdjdjdjdjddjjddj',user)

    return (
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
        <div>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Edit Profile</p>
          <Form onSubmit={this.onSubmit} encType="multipart/form-data">
            <Form.Item>
            <label>Photo Upload</label>
            <br></br>
              <img style={{width: '20vw'}} src={user.img} alt="profilepicture"/>
              <input name="img" type="file" onChange={this.handleFile} />
            </Form.Item>
            <Form.Item>
            <label>Main Game</label>
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
            <label>Email</label>
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
    );
  }
}


ProfileEdit.contextType = MyContext;