import React from 'react';
import ReactDOM from 'react-dom';
import '../../src/styles.css';
import App from './App';
import TestDisplay from './TestDisplay';
import { HashRouter as Router, Route, Switch , Link, Redirect } from 'react-router-dom';
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider>
  <Router>
    <div>
      {/* <div>
        <Link to="/" className="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Home</Link>
        <Link to="/testing" className="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Test Viewer</Link>
      </div> */}
      <main>
        <Switch>
          <Route path="/testing" component={TestDisplay} />
          <Route exact path="/" component={App} />
          <Redirect to="/"/>
        </Switch>
      </main>
    </div>
  </Router>
  </Provider>,
  document.getElementById('root')
);
