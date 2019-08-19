import React from 'react'
import 'setupTest';
import {shallow} from 'enzyme';
import Register from 'components/Register';
import store from 'store';
import { Provider } from 'mobx-react';

describe('Register Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <Register />
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});