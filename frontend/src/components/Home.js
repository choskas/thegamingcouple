import React, {
    Component
} from 'react'
import {
    MyContext
} from '../context/index'
import {
    Link
} from 'react-router-dom'
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
            <div>
            {(this.localStorage)? console.log(0):console.log("choskas putooooo")}
            <Layout className="layout">
           

            <NavBar {...this.props} />

            {/* <Link to='/'>
             <img style={{width: 'auto', height: '65px', float: 'left'}} src='/images/54516548_480886059109258_4540151525636308992_n.jpg'></img> 
             </Link>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
              
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2"><Link to='/team'>Teams</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/signup'>Sign Up</Link></Menu.Item>
                <Menu.Item key="4"> <Link to='/login'>Log in</Link>
            </Menu.Item>
               
              </Menu> */}
              
         
            </Layout>
            
            <Carousel autoplay>
    
       {gamesArr.map((oneGame, i) => (
        <div key={i} style={{alignContent: 'center'}}>
                <img style={{width: '95%', height:'65vh'}} key={i} src={oneGame.img} alt="imgs"/></div>
                ))}
    
   
  </Carousel>
  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>   
  {gamesArr.map((oneGame, i) => (
   
  <Card key={i}
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={oneGame.img} style={{height: '20vh'}}  />}
  >
    <Meta key={i} title= {oneGame.name} description={oneGame.playgame} />
  
  </Card> 

   ))}
   </div>

   <h2>Recruitment</h2>
   <Carousel autoplay>
            {teamsArr.map((oneTeam, i) => (
         
                <Card key={i}
    hoverable
  
    cover={<img alt="example" src={oneTeam.img} style={{ height: '20vh' , width: '20vw'}}  />}
  >
    <Meta key={i} title= {oneTeam.name} description={oneTeam.playgame} />
  
  </Card> 
 
            
            ))}
            </Carousel>   
            
<h2>Events</h2>

{eventsArr.map((oneEvent, i) => (
         
         <Card key={i}
hoverable

cover={<img alt="example" src={oneEvent.img} style={{ height: '20vh' , width: '20vw'}}  />}
>
<Meta key={i} title= {oneEvent.name} description={oneEvent.playgame} />

</Card> 

     
     ))}

  <h2>Live Stream</h2>
<duv><TwitchStream channelName='riotgames' autoPlay muted/></duv>
            

  <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
            
        )
    }
}

Home.contextType = MyContext;

export default Home