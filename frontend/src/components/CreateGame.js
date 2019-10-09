import React, { Component } from 'react';
import { Card, Input, Form, Layout } from 'antd';
import AUTH_SERVICE from '../services/auth';

import NavBar from './NavBar'

const { Footer} = Layout


 


class CreateGame extends Component {
    state = {
        game: {},
      
      };
    
      componentDidMount (){
        this.setState({game: this.state.game})
        
      }

   
    
      handleInput = (e) => {
        const { game } = this.state;
     
        if (e.target.files) game.img = e.target.files[0]
        else {
        const key = e.target.name;
        game[key] = e.target.value;
      }
        this.setState({ game });
        
      };
    
      onSubmit = (e) => {
        e.preventDefault()
      
       
       
        const fd = new FormData()
        for (const key in this.state.game){fd.append(key, this.state.game[key])}
      
          AUTH_SERVICE.createGame(fd)
            .then(res => {
              console.log(res)
              this.props.history.push('/admin')
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
          height: '100%'
        }}
      >
       
        <Card style={{overflow: 'auto', minHeight: 'content-fit', color: 'white', backgroundColor: 'black',  boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', width: '80vw', height: '100vh', marginBottom: '5vh', marginTop: '5vh',  backgroundImage: 'url("/image/oval-bg.png")', backgroundSize: 'cover'  }}>
        <div style={{}}>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Create Game</p>
          <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <label style={{color: 'white'}}>Game photo</label>
            <br></br>
          
              <input name="img" type="file" onChange={this.handleInput} />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Game Name</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="name"
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Description</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="description"
                placeholder="Description"
              />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Price</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="price"
                placeholder="Price"
              />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Video</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="video"
                placeholder="Youtube embed url"
              />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Play game</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="playgame"
                placeholder="Url"
              />
            </Form.Item>
            <Form.Item>
           <Input style={{width: '20vw'}}  type="submit"  value="Create" /> 
            </Form.Item>
            
          </Form>
          </div>
    
        </Card>
      </div>
      
      <div>
      <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
      </div>
      </div>
    );
  }
}

export default CreateGame;