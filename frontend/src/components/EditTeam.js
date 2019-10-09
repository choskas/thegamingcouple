import React, { Component } from 'react';
import { Card, Input, Form, Layout, Button, Icon } from 'antd';
import AUTH_SERVICE from '../services/auth';
import NavBar from './NavBar'

const { Footer} = Layout

class EditTeam extends Component {
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
        for (const key in this.state.team){fd.append(key, this.state.team[key])
        if(key=== 'members'){fd.append(key, this.state.team[key].split(','))}}
    
          AUTH_SERVICE.editTeam(fd, this.props.match.params.id)
          
            .then(res => {
             
              this.props.history.push('/team')
            })
            .catch(e => console.log(e));
       
      };
    
      deleteInput = () => {
        AUTH_SERVICE.deleteTeam(this.props.match.params.id)
        .then(res =>{
          console.log('team deleted', res)
          this.props.history.push('/profile')
        })
        .catch(e => console.log(e))
      }
  
      render() {
        let {team} = this.state
      
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
       
        <Card style={{ overflow: 'auto', backgroundColor: 'black', color: 'white', width: '80vw', height: '80vh',   boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', backgroundSize: 'cover'  }}>
        <div style={{}}>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Edit Team</p>
          <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <label style={{color: 'white'}}>Team photo</label>
            <br></br>
              <img style={{width: '20vw'}} src={team.img} alt="teampicture"/>
              <input name="img" type="file" onChange={this.handleInput} />
            </Form.Item>
            <Form.Item>
            <label style={{color: 'white'}}>Team Name</label>
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
            <label style={{color: 'white'}}>Searching for</label>
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

export default EditTeam;