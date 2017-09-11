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

        axios({
            method: 'put',
            url: ROOT_URL + '/api/v1/bucketlists/'+bucketlistId+'/items/'+this.props.item.id,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${window.sessionStorage.accessToken}`
            }
        }).then(function (response) {
            this.setState({ open: false });
            this.props.getItems();
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