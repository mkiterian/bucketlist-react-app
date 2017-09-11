import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

const OutNavLinks = () => (
    <ToolbarGroup>
      <FlatButton style={{ 'color': 'white' }} label="Home" containerElement={<Link to="/" />} />
      <FlatButton style={{ 'color': 'white' }} label="Register" containerElement={<Link to="/register" />} />
      <FlatButton style={{ 'color': 'white' }} label="Login" containerElement={<Link to="/login" />} />
    </ToolbarGroup>
  );

  const OutNavAppBar = () => (
    <AppBar
      title="Bucketlists"
      titleStyle={{ marginLeft: 30 + '%' }}
      iconElementRight={<OutNavLinks />}
      showMenuIconButton={false}
    />
  );

  export default OutNavAppBar;