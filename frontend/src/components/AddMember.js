import React, { Component } from 'react';
import { Card, Input, Form, Layout} from 'antd';
import AUTH_SERVICE from '../services/auth';
import NavBar from './NavBar'
import BoxAddMember from './BoxAddMember';


const {Footer} = Layout
class AddMember extends Component {
    state = {
        team: {members: []},
        user: {},
        filteredUsers: [],
        buttonVisible: true
      };
    
      componentDidMount (){
       AUTH_SERVICE.allUsers()
        .then(res => {
          this.setState({
              user: res.data.user
          
          })

      })
      .catch(err => {
          console.log(err)
      })
        this.setState({team: this.state.team, user: this.state.user})
     
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
      
       
       
        // const fd = new FormData(e.target)
        //  for (const key in this.state.team){
        //    fd.append(key, this.state.team.members[key])}
        // fd.set('members',this.state.team.members)
        // if(key=== 'members'){fd.append(key, this.state.team[key]}
        // console.log('el fd de on submit: ', fd)
       
          AUTH_SERVICE.addOneMember(this.props.match.params.id, this.state.team.members)
          
            .then(res => {
              console.log('la respuesta del fd: ', res.data)
              this.props.history.push('/team')
            })
            .catch(e => console.log(e));
       
      };
    
      search = e => {
       if (e.target.value === '') return this.setState({filteredUsers:[]})
        const { value } = e.target
        const  {user}  = this.state
       const userone= user.map((oneUser)=>{
         return oneUser
        })
      
        const query = value.toLowerCase()
        const filteredUsers = userone.filter(user => user.userName.toLowerCase().includes(query))
        this.setState({ filteredUsers })
   
      }

      addMember= key => {
        // e.preventDefault()
      
     
        this.setState(prevState=>{
          const {team: {members}, filteredUsers}= prevState
          members.push(filteredUsers[key]._id)
        
          return {team: {members}}
          
        })
        console.log("admember teams...", this.state.team.members)
      }
  
      render() {
        let {team, filteredUsers} = this.state
        console.log('elteeeanm', team)
       console.log('eluseserererer',filteredUsers)
    return (
        <div style={{borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac'}}>
        <NavBar {...this.props} />
       
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100vh'
        }}
      >
       
        <Card style={{ width: '80vw', height: '70vh',  borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh', backgroundSize: 'cover'  }}>
        <div style={{}}>
        <p style={{fontSize: '3rem', marginLeft: '2vw'}}>Add member</p>
          <Form onSubmit={this.onSubmit}>
          
           
        
            <input className='input' type='search' name='search' placeholder='Search' onChange={this.search} />
            <Form.Item>
           <Input style={{width: '20vw'}}  type="submit"  value="Confirm Changes" /> 
            </Form.Item>
<div style={{display: 'flex', flexDirection: 'row', background: 'black'}}>
           {filteredUsers.map((user, index)=>(
             <BoxAddMember style={{background: 'black'}} key={index} index={index} handleAdd={this.addMember} user={user} />
            
           ))}
           </div>
            
          </Form>
          </div>
 
        </Card>
      </div>
      <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
      </div>
    );
  }
}

export default AddMember;