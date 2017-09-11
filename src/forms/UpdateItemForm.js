import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ROOT_URL from '../constants';
import axios from 'axios';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */

const style = {
    margin: 12,
};

class UpdateItemForm extends Component {
    state = {
        open: false,
        title: '',
        description: ''
    };

    handleOpen = (e) => {
        e.preventDefault()
        this.setState({
            open: true,
            title: this.props.item.title,
            description: this.props.item.description
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // this.props.bucketlist.name = e.target.name;
        // this.props.bucketlist.description = e.target.description;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var item = {
            title: this.state.title,
            description: this.state.description
        }
        this.updateItem(e);
    }

    updateItem = (e) => {
        e.preventDefault();
        let bucketlistId = this.props.bucketlistId;
        let title = this.state.title
        let description = this.state.description;
        let payload = { "title": title, "description": description };

        console.log(payload);

        axios({
            method: 'put',
            url: ROOT_URL + '/api/v1/bucketlists/'+bucketlistId+'/items/'+this.props.item.id,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${window.sessionStorage.accessToken}`
            }
        }).then(function (response) {
            console.log(response.data);
            this.setState({ open: false });
            this.props.getItems();
        }.bind(this));
    }

    render() {
        console.log(this.props.item);
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
                    title="Update Item"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <TextField
                            name="title"
                            value={this.state.title}
                            hintText="Title"
                            floatingLabelText="Title"
                            onChange={this.handleChange.bind(this)}
                            style={{ 'width': 100 + '%' }}
                        /><br />
                        <TextField
                            name="description"
                            type="text"
                            value={this.state.description}
                            hintText="Item Description"
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

export default UpdateItemForm;