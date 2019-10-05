import React, { Component } from 'react';
import { Card, Menu, Input, Form, Layout, Button } from 'antd';
import AUTH_SERVICE from '../services/auth';
import { Link } from 'react-router-dom'
import axios from 'axios';
import NavBar from './NavBar'

const {Header} = Layout

class AddMember extends Component {
    state = {
        team: {members: []},
        user: {},
        filteredUsers: []
      };
    
      componentDidMount (){
        axios
        .get('http://localhost:3000/api/allusers')
        .then(res => {
          this.setState({
              user: res.data.user
          
          })
    console.log('user: ', res.data.user)
      })
      .catch(err => {
          console.log(err)
      })
        this.setState({team: this.state.team, user: this.state.user})
        console.log(this.state)
        console.log(this.state.user)
      }
    
      handleInput = (e) => {
        const { team } = this.state;
        
        if (e.target.files) team.img = e.target.files[0]
        else {
        const key = e.target.name;
        team[key] = e.target.value;
      }
        this.setState({ team });
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',this.state.team)
      };
    
      onSubmit = (e) => {
        e.preventDefault()
      
       
       
        // const fd = new FormData(e.target)
        //  for (const key in this.state.team){
        //    fd.append(key, this.state.team.members[key])}
        // fd.set('members',this.state.team.members)
        // if(key=== 'members'){fd.append(key, this.state.team[key]}
        // console.log('el fd de on submit: ', fd)
        console.log('sdjsdsdsdd', this.state.team.members)
          AUTH_SERVICE.addOneMember(this.props.match.params.id, this.state.team.members)
          
            .then(res => {
              console.log('la respuesta del fd: ', res.data)
              this.props.history.push('/team')
            })
            .catch(e => console.log(e));
       
      };
    
      search = e => {
       
        const { value } = e.target
        const  {user}  = this.state
       const userone= user.map((oneUser)=>{
         return oneUser
        })
        console.log('oneuser: ', userone)
        console.log('search: ',user)
        const query = value.toLowerCase()
        const filteredUsers = userone.filter(user => user.userName.toLowerCase().includes(query))
        this.setState({ filteredUsers })
        console.log('userseached: ', filteredUsers)
      }

      addMember= e => {
        e.preventDefault()
        const key = e.target.parentElement.getAttribute('index')
        console.log('lakeryyyy', key)
        this.setState(prevState=>{
          const {team: {members}, filteredUsers}= prevState
          members.push(filteredUsers[key]._id)
          console.log('ptossss', key)
          return {team: {members}}
          
        })
        console.log("admember teams...", this.state.team.members)
      }
  
      render() {
        let {team, user, filteredUsers} = this.state
        console.log('elteeeanm', team)
       console.log('eluseserererer',filteredUsers)
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
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Add member</p>
          <Form onSubmit={this.onSubmit}>
          
           
        
            <input className='input' type='search' name='search' placeholder='Search' onChange={this.search} />
            <Form.Item>
           <Input style={{width: '20vw'}}  type="submit"  value="Confirm Changes" /> 
            </Form.Item>
<div>
           {filteredUsers.map((user, index)=>(
              <div key={index} index={index}>
              <p>{user.email}</p>
              <p>{user.userName}</p>
              <button onClick={this.addMember}>boton por la berga</button>
              </div>
           ))}
           </div>
            
          </Form>
          </div>
 
        </Card>
      </div>
      </div>
    );
  }
}

export default AddMember;