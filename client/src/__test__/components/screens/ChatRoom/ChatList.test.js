import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import ChatList from 'components/screens/ChatRoom/ChatList';
import { Provider } from 'mobx-react';
import store from 'store';

describe('ChatList Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <ChatList/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});