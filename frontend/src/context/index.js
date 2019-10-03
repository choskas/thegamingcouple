import React, { Component, createContext } from 'react';
import AUTH_SERVICE from '../services/auth';

export const MyContext = createContext();

class MyProvider extends Component {
  state = {
    loggedUser: null,
    team: []
  };

  logUser = (loggedUser) => {
    this.setState({ loggedUser });
  };

  logOut = () => {
    console.log('<<<<<<<<<<<estaaaaaaaaas mamadaaaaaaas')
    AUTH_SERVICE.logOut()
      .then((response) => {
        localStorage.clear()
        console.log(response)
        this.setState({ loggedUser: null });
      })
      .catch((err) => console.log(err));
  };

  keepTeam = (team) =>{
    this.setState({team})
  }

  render() {
    const { state, logUser, keepTeam, logOut } = this;
    return (
      <MyContext.Provider value={{ state, logUser, keepTeam, logOut }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;