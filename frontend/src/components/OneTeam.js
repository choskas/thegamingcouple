import React, { Component } from 'react'
import AUTH_SERVICE from '../services/auth';
import { Icon, Avatar, Card, Layout, Button } from 'antd';
import { Link } from 'react-router-dom'
import {
    MyContext
} from '../context/index'
import NavBar from './NavBar'
import '../App.css'

const {Meta} = Card
const {Footer} = Layout

export default class OneTeam extends Component {
    state= {
        teams: [],
        user: {},
        members: []
    }
    
    
    componentDidMount() {
        if (localStorage.user) {
            let user = JSON.parse(localStorage.user)
            this.setState({user})
           }
    
        const id = this.props.match.params.id
     
        AUTH_SERVICE.teamRegister(id)
            .then(res => {
              
                this.setState({
                    teams: res.data.team
                    
                })
               
            })
            .catch(err => {
                console.log(err)
            })
            if (!localStorage.user) return this.props.history.push('/login');

    }

    sendMail = ()=>{
    
      AUTH_SERVICE.mail({email: this.state.teams.owner.email, message:`Hola, soy ${this.state.user.userName} quiero unirme a tu equipo, mis datos de contacto son: correo: ${this.state.user.email} o puedes encontrarme en facebook como: ${this.state.user.fb}`, subject: `${this.state.user.userName} quiere unirse a tu equipo!`})

    }
  
    render() {
        const team = this.state.teams
        
        if(this.state.teams.length===0) return <p>Loading...</p>
    
        return (
            <div style={{backgroundColor: 'black', height: '100%'}}>
            <div>
            <NavBar {...this.props} />
            <div>
  <Button onClick={this.sendMail} style={{float: 'left', margin: '1px solid #09d3ac', background: 'black', color: '#09d3ac'}}> <Link to='/'><Icon style={{marginRight: '1vw'}} type="mail" />Send Request</Link></Button>
  </div>
  <div className='onMobileTeamOwnerDiv'>
  <div>
            <Card className='onMobileTeamCardDiv'
    style={{marginLeft: '20vw', width: '50vw', height: '40vw', backgroundColor: 'black', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh' }}
    cover={
      <img
      className='onMobileTeamCardImg'
        alt="example"
        src={team.img}
        style={{height: '50%', width: '50%', objectFit: 'cover', borderRadius: '1%', marginLeft: '25%'}}
      />
    }
    
  >
    <Meta
      avatar={<Avatar src={team.owner.img} />}
      title={`Leader: ${team.owner.userName}`}
     
      description={team.game}
    />
    <Meta
      
      title={team.name}
      description={team.description}
    />
  </Card>
  
  </div>
  <div>
  <h2 style={{color: 'white'}}>Members</h2>
  <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
{team.members.map((member)=>(
    <Card
    className='onMobileTeamCardMembers'
    hoverable
    style={{ width: '20rem', backgroundColor: 'black', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginBottom: '5vh' }}
    cover={<img className='onMobileTeamCardMembersImg' alt="example" src={member.img} />}
  >
    <Meta title={member.userName} description={member.game} />
   
  
    
  </Card>
))}
</div>
</div>
</div>
  </div>
  <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
        )
    }
}

OneTeam.contextType = MyContext;
