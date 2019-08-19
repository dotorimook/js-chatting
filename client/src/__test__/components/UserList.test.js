import React from 'react';
import 'setupTest';
import {mount} from 'enzyme';
import UserList from 'components/UserList';

describe('UserList Test', ()=>{
  const users = [{
    id: 0,
    username:'test',
    name:'test',
  }];
  const selectable = true;
  const onSelect = jest.fn();
  let ui = mount(<UserList users={users} selectable={selectable} onSelect={onSelect}/>);

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  });
  
  it('list item number same as user length', () => {
    expect(ui.find('li').length).toBe(users.length);
  });
});