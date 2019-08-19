import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import SendChat from 'components/screens/ChatRoom/SendChat';
import { Provider } from 'mobx-react';
import store from 'store';

describe('SendChat Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <SendChat/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});