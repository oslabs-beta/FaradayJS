import React from 'react';
import ReactDOM from 'react-dom';
import '../../src/styles.css';
import App from './App';
import TestDisplay from './TestDisplay';
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={App} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </Router>
    </Provider>
 ,
  document.getElementById('root')
);
