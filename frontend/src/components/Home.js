import React, {
    Component
} from 'react'
import {
    MyContext
} from '../context/index'
import {
    Link
} from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import NavBar from './NavBar'
import {Layout, Menu, Carousel, Card, Icon, Avatar} from 'antd'
import {TwitchStream} from 'react-twitch-stream'
const {Header, Footer} = Layout
const {Meta} = Card

class Home extends Component {

    state = {
        games: [],
        teams: [],
        events: []
    }

    componentDidMount() {
        axios
            
            .get('http://localhost:3000/api/gamesall')
            .then(res => {
                this.setState({
                    games: res.data.game
                
                })
                //console.log(res.data.game[0].name)
            })
            .catch(err => {
                console.log(err)
            })
        axios
        .get('http://localhost:3000/api/teamsall')
        .then(res => {
          this.setState({
              teams: res.data.team
          
          })
          ///eventsall
      })
      .catch(err => {
          console.log(err)
      })
      axios
      .get('http://localhost:3000/api/eventsall')
      .then(res => {
        this.setState({
            events: res.data.event
        
        })
        ///eventsall
    })
    .catch(err => {
        console.log(err)
    })
    }

    

    render() {
        const gamesArr = this.state.games
        const teamsArr = this.state.teams
        const eventsArr = this.state.events
        
        console.log(teamsArr)
        

        return ( 
            <div style={{backgroundColor: 'black'}} class='todoelhome'>
            {(this.localStorage)? console.log(0):console.log("choskas putooooo")}
            <Layout className="layout">
           

            <NavBar {...this.props} />

            </Layout>
            
            <Carousel autoplay>
    
       {gamesArr.map((oneGame, i) => (
        <div key={i} style={{alignContent: 'center'}}>
                <img style={{width: '100%', height:'65vh'}} key={i} src={oneGame.img} alt="imgs"/></div>
                ))}
    
   
  </Carousel>
  <h2 style={{color: 'white'}}>Games</h2>
  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>   
  {gamesArr.map((oneGame, i) => (
   
  <Card key={i}
    hoverable
    style={{ width: 240, borderColor: '#09d3ac', background: 'black' }}
    cover={<img alt="example" src={oneGame.img} style={{height: '20vh'}}  />}
  >
    <Meta key={i} title= {oneGame.name} description={oneGame.playgame} />
  
  </Card> 

   ))}
   </div>

   <h2 style={{color: 'white'}}>Recruitment</h2>
   <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            {teamsArr.map((oneTeam, i) => (
         
                <Card key={i}
    hoverable
    style={{ width: 240, borderColor: '#09d3ac', background: 'black', color: 'white' }}
    cover={<img alt="example" src={oneTeam.img} style={{ height: '20vh' ,  background: 'black', alignContent: 'center', textAlign: 'center'}}  />}
  >
    <Meta key={i} style= {{color: 'white'}} title= {oneTeam.name} description={oneTeam.playgame} />
  
  </Card> 
 
           
            ))}
            </div>
            
<h2 style={{color: 'white'}}>Events</h2>
<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
{eventsArr.map((oneEvent, i) => (
         
         <Card key={i}
hoverable
style={{ width: 240, borderColor: '#09d3ac', background: 'black', color: 'white' }}
cover={<img alt="example" src={oneEvent.img} style={{ height: '20vh'}}  />}
>
<Meta key={i} title= {oneEvent.name} description={oneEvent.address} />

</Card> 

     
     ))}
</div>
  <h2 style={{color: 'white'}}>Live Stream</h2>
<duv><TwitchStream channelName='riotgames' autoPlay muted/></duv>
            

  <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
            
        )
    }
}

Home.contextType = MyContext;

export default Home