import React, { Component } from 'react'
import axios from 'axios'
import { Card, Icon, Avatar, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom'
import { MyContext } from '../context';
import NavBar from './NavBar'

const {Header} = Layout
const {Meta} = Card

export default class Team extends Component {

 

state= {
    teams: [],
    user: {}
}

    componentDidMount() {
      if (localStorage.user) {
        let user = JSON.parse(localStorage.user)
        this.setState({user})
       }
      console.log('pto logged: ', this.context.loggedUser)
        axios
            
            .get('http://localhost:3000/api/teamsall')
            .then(res => {
                this.setState({
                    teams: res.data.team

                })
                console.log('djhdfhsdfshjdf',res.data.team)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        const teamsArr = this.state.teams
        
        return (
            <div>
  <NavBar {...this.props} />
            <h1>Teams</h1>
                {teamsArr.map((oneTeam, i) => {
                    return (
                    <Card key={i}
    style={{ width: 300 }}
    cover={
      <img
        alt={oneTeam.name}
        src={oneTeam.img}
      />
    }
    actions={[
      
    <Link to={`/teamregister/${oneTeam._id}`}>  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"  key="ellipsis" /> </Link>
    ]}
  >
    <Meta
      avatar={<Avatar src={oneTeam.owner.img} />}
      title={oneTeam.owner.userName}
      description={oneTeam.description}
    />
  </Card>
                 ) })} 
            </div>
        )
    }
}


Team.contextType = MyContext;