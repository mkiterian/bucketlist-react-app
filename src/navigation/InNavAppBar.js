import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';


const InNavLinks = () => (
  <ToolbarGroup>
    <FlatButton style={{ 'color': 'white' }} label="Bucketlists" containerElement={<Link to="/bucketlists" />} />
    <FlatButton style={{ 'color': 'white' }} label="Logout" containerElement={<Link to="/login" />} />
  </ToolbarGroup>
);

class InNavAppBar extends Component {
  endSession(e) {
    e.preventDefault();
    window.sessionStorage.accessToken = "";
    window.location.replace('/');
  }

  render() {
    return (
      <AppBar title="Bucketlists"
        titleStyle={{ marginLeft: 30 + '%' }}
        iconElementRight={<InNavLinks />}
        showMenuIconButton={false}
        onClick={this.endSession}
      />
    );
  }
}

export default InNavAppBar;

