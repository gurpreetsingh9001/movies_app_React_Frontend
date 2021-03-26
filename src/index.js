import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


///
/// at end of app make a component chart of what props and events are flowing from one component to other
/// we always use same level of abstraction such as in movieTables we have header and body both used as calling components and the definition is in another component files
/// there are also components in table which is like component in component but still is complex than general

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

