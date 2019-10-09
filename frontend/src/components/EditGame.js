import React, { Component } from 'react';
import { Card, Input, Form, Layout, Button, Icon } from 'antd';
import AUTH_SERVICE from '../services/auth';
import NavBar from './NavBar'

const { Footer} = Layout

class EditGame extends Component {
    state = {
        game: {}
      };
    
      componentDidMount (){
        this.setState({game: this.state.game})
        console.log(this.state)
      }
    
      handleInput = (e) => {
        const { game } = this.state;
     
        if (e.target.files) game.img = e.target.files[0]
        else {
        const key = e.target.name;
        game[key] = e.target.value;
      }
        this.setState({ game: this.state.game });
        
      };
    
      onSubmit = (e) => {
        e.preventDefault()
      
       
       
        const fd = new FormData()
        for (const key in this.state.game){fd.append(key, this.state.game[key])}
        
    
          AUTH_SERVICE.editGame(fd, this.props.match.params.id)
          
            .then(res => {
             
              this.props.history.push('/admin')
            })
            .catch(e => console.log(e));
       
      };
    
      deleteInput = () => {
          console.log(this.props.match.params.id)
        AUTH_SERVICE.deleteGame(this.props.match.params.id)
        .then(res =>{
          console.log('game deleted', res)
          this.props.history.push('/admin')
        })
        .catch(e => console.log(e))
      }
  
      render() {
        let {game} = this.state
      console.log('<<<<<<<<<<<<',game)
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
       
        <Card style={{backgroundColor: 'black', color: 'white', width: '80vw', height: '80vh',   boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', backgroundSize: 'cover'  }}>
        <div style={{}}>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Edit Game</p>
          <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <label style={{color: 'white'}}>Game photo</label>
            <br></br>
              <img style={{width: '20vw'}} src={game.img} alt="gamepicture"/>
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
           <Input style={{width: '20vw'}}  type="submit"  value="Confirm Changes" /> 
            </Form.Item>
            
          </Form>
          </div>
       <div style={{float: 'right'}}>
         <Button type= 'danger' onClick={this.deleteInput} ><Icon type="delete" /></Button>
       </div>
        </Card>
      </div>
      <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
      </div>
    );
  }
}

export default EditGame;