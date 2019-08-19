import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import Login from 'screens/Login';
import { Provider } from 'mobx-react';
import store from 'store';

describe('Login Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <Login/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});