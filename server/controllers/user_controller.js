const User = require('../models/user');
const axios = require('axios');
module.exports = {
  readUserData(req, res) {
    res.status(200).json({user: req.session.user});  
  },
  addToCart(req, res){
  },
  removeFromCart(req, res) {

  },
  
  login(req, res) {
    return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
      code: req.query.code, 
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/callback`
    }).then(accessTokenResponse => {
      const accessToken = accessTokenResponse.data.access_token;
      console.log(accessToken)

      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`).then(userDataResponse => {
        const { name, nickname, email, picture, sub } = userDataResponse.data;
        console.log('user data', userDataResponse.data);
        User.findOne({auth0_id: sub}, (err, user) => {
          if(err) console.log('Login Error', err);
          if(!user) { 
            let newUser = new User({
              name: name,
              email: email,
              username: nickname,
              profile_picture: picture,
              auth0_id: sub
            });
            req.session.user = newUser;
            req.session.save();
            newUser.save();
          } 
          req.session.user = user;
          req.session.save();
          res.redirect('/');
        })
      }).catch(err => console.log('Auth0 get user info Error', err));
    }).catch(err => console.log('Auth0 Axios Post backend Error', err));
  },
  logout(req, res) {
    req.session.destroy();
    res.status(200).json({message: 'Logout Successfully!'});
  }
};