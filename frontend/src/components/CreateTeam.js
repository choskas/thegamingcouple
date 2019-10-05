import React, { Component } from 'react';
import { Card, Menu, Input, Form, Layout } from 'antd';
import AUTH_SERVICE from '../services/auth';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const {Header} = Layout

class CreateTeam extends Component {
    state = {
        team: {}
      };
    
      componentDidMount (){
        this.setState({team: this.state.team})
        console.log(this.state)
      }
    
      handleInput = (e) => {
        const { team } = this.state;
     
        if (e.target.files) team.img = e.target.files[0]
        else {
        const key = e.target.name;
        team[key] = e.target.value;
      }
        this.setState({ team });
        
      };
    
      onSubmit = (e) => {
        e.preventDefault()
      
       
       
        const fd = new FormData()
        for (const key in this.state.team){fd.append(key, this.state.team[key])}
      
          AUTH_SERVICE.createTeam(fd)
            .then(res => {
              console.log(res)
              this.props.history.push('/team')
            })
            .catch(e => console.log(e));
       
      };
    
  
      render() {
        let {team} = this.state
    
    return (
        <div>
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
       
        <Card style={{ width: '80vw', height: '70vh',  backgroundImage: 'url("/image/oval-bg.png")', backgroundSize: 'cover'  }}>
        <div style={{}}>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Create a Team</p>
          <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <label>Team photo</label>
            <br></br>
              <img style={{width: '20vw'}} src={team.img} alt="teampicture"/>
              <input name="img" type="file" onChange={this.handleInput} />
            </Form.Item>
            <Form.Item>
            <label>Team Name</label>
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
            <label>Description</label>
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
            <label>Game</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="game"
                placeholder="League of Legends, CS: GO, Overwatch"
              />
            </Form.Item>
            <Form.Item>
            <label>Searching for</label>
            <br></br>
              <Input
                style={{width: '30vw'}}
                onChange={this.handleInput}
                type="text"
                name="searching"
                placeholder="ADC, MID, TOP, JG, TANK, DPS"
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

export default CreateTeam;