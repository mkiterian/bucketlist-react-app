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
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import helpers from './helpers';


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
    this.getBucketlists = helpers.getBucketlists.bind(this);
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
          <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route exact path="/bucketlists/" render={()=>
            <BucketlistsView getBucketlists={this.getBucketlists} 
                             addBucketlist = {this.addBucketlist.bind(this)}
                             bucketlists = {this.state.bucketlists}
                             bucketlist = {this.state.bucketlist}
            />} />
            <Route exact path="/bucketlists/:id/items" component={ BucketlistView } name=""/>
            
          </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
