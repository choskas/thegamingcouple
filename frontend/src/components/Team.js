import React, { Component } from 'react'
import axios from 'axios'
import { Card, Icon, Avatar, Layout} from 'antd';
import {Link} from 'react-router-dom'
import { MyContext } from '../context';
import NavBar from './NavBar'
import '../App.css'

const { Footer} = Layout
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
            <div style={{backgroundColor: 'black', width: '100%', height: '100%'}}>
  <NavBar {...this.props} />
            <h1 style={{color: 'white'}}>Teams</h1>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {teamsArr.map((oneTeam, i) => {
                    return (
                    <Card key={i}
    style={{ width: 240, borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh' }}
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
      description={oneTeam.searching}
    />
  </Card>
                 ) })} 
                 </div>
                 <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
        )
    }
}


Team.contextType = MyContext;