import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import ChatRoomList from 'components/screens/RoomList/ChatRoomList';
import { Provider } from 'mobx-react';
import store from 'store';

describe('ChatRoomList Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <ChatRoomList/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});