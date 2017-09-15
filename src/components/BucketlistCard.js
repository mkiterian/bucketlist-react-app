import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import UpdateBucketlistForm from '../forms/UpdateBucketlistForm';
import FontIcon from 'material-ui/FontIcon';
import ROOT_URL from '../constants';
import axios from 'axios';

class BucketlistCard extends Component {
    constructor() {
        super();
        this.state = {
            selected_bucketlist: null,
        };
    }

    handleClick(e) {
        this.setState({ selected_bucketlist: this.props.bucketlist.id });
    }

    deleteBucketlist(e) {
        e.preventDefault();
        var bucketlist_id = this.props.bucketlist.id;
        alert("Confirm delete " + this.props.bucketlist.name)
        axios({
            method: 'delete',
            url: ROOT_URL + '/api/v1/bucketlists/' + bucketlist_id,
            headers: {
                "Authorization": `JWT ${window.sessionStorage.accessToken}`,
            }
        }).then(response => {
            this.props.getBucketlists();
        }).catch(error => {
            return error;
        });
        this.props.getBucketlists();
    }

    render() {
        return (
            <div className="Bucketlist">
                <Card style={{ width: 60 + "%", marginLeft: 20 + "%", marginTop: 1 + "%" }}>

                    <Link onClick={this.handleClick.bind(this)}
                        id={this.props.bucketlist.id}
                        to={{
                            pathname: "/bucketlists/" + this.props.bucketlist.id + "/items",
                            id: this.props.bucketlist.id,
                        }}
                        className="bucketlist-name"
                     name={this.props.bucketlist.name}>
                        <CardTitle title={this.props.bucketlist.name} />
                    </Link>



                    <CardText style={{ "fontSize": 1.2 + "em" }}>
                        {this.props.bucketlist.description}
                    </CardText>


                    <CardActions>
                        <FlatButton label="Update" style={{ width: 40 + "%" }}>
                            <UpdateBucketlistForm getBucketlists={this.props.getBucketlists} bucketlist={this.props.bucketlist} />
                        </FlatButton>
                        <FlatButton label="Delete" style={{ width: 40 + "%" }}>
                            <a href=""><FontIcon className="material-icons"
                                onClick={this.deleteBucketlist.bind(this)}
                            >delete</FontIcon></a>
                        </FlatButton>
                    </CardActions>
                </Card>
            </div>
        )
    }

}

export default BucketlistCard;