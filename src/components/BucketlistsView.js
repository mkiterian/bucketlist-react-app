import React, { Component } from 'react';
import CreateBucketlistForm from '../forms/CreateBucketlistForm';
import ROOT_URL from '../constants';
import axios from 'axios';
import BucketlistCard from './BucketlistCard';
import InNavAppBar from '../navigation/InNavAppBar';


class BucketlistsView extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      bucketlists: []
    };
  }

  componentWillMount() {
    this.props.getBucketlists();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bucketlists: nextProps.bucketlists });
  }

  createBucketlist = (e, createForm) => {
    e.preventDefault();
    let name = createForm.state.name
    let description = createForm.state.description;
    let payload = { "name": name, "description": description };

    axios({
      method: 'post',
      url: ROOT_URL + '/api/v1/bucketlists',
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${window.sessionStorage.accessToken}`
      }
    }).then(function (response) {
      this.setState({ name: payload.name, description: payload.description });
      this.props.addBucketlist(payload);
      this.props.getBucketlists();

    }.bind(this));
  }

  handleFocus(e) {
    this.refs.search.value = "";
  }

  handleChange(e) {
    axios({
      method: 'get',
      url: ROOT_URL + '/api/v1/bucketlists?q=' + e.target.value,
      headers: {
        "Authorization": `JWT ${window.sessionStorage.accessToken}`,
      }
    }).then(response => {
      let bucketlists = response.data.bucketlists;
      this.setState({
        bucketlists: bucketlists,
      });
    }).catch(error => {
      return error;
    });
  }

  render() {
    const bucketlists = this.state.bucketlists;
    let bucketlists_list = null;

    if (!bucketlists) {
      bucketlists_list = "Loading..."
    } else {
      bucketlists_list = bucketlists.map((bucketlist, index) => (
        <div className="box" key={bucketlist.id}>
          <BucketlistCard bucketlist={bucketlist} getBucketlists={this.props.getBucketlists}/>
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
          onChange={this.handleChange.bind(this)} />
          </div>
        <div className="wrapper">
          {bucketlists_list}
        </div>
        <CreateBucketlistForm bucketlists={this.props.bucketlists}
          addBucketlist={this.props.addBucketlist.bind(this)}
          createBucketlist={this.createBucketlist.bind(this)} />
      </div>
    );
  }
}

export default BucketlistsView;