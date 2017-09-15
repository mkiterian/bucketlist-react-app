import React, { Component } from 'react';
import OutNavAppBar from '../navigation/OutNavAppBar';

class Home extends Component {
  render() {
    return (

      <div className="Home">
        <OutNavAppBar />
        <h3 >Welcome to the bucketlist app</h3>
      </div>
    );
  }
}

export default Home;