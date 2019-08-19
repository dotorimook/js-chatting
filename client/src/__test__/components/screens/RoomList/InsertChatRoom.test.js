import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import InsertChatRoom from 'components/screens/RoomList/InsertChatRoom';
import { Provider } from 'mobx-react';
import store from 'store';

describe('InsertChatRoom Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <InsertChatRoom/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});