import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import NavBar from './NavBar'
import {Layout, Descriptions} from 'antd'
import axios from 'axios'

const {Footer} = Layout

export default class OneEvent extends Component {
state= {
  events: {
    location: {
      address: '',
      coordinates: [0,0]
    }
  }
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
      .get(`http://localhost:3000/api/event/${id}`)
      .then(res => {
          this.setState({
              events: res.data.event
          })

          console.log('la dartewrfs', res.data)
      })
      .catch(err => {
          console.log(err)
      })
      if (!localStorage.user) return this.props.history.push('/login');

}

    render() {
      const oneEvent = this.state.events
      // let address
      // if(!oneEvent.location === undefined) {
      //   address = oneEvent.location.address
      // } 
        
      
      
      
        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoiY2hvc2thcyIsImEiOiJjazBkeG8zNjAwY2NrM2xxZHlodzAyZzM3In0.VF-SFf5PUyUc4SCfBJ0-Tg"
          });
        return (
            <div style={{backgroundColor: 'black', color: 'white'}}>

            <NavBar {...this.props} />
            <div  style={{display: 'flex', flexDirection: 'column'}}>
            <Descriptions title="Event Info" style={{color: 'white'}}>
    <Descriptions.Item label="Name"> {oneEvent.name}</Descriptions.Item>
   
   
   
    <Descriptions.Item label="Address" style={{color: 'white'}}>
      {oneEvent.location.address}
      
    </Descriptions.Item>
 
    <Descriptions.Item label="Price">${oneEvent.price}</Descriptions.Item>
    <Descriptions.Item label="Descritpion" style={{width: '5vw'}}>{oneEvent.description}</Descriptions.Item>
    <Descriptions.Item label="Get Your Tickets" style={{width: '5vw'}}> <a href={oneEvent.getTickets}> HERE!</a></Descriptions.Item>
  </Descriptions>

  </div>
  <div style={{marginTop: '5vh', marginLeft: '25vw', marginBottom: '5vh'}}>
              <Map
             
  style="mapbox://styles/mapbox/streets-v9"
  center={[oneEvent.location.coordinates[0], oneEvent.location.coordinates[1]]}
  zoom= {[15]}
  containerStyle={{
    height: "50vh",
    width: "50vw"
  }}>
    <Layer
      type="symbol"
      id="marker"
      layout={{ "icon-image": "marker-15" }}>
      <Feature coordinates={[oneEvent.location.coordinates[0], oneEvent.location.coordinates[1]]}/>


    </Layer>
    <Popup
  coordinates={[oneEvent.location.coordinates[0], oneEvent.location.coordinates[1]]}
  offset={{
    'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
  }}>
  <img src={oneEvent.img} style={{width: '30px', height: '30px'}} alt='img'/>
</Popup>
</Map>
</div>
 <Footer style={{ textAlign: 'center' }}>The Gaming Couple ©2019 Created by Choskas</Footer>
            </div>
          );
    }
}
