import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';
import ROOT_URL from '../constants';
import axios from 'axios';
import OutNavAppBar from '../navigation/OutNavAppBar';


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
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    requestRegister(e){
        console.log("Here!");
        e.preventDefault();
        console.log(this);
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword;
        
        var payload = { "username": username, "email": email, "password": password, "confirm_password": confirmPassword };
        console.log(payload);
        axios({
            method: 'post',
            url: ROOT_URL + '/api/v1/auth/register',
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            window.sessionStorage.accessToken = response.data.access_token;
            this.setState({authenticated: true});
            this.props.history.push({pathname:'/login',state:this.state.authenticated});
        }.bind(this));
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

                    <RaisedButton label="Register" onClick={this.requestRegister.bind(this)} primary={true} style={style} />
                    <br />
                </form>
            </Card>
            </div>
        );
    }
}

export default RegisterForm;