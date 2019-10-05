import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import NavBar from './NavBar'
export default class OneEvent extends Component {

 

    render() {
        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoiY2hvc2thcyIsImEiOiJjazBkeG8zNjAwY2NrM2xxZHlodzAyZzM3In0.VF-SFf5PUyUc4SCfBJ0-Tg"
          });
        return (
            <>
            <NavBar {...this.props} />
              <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: "50vh",
    width: "50vw"
  }}>
    <Layer
      type="symbol"
      id="marker"
      layout={{ "icon-image": "marker-15" }}>
      <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>


    </Layer>
    <Popup
  coordinates={[-0.13235092163085938,51.518250335096376]}
  offset={{
    'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
  }}>
  <h1>Popup</h1>
</Popup>
</Map>
            </>
          );
    }
}
