import ROOT_URL from './constants';
import axios from 'axios';


let helpers = {
    getBucketlists() {
        var bucketlists = {};
        axios({
            method: 'get',
            url: ROOT_URL + '/api/v1/bucketlists',
            headers: {
                "Authorization": `JWT ${window.sessionStorage.accessToken}`,
            }
        }).then(response => {
            bucketlists = response.data.bucketlists;
            this.setState({
                bucketlists: bucketlists,
            })
        }).catch(error => {
            return error;
        });
    },

    requestLogin(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        var payload = { "username": username, "password": password };
        axios({
            method: 'post',
            url: ROOT_URL + '/api/v1/auth/login',
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            window.sessionStorage.accessToken = response.data.access_token;
            this.setState({ authenticated: true });
            this.props.history.push({ pathname: '/bucketlists', state: this.state.authenticated });
        }.bind(this));
    },

    requestRegister(e){
        e.preventDefault();
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword;
        
        var payload = { "username": username, "email": email, "password": password, "confirm_password": confirmPassword };
        axios({
            method: 'post',
            url: ROOT_URL + '/api/v1/auth/register',
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            window.sessionStorage.accessToken = response.data.access_token;
            this.setState({authenticated: true});
            this.props.history.push({pathname:'/login',state:this.state.authenticated});
        }.bind(this));
    },

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
    },

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
}

export default helpers;