import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ROOT_URL from '../constants';
import axios from 'axios';

class CreateBucketlistForm extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            name: '',
            description: ''
        };
    }

    handleOpen = () => {
        this.setState({
            open: true,
            name: '',
            description: ''
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var bucketlist = {
            name: this.state.name,
            description: this.state.description
        }
        this.props.addBucketlist(bucketlist);
        console.log(this);
        this.props.createBucketlist(e, this);
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleSubmit}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Create Bucketlist" onClick={this.handleOpen} />
                <Dialog
                    title="Create Bucketlist"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <TextField
                            name="name"
                            value={this.state.name}
                            hintText="Name"
                            floatingLabelText="Name"
                            onChange={this.handleChange.bind(this)}
                            style={{ 'width': 100 + '%' }}
                        /><br />
                        <TextField
                            name="description"
                            type="description"
                            value={this.state.description}
                            hintText="Bucketlist Description"
                            floatingLabelText="Description"
                            onChange={this.handleChange.bind(this)}
                            style={{ 'width': 100 + '%' }}
                        /><br />
                        <br />
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default CreateBucketlistForm;