import React, { Component } from 'react'
import axios from 'axios'
import { Card, Icon, Layout} from 'antd';
import {Link} from 'react-router-dom'
import { MyContext } from '../context';
import NavBar from './NavBar'
import '../App.css'

const { Footer} = Layout
const {Meta} = Card

export default class Team extends Component {

 

state= {
    events: [],
  
}

    componentDidMount() {
      if (localStorage.user) {
        let user = JSON.parse(localStorage.user)
        this.setState({user})
       }
     
        axios
            
            .get('http://localhost:3000/api/eventsall')
            .then(res => {
                this.setState({
                    events: res.data.event

                })
          
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        const eventsArr = this.state.events
    
        return (
            <div style={{backgroundColor: 'black'}}>
  <NavBar {...this.props} />
            <h1 style={{color: 'white'}}>Events</h1>
                {eventsArr.map((oneEvent, i) => {
                    return (
                    <Card key={i}
   style={{ width: 240, borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh' }}
    cover={
      <img
        alt={oneEvent.name}
        src={oneEvent.img}
      />
    }
    actions={[
      
    <Link to={`/event/${oneEvent._id}`}>  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"  key="ellipsis" /> </Link>
    ]}
  >
    <Meta
      
      title={oneEvent.name}
      description={`$${oneEvent.price}`}
    />
  </Card>
                 ) })} 
                 <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
        )
    }
}


Team.contextType = MyContext;