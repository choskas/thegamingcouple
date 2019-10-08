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
import {Layout, Carousel, Card, Button, Icon} from 'antd'
import {TwitchStream} from 'react-twitch-stream'
const {Footer} = Layout
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
        .get('http://localhost:3000/api/hometeams')
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
            
            <Carousel style={{marginBottom: '10vh', marginTop: '1vh'}} autoplay>
    
       {gamesArr.map((oneGame, i) => (
        <div key={i} style={{alignContent: 'center'}}>
                <img style={{width: '100%', height:'65vh'}} key={i} src={oneGame.img} alt="imgs"/></div>
                ))}
    
   
  </Carousel>
  <h2 style={{color: 'white'}}>Games</h2>
  <hr style={{height: '1px', borderColor: '#09d3ac', backgroundColor: '#09d3ac'}}/>
  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: '10vh'}}>   
  {gamesArr.map((oneGame, i) => (
   <Link to={`/game/${oneGame._id}`}>
  <Card key={i}
    hoverable
    style={{ width: '30vw', borderColor: '#09d3ac', background: 'black', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh'}}
    cover={<img alt="example" src={oneGame.img} style={{height: '35vh'}}  />}
  >
    <Meta key={i} title= {oneGame.name} description={oneGame.playgame} />
  
  </Card> 
</Link>
   ))}
  
   </div>

   <h2 style={{color: 'white'}}>Recruitment</h2>
   <hr style={{height: '1px', borderColor: '#09d3ac', backgroundColor: '#09d3ac'}}/>
   <div  style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: '10vh'}}>
            {teamsArr.map((oneTeam, i) => (
         
                <Link to={`/teamregister/${oneTeam._id}`}>      <Card key={i}
    hoverable
    style={{  borderColor: '#09d3ac', background: 'black', color: 'white', width: '20vw', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh' }}
    cover={<img alt="example" src={oneTeam.img} style={{ height: '20vh' ,  background: 'black', alignContent: 'center', textAlign: 'center'}}  />}
  >
    <Meta key={i} style= {{color: 'white'}} title= {oneTeam.name} description={oneTeam.playgame} />
  
  </Card> </Link>
 
           
            ))}
            </div>
            <div style={{float: 'right', color: '#09d3ac', fontSize:'1.5rem'}}>
            <Link to='/team'><Button type= 'dashed' style= {{backgroundColor: 'black', color: 'white'}}>View All</Button></Link>
            </div>
            
<h2 style={{color: 'white'}}>Events</h2>
<hr style={{height: '1px', borderColor: '#09d3ac', backgroundColor: '#09d3ac'}}/>
<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '10vh'}}>
{eventsArr.map((oneEvent, i) => (
         
    <Link to={`/event/${oneEvent._id}`}>        <Card key={i}
hoverable
style={{ width: 240, borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh' }}
cover={<img alt="example" src={oneEvent.img} style={{ height: '20vh'}}  />}
>
<Meta key={i} title= {oneEvent.name} description={oneEvent.address} />
<div style={{float: 'right', color: '#09d3ac', fontSize:'1.5rem'}}>
       
            </div>
            
</Card> </Link>

     
     ))}
</div>
      <div style={{float: 'right', color: '#09d3ac', fontSize:'1.5rem'}}>
            <Link to='/allevents'><Button type= 'dashed' style= {{backgroundColor: 'black', color: 'white'}}>View All</Button></Link>
            </div>
  <h2 style={{color: 'white'}}>Live Stream</h2>
  <hr style={{height: '1px', borderColor: '#09d3ac', backgroundColor: '#09d3ac'}}/>
<div style={{width: '80vw', position: 'relative', marginLeft: '10vw', border: '2px solid #09d3ac', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginBottom: '5vh', marginTop: '2vh'}}><TwitchStream channelName='riotgames' autoPlay muted/></div>
            
<div>
  <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
  </div>
            </div>
            
        )
    }
}

Home.contextType = MyContext;

export default Home