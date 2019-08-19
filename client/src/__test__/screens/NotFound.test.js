import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import NotFound from 'screens/NotFound';
import { Provider } from 'mobx-react';
import store from 'store';

describe('NotFound Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <NotFound/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});