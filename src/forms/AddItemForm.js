import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ROOT_URL from '../constants';
import axios from 'axios';

class AddItemForm extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            title: '',
            description: ''
        };
    }

    handleOpen = () => {
        this.setState({
            open: true,
            title: '',
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
        var item = {
            title: this.state.title,
            description: this.state.description
        }
        // this.props.addItem(item);
        this.createItem(e);
    }

    createItem = (e) => {
        e.preventDefault();
        let title = this.state.title
        let description = this.state.description;
        let payload = { "title": title, "description": description };

        console.log(payload);

        axios({
            method: 'post',
            url: ROOT_URL + '/api/v1/bucketlists/' + this.props.bucketlistId + '/items',
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${window.sessionStorage.accessToken}`
            }
        }).then(function (response) {
            console.log(response.data);
            this.setState({ open: false });
            this.props.getItems();
            // window.location.reload();
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

                <RaisedButton label="Add Item" onClick={this.handleOpen} />
                <Dialog
                    title="Add Item"
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
                            type="description"
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

export default AddItemForm;