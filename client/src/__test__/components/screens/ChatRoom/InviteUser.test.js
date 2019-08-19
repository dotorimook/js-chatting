import React from 'react';
import 'setupTest';
import {shallow} from 'enzyme';
import InviteUser from 'components/screens/ChatRoom/InviteUser';
import { Provider } from 'mobx-react';
import store from 'store';

describe('InviteUser Test', ()=>{
  let ui = shallow(
    <Provider {...store}>
      <InviteUser/>
    </Provider>
  );

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  })
});