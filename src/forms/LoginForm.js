import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';
import OutNavAppBar from '../navigation/OutNavAppBar';
import helpers from '../helpers';

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
        this.requestLogin = helpers.requestLogin.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
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
                            onClick={this.requestLogin} primary={true} style={style} />
                        <br />
                    </form>
                </Card>
            </div>

        );
    }
}

export default LoginForm;