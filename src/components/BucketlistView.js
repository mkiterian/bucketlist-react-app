import React, { Component } from 'react';
import ROOT_URL from '../constants';
import axios from 'axios';
import AddItemForm from '../forms/AddItemForm';
import ItemCard from './ItemCard';
import InNavAppBar from '../navigation/InNavAppBar';

class BucketlistView extends Component {
  constructor() {
    super();
    this.state = {
      bucket_list_id: null,
      items: []
    }
  }

  componentWillMount() {
    this.getItems();
  }

  getItems() {
    var items = {};
    axios({
      method: 'get',
      url: ROOT_URL + '/api/v1/bucketlists/' + this.props.match.params.id + '/items',
      headers: {
        "Authorization": `JWT ${window.sessionStorage.accessToken}`,
      }
    }).then(response => {
      items = response.data.items;
      this.setState({
        items: items,
      })
    }).catch(error => {
      return error;
    });
  }

  getBucketlist() {
    axios({
      method: 'get',
      url: ROOT_URL + '/api/v1/bucketlists/'+this.props.location.id,
      headers: {
        "Authorization": `JWT ${window.sessionStorage.accessToken}`,
      }
    }).then(response => {
      let bucketlist = response.data;
      console.log(bucketlist);
      this.setState({
        bucketlist: bucketlist,
      })
    }).catch(error => {
      console.log(error)
      return error;
    });
  }

  render() {
    // this.state.bucket_list_id = this.props.location.id;
    let bucketlistId = this.props.match.params.id;

    const items = this.state.items;
    const items_list = items.map((item, index) => (
      <div className="collection center-align" key={item.id}>
        <ItemCard item={item} bucketlistId={bucketlistId} getItems={this.getItems.bind(this)} />
      </div>)
    );
    return (

      <div className="BucketlistsView">
        <InNavAppBar />
        <h3 >{this.props.match.params.id}</h3>
        <AddItemForm bucketlistId={this.props.match.params.id} getItems={this.getItems.bind(this)} />
        <div className="wrapper">
          {items_list}
        </div>
      </div>
    );
  }
}

export default BucketlistView;