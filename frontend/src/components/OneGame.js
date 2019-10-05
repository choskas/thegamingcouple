import React, { Component } from 'react'
import axios from 'axios'
import { Menu, Card, Layout, Button } from 'antd';
import { Link } from 'react-router-dom'
import {
    MyContext
} from '../context/index'
import NavBar from './NavBar'

const {Meta} = Card
const {Header} = Layout

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
        console.log('elidddd', id)
        axios
            .get(`http://localhost:3000/api/game/${id}`)
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
            <div>
           
            <NavBar {...this.props} />
                
  
  <div>
  <h2>{games.name}</h2>

    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={games.img} />}
  >
    <Meta title={games.playgame} description={games.description} />
   
  
    
  </Card>


  </div>
            </div>
        )
    }
}

OneGame.contextType = MyContext;
