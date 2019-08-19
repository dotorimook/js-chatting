import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from 'store';
import { Provider } from 'mobx-react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  store.loginInfo.autoLogin = jest.fn();
  ReactDOM.render(
    <Provider {...store}>
      <App />
    </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
