import React, { Component } from 'react';
import AddItemForm from '../forms/AddItemForm';
import ItemCard from './ItemCard';
import InNavAppBar from '../navigation/InNavAppBar';
import helpers from '../helpers';

class BucketlistView extends Component {
  constructor() {
    super();
    this.state = {
      bucket_list_id: null,
      items: [],
    }
    this.getItems = helpers.getItems.bind(this);
  }

  componentWillMount() {
    this.getItems(this.props.match.params.id);
  }

  render() {
    let bucketlistId = this.props.match.params.id;

    const items = this.state.items;
    const items_list = items.map((item, index) => (
      <div className="collection center-align" key={item.id}>
        <ItemCard item={item} bucketlistId={bucketlistId} getItems={helpers.getItems.bind(this)} />
      </div>)
    );
    return (

      <div className="BucketlistsView">
        <InNavAppBar />
        <h3 >{this.props.match.params.id}</h3>
        <AddItemForm bucketlistId={this.props.match.params.id} getItems={helpers.getItems.bind(this)} />
        <div className="wrapper">
          {items_list}
        </div>
      </div>
    );
  }
}

export default BucketlistView;