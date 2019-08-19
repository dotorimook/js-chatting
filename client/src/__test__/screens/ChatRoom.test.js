import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import ChatRoom from 'screens/ChatRoom';
import { Provider } from 'mobx-react';
import store from 'store';

describe('ChatRoom Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <ChatRoom/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});