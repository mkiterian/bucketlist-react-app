import React, { Component } from 'react';
import CreateBucketlistForm from '../forms/CreateBucketlistForm';
import BucketlistCard from './BucketlistCard';
import InNavAppBar from '../navigation/InNavAppBar';
import helpers from '../helpers';


class BucketlistsView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      bucketlists: []
    };
    this.searchBucketlists = helpers.searchBucketlists.bind(this);
    this.createBucketlist = helpers.createBucketlist.bind(this);
  }

  componentWillMount() {
    this.props.getBucketlists();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bucketlists: nextProps.bucketlists });
  }

  handleFocus(e) {
    this.refs.search.value = "";
  }

  render() {
    const bucketlists = this.state.bucketlists;
    let bucketlists_list = null;

    if (!bucketlists) {
      bucketlists_list = "Loading..."
    } else {
      bucketlists_list = bucketlists.map((bucketlist, index) => (
        <div className="box" key={bucketlist.id}>
          <BucketlistCard bucketlist={bucketlist} getBucketlists={this.props.getBucketlists} />
        </div>)

      );
    }

    return (
      <div className="BucketlistsView">
        <InNavAppBar />
        <h3 >My Bucketlists</h3>
        <div>
          <input id="search" type="search"
            className="search-field"
            ref="search"
            defaultValue="Search" required
            onFocus={this.handleFocus.bind(this)}
            onChange={this.searchBucketlists} />
        </div>
        <div className="wrapper">
          {bucketlists_list}
        </div>
        <CreateBucketlistForm bucketlists={this.props.bucketlists}
          addBucketlist={this.props.addBucketlist.bind(this)}
          createBucketlist={this.createBucketlist} />
      </div>
    );
  }
}

export default BucketlistsView;