import React, { Component } from 'react'
import axios from 'axios'
import { Card, Icon, Avatar, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom'

const {Header} = Layout
const {Meta} = Card

export default class Team extends Component {

 

state= {
    teams: []
}

    componentDidMount() {
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
           <Menu.Item key="3" onClick={this.logout}>Logout</Menu.Item>
           <Menu.Item key="4"> <Link to= '/profile'>Profile</Link>
       </Menu.Item>
          
         </Menu>
         
       </Header>
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
