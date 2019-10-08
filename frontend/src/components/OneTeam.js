import React, { Component } from 'react'
import axios from 'axios'
import { Menu, Avatar, Card, Layout, Button } from 'antd';
import { Link } from 'react-router-dom'
import {
    MyContext
} from '../context/index'
import NavBar from './NavBar'

const {Meta} = Card
const {Header, Footer} = Layout

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
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        console.log('elidddd', id)
        axios
            .get(`http://localhost:3000/api/teamregister/${id}`)
            .then(res => {
              
                this.setState({
                    teams: res.data.team
                    
                })
                console.log('la dartewrfs', res.data)
            })
            .catch(err => {
                console.log(err)
            })
            if (!localStorage.user) return this.props.history.push('/login');

    }

    sendMail = ()=>{
        console.log('el owennnnnnnnneerrrrrr',this.state.teams.owner.email)
        axios
        .post('http://localhost:3000/api/mail/send',{email: this.state.teams.owner.email, message:`wey ${this.state.user.userName} quiero unirme a tu equipo`, subject: this.state.user.email})

    }
  
    render() {
        const team = this.state.teams
        
        if(this.state.teams.length===0) return <p>Loading...</p>
    
        console.log('<<<<<<<<<<<<<<<<<<<<<<<', team.owner.userName)
        return (
            <div style={{backgroundColor: 'black', height: '100%'}}>
            <div>
            <NavBar {...this.props} />
            <div>
  <Button onClick={this.sendMail} style={{float: 'left', margin: '1px solid #09d3ac'}}> <Link to='/'>Send Request</Link></Button>
  </div>
            <Card
    style={{marginLeft: '20vw', width: '50vw', height: '40vw', backgroundColor: 'black', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh' }}
    cover={
      <img
        alt="example"
        src={team.img}
        style={{height: '50vh', width: '50vw', objectFit: 'cover', borderRadius: '1%'}}
      />
    }
    
  >
    <Meta
      avatar={<Avatar src={team.owner.img} />}
      title={team.name}
      description={team.description}
    />
  </Card>
 
  </div>
  <div>
  <h2 style={{color: 'white'}}>Members</h2>
  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
{team.members.map((member)=>(
    <Card
    hoverable
    style={{ width: 240, backgroundColor: 'black', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginBottom: '5vh' }}
    cover={<img alt="example" src={member.img} />}
  >
    <Meta title={member.userName} description={member.game} />
   
  
    
  </Card>
))}
</div>
  </div>
  <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
        )
    }
}

OneTeam.contextType = MyContext;
