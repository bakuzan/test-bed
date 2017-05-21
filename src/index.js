import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './styles/ripple.css'
import './styles/button.css'
import './styles/float-label.css'
import './styles/list.css'
import './styles/form.css'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
