import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import Raven from 'raven-js';

import store from './store.js';
import {} from './selectors/index.js';
import App from './components/App.jsx';

const appContainer = document.getElementById('app');
const isProduction = appContainer.dataset.environment === 'production';

if (isProduction) {
  Raven.config('https://b51f3aefd11d4871bac2f0e212a839f8@sentry.io/160529').install();
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {React.createElement(Provider, {store}, React.createElement(Component))}
    </AppContainer>,
    appContainer
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App.jsx', () => { render(App); });
}