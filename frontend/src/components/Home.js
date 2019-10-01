import React, { Component } from 'react'
import {MyContext} from '../context/index'
import {Link} from 'react-router-dom'

class Home extends Component {  
    render(){
        return(
            <h1>Hola home</h1>
        )
    }
}

Home.contextType = MyContext;

export default Home