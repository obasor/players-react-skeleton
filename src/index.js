import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
// Importing the fetch polyfill allows cypress to intercept fetch api requests.
import 'whatwg-fetch';
// Change me if you prefer sass,scss, less. (Note you may need to update the build config)
import './index.css';
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Roster from './components/Roster';
import Newplayer from './components/Newplayer';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/roster" component={Roster} />
      <Route path="/player/new" component={Newplayer} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
