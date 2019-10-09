import React, { Component } from 'react'
import { Card, Layout } from 'antd';
import {
    MyContext
} from '../context/index'
import AUTH_SERVICE from '../services/auth';
import NavBar from './NavBar'

const {Meta} = Card
const { Footer} = Layout

export default class OneGame extends Component {
    state= {
        games: {}
    }
    
    
    componentDidMount() {
        if (localStorage.user) {
            let user = JSON.parse(localStorage.user)
            this.setState({user})
           }
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
       
       AUTH_SERVICE.oneGame(id)
            .then(res => {
              
                this.setState({
                    games: res.data.game
                    
                })
                console.log('la dartewrfs', res.data)
            })
            .catch(err => {
                console.log(err)
            })
           

    }

  
  
    render() {
        const games = this.state.games
        
        console.log('zzzzzzzz', games)
        
        
        return (
            <div style={{  background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginBottom: '3vh' }}>
           
            <NavBar {...this.props} />
                
  <div style={{display: 'flex', flexDirection: 'row',}}>
  <div style={{ background: 'black', color: 'white', marginTop: '3vh', marginBottom: '3vh' }}>
  <h2 style={{color: 'white'}}>{games.name}</h2>

    <Card
    hoverable
    style={{ width: '40vw', borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh', marginLeft: '10vw'  }}
    cover={<img alt="example" src={games.img} />}
  >
    <Meta title={<a href={games.playgame}>Play {games.name}</a>} description={games.description} />
   
  
    
  </Card>


  </div>
  <div><iframe title={games.name} style={{marginLeft: '5vw', marginTop: '30vh', width: '30vw', height: '30vh'}} width="600px" height="500px" src={games.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>
  <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
        )
    }
}

OneGame.contextType = MyContext;

