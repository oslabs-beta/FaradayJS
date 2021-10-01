import React from 'react';
import ReactDOM from 'react-dom';
import '../../src/styles.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
      <div>
        <main>
          <App></App>
        </main>
      </div>
    </Provider>
 ,
  document.getElementById('root')
);