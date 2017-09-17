import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';
import OutNavAppBar from '../navigation/OutNavAppBar';
import helpers from '../helpers';


const style = {
    margin: 12,
  };

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            'password': '',
            confirmPassword: ''
        };
        this.requestRegister = helpers.requestRegister.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="RegisterForm">
            <OutNavAppBar />
            <Card style={{ 'width': 40+'%', 'marginLeft': 30+'%' }}>
                <form>
                <CardTitle>Register</CardTitle>
                    <TextField
                        name="username"
                        value={this.state.username}
                        hintText="Username"
                        floatingLabelText="Username"
                        onChange={this.handleChange.bind(this)}
                        style={{ 'width': 80+'%' }}
                    /><br />
                    <TextField
                        name="email"
                        type="email"
                        value={this.state.email}
                        hintText="Email"
                        floatingLabelText="Email"
                        onChange={this.handleChange.bind(this)}
                        style={{ 'width': 80+'%' }}
                    /><br />
                    <TextField
                        name="password"
                        type="password"
                        value={this.state.password}
                        hintText="Password"
                        floatingLabelText="Password"
                        onChange={this.handleChange.bind(this)}
                        style={{ 'width': 80+'%' }}
                    /><br />
                    <TextField
                        name="confirmPassword"
                        type="password"
                        value={this.state.confirmPassword}
                        hintText="Confirm Password"
                        floatingLabelText="Confirm Password"
                        onChange={this.handleChange.bind(this)}
                        style={{ 'width': 80+'%' }}
                    /><br />
                    <RaisedButton label="Register" onClick={this.requestRegister} primary={true} style={style} />
                    <br />
                </form>
            </Card>
            </div>
        );
    }
}

export default RegisterForm;