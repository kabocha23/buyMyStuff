import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Navbar.css';


class Navbar extends Component {

  linkFunc(path) {
    this.props.history.push(path);
  }

  logout = () => {
    axios.post('/api/logout', {})
    .then(res => {
    alert(res.data.message);
     this.props.history.go();
    }).catch(err => console.log('Logout Axios Error', err));
   }

  login = () => {
    const redirectURI = encodeURIComponent(`${window.location.origin}/auth/callback`); 
    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/login?client=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectURI}`;
  }

   render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className='nav container'>
        <div className='desktop-nav'>
          <p className="nav-link" onClick={() => this.linkFunc('/')}>Home</p>
          <p className="nav-link" onClick={() => this.linkFunc('/about')}>About</p>
          <p className="nav-link" onClick={() => this.linkFunc('/cart')}>Cart</p>
          <div className="nav-link" onClick={() => user ? this.logout() : this.login()} >
            {user ? 
            <div>
              <p>Logout</p> 
              <img className='user-image' src={ this.props.user.profile_picture } alt={ this.props.user.nickname } />
            </div>
            : <p>Login</p>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
   user: state.user
  }
}

export default withRouter(connect(mapStateToProps) (Navbar));