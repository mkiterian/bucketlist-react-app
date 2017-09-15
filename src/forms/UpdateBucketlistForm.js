import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import ROOT_URL from '../constants';
import axios from 'axios';


const style = {
    margin: 12,
};

class UpdateBucketlistForm extends Component {
    state = {
        open: false,
        name: '',
        description: ''
    };

    handleOpen = (e) => {
        e.preventDefault()
        this.setState({
            open: true,
            name: this.props.bucketlist.name,
            description: this.props.bucketlist.description
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
        // var bucketlist = {
        //     name: this.state.name,
        //     description: this.state.description
        // }
        this.updateBucketlist(e);
    }

    updateBucketlist = (e) => {
        e.preventDefault();
        let name = this.state.name
        let description = this.state.description;
        let payload = { "name": name, "description": description };

        axios({
            method: 'put',
            url: ROOT_URL + '/api/v1/bucketlists/' + this.props.bucketlist.id,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${window.sessionStorage.accessToken}`
            }
        }).then(function (response) {
            this.setState({ open: false });
            this.props.getBucketlists();
        }.bind(this));
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
                <a href=""><FontIcon className="material-icons"
                    onClick={this.handleOpen}
                >mode_edit</FontIcon></a>
                <Dialog
                    title="Update Bucketlist"
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
                            type="text"
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

export default UpdateBucketlistForm;