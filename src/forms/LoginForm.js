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

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            'password': '',
            'authenticated': false
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    requestLogin(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        var payload = { "username": username, "password": password };
        axios({
            method: 'post',
            url: ROOT_URL + '/api/v1/auth/login',
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            window.sessionStorage.accessToken = response.data.access_token;
            this.setState({ authenticated: true });
            this.props.history.push({ pathname: '/bucketlists', state: this.state.authenticated });
        }.bind(this));
    }

    render() {
        return (
            <div className="LoginForm">
                <OutNavAppBar />
                <Card style={{ 'width': 40 + '%', 'marginLeft': 30 + '%' }}>
                    <form >
                        <CardTitle>Login</CardTitle>
                        <TextField
                            name="username"
                            value={this.state.username}
                            hintText="Username"
                            floatingLabelText="Username"
                            onChange={this.handleChange.bind(this)}
                            style={{ 'width': 80 + '%' }}
                        /><br />
                        <TextField
                            name="password"
                            type="password"
                            value={this.state.password}
                            hintText="Password"
                            floatingLabelText="Password"
                            onChange={this.handleChange.bind(this)}
                            style={{ 'width': 80 + '%' }}
                        /><br />
                        <RaisedButton label="Login"
                            onClick={this.requestLogin.bind(this)} primary={true} style={style} />
                        <br />
                    </form>
                </Card>
            </div>

        );
    }
}

export default LoginForm;