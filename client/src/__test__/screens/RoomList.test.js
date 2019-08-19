import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import RoomList from 'screens/RoomList';
import { Provider } from 'mobx-react';
import store from 'store';

describe('RoomList Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <RoomList/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});