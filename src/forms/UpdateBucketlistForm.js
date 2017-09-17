import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import helpers from '../helpers';


class UpdateBucketlistForm extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            name: '',
            description: ''
        };
        this.updateBucketlist = helpers.updateBucketlist.bind(this)
    }

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
        this.updateBucketlist(e);
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