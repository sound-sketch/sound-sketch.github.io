import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const CLIENT_ID = "f5d032c8b8954a9689dbf60afdce056f";
const CLIENT_SECRET = "ccbec7c26bf448ecae57839f642c3148";
var TOKEN = "";

var request = require('request');

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, callback);

function callback(err, res, body) {
  if (!err && res.statusCode === 200) {
    // Store token
    TOKEN = body.access_token;
    // Render react
    ReactDOM.render(
      <React.StrictMode>
        <App 
          token={TOKEN}
        />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
