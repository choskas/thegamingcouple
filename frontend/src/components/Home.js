import React, {
    Component
} from 'react'
import {
    MyContext
} from '../context/index'
import {
    Link
} from 'react-router-dom'
import HOME_SERVICE from '../services/allthings'
import axios from 'axios'
import {Layout, Menu, Carousel, Card} from 'antd'
const {Header} = Layout
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
    }

    render() {
        const gamesArr = this.state.games
        return ( 
            <div>
            <Layout className="layout">
           
            <Header>
         
        
              <div className="logo"></div>
              
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Teams</Menu.Item>
                <Menu.Item key="3">Register</Menu.Item>
                <Menu.Item key="4"> 
            </Menu.Item>
               
              </Menu>
              
            </Header>
            </Layout>
            
            <Carousel autoplay>
    
       {gamesArr.map((oneGame, i) => (
        <div key={i} style={{alignContent: 'center'}}>
                <img style={{width: '95%', height:'70vh'}} key={i} src={oneGame.img} alt="imgs"/></div>
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
           
            {gamesArr.map((oneGame, i) => (
                <Carousel>
                <Card key={i}
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={oneGame.img} style={{height: '20vh'}}  />}
  >
    <Meta key={i} title= {oneGame.name} description={oneGame.playgame} />
  
  </Card> 
                </Carousel>
            
            ))}
                
            
            
            </div>
            
        )
    }
}

Home.contextType = MyContext;

export default Home