import React, { Component } from 'react';
import './App.css';

import RegisterForm from './forms/RegisterForm';
import LoginForm from './forms/LoginForm';

import Home from './components/Home';

import BucketlistsView from './components/BucketlistsView';
import BucketlistView from './components/BucketlistView';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey800, blueGrey500 } from 'material-ui/styles/colors';

import { Route, Switch } from 'react-router-dom';

import ROOT_URL from './constants';
import axios from 'axios';


const muiTheme = getMuiTheme({
  palette: {
    textColor: blueGrey800,
    primary1Color: blueGrey500,
  },
  appBar: {
    height: 50,
  },
});


class App extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: {},
      bucketlists: [],
      bucketlist: {}
    };
  }

  getBucketlists() {
    var bucketlists = {};
    axios({
      method: 'get',
      url: ROOT_URL + '/api/v1/bucketlists',
      headers: {
        "Authorization": `JWT ${window.sessionStorage.accessToken}`,
      }
    }).then(response => {
      bucketlists = response.data.bucketlists;
      this.setState({
        bucketlists: bucketlists,
      })
    }).catch(error => {
      return error;
    });
  }

  addBucketlist(bucketlist) {
    var timestamp = (new Date()).getTime();
    this.state.bucketlists['bckt-' + timestamp] = bucketlist;
    this.setState({ bucketlists: this.state.bucketlists });
  }

  

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route exact path="/bucketlists/" render={()=>
            <BucketlistsView getBucketlists={this.getBucketlists.bind(this)} 
                             addBucketlist = {this.addBucketlist.bind(this)}
                             bucketlists = {this.state.bucketlists}
                             bucketlist = {this.state.bucketlist}
            />} />
            <Route exact path="/bucketlists/:id/items" component={ BucketlistView } name=""/>
            
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
