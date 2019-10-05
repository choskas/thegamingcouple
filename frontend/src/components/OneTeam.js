import React, { Component } from 'react'
import axios from 'axios'
import { Menu, Card, Layout, Button } from 'antd';
import { Link } from 'react-router-dom'
import {
    MyContext
} from '../context/index'
import NavBar from './NavBar'

const {Meta} = Card
const {Header} = Layout

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
        console.log('el team del render: ', team.members[0].userName)
        
        return (
            <div>
            <div>
            <NavBar {...this.props} />
                 <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={team.img} />}
  >
    <Meta title={team.name} description={team.name} />
    <Meta description={team.description} />
  
    
  </Card>
  <Button onClick={this.sendMail}>Send Request</Button>
  </div>
  <div>
  <h2>members</h2>
{team.members.map((member)=>(
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={member.img} />}
  >
    <Meta title={member.userName} description={member.game} />
   
  
    
  </Card>
))}

  </div>
            </div>
        )
    }
}

OneTeam.contextType = MyContext;
