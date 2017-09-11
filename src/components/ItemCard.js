import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import UpdateItemForm from '../forms/UpdateItemForm';
import FontIcon from 'material-ui/FontIcon';
import ROOT_URL from '../constants';
import axios from 'axios';

class ItemCard extends Component {
    constructor() {
        super();
        this.state = {
            selected_item: null,
        };
    }

    handleClick(e) {
        this.setState({ selected_item: this.props.item.id });
    }

    deleteItem(e) {
        e.preventDefault();
        let item_id = this.props.item.id;
        let bucketlist_id = this.props.bucketlistId;
        alert("Confirm delete " + this.props.item.title)
        axios({
            method: 'delete',
            url: ROOT_URL + '/api/v1/bucketlists/' + bucketlist_id + '/items/' + item_id,
            headers: {
                "Authorization": `JWT ${window.sessionStorage.accessToken}`,
            }
        }).then(response => {
            this.props.getItems();
        }).catch(error => {
            return error;
        });
    }

    render() {
        console.log(this.props.item.name);
        return (
            <div className="Item">
                <Card style={{ width: 60 + "%", marginLeft: 20 + "%", marginTop: 1 + "%" }}>
                    <CardTitle title={this.props.item.title} />
                    <CardText style={{ "fontSize": 1.2 + "em" }}>
                        {this.props.item.description}
                    </CardText>
                    <CardActions>
                        <FlatButton label="Update" style={{ width: 40 + "%" }}>
                            <UpdateItemForm bucketlistId={this.props.bucketlistId}
                                getItems={this.props.getItems}
                                item={this.props.item} />
                        </FlatButton>
                        <FlatButton label="Delete" style={{ width: 40 + "%" }}>
                            <a href=""><FontIcon className="material-icons"
                                onClick={this.deleteItem.bind(this)}
                            >delete</FontIcon></a>
                        </FlatButton>
                    </CardActions>
                </Card>
            </div>
        )
    }

}

export default ItemCard;