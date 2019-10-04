import React, { Component } from 'react'
import axios from 'axios'
import { Menu, Card, Layout, Button } from 'antd';
import { Link } from 'react-router-dom'
import {
    MyContext
} from '../context/index'

const {Meta} = Card
const {Header} = Layout

export default class OneTeam extends Component {
    state= {
        teams: [],
        user: {}
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
                console.log('laressss', res)
                this.setState({
                    teams: res.data.team
                    
                })
                console.log('la dartewrfs', res.data)
            })
            .catch(err => {
                console.log(err)
            })
      

    }

    sendMail = ()=>{
        console.log('el owennnnnnnnneerrrrrr',this.state.teams.owner.email)
        axios
        .post('http://localhost:3000/api/mail/send',{email: this.state.teams.owner.email, message:`wey ${this.state.user.userName} quiero unirme a tu equipo`, subject: this.state.user.email})

    }
  
    render() {
        const team = this.state.teams
        if(this.state.teams.length===0) return <p>Loading...</p>
        console.log('el team del render: ', team)
        
        return (
            <div>
             <Header>
         
        
         <div className="logo"></div>
         
         <Menu
           theme="dark"
           mode="horizontal"
           defaultSelectedKeys={['2']}
           style={{ lineHeight: '64px' }}
         >
           <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
           <Menu.Item key="2"><Link to= '/team'>Teams</Link></Menu.Item>
           <Menu.Item key="3">Logout</Menu.Item>
           <Menu.Item key="4"> <Link to= '/profile'>Profile</Link>
       </Menu.Item>
          
         </Menu>
         
       </Header>
                 <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={team.img} />}
  >
    <Meta title={team.name} description={team.members} />
    <Meta description={team.description} />
  </Card>
  <Button onClick={this.sendMail}>Send Request</Button>
            </div>
        )
    }
}

OneTeam.contextType = MyContext;
