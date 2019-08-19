import React from 'react';
import 'setupTest';
import {mount} from 'enzyme';
import LoginForm from 'components/LoginForm';

describe('LoginForm Test', ()=>{
  let ui = null;
  let onSubmit = jest.fn();

  beforeAll(() => {
    ui = mount(<LoginForm onSubmit={onSubmit}/>);

  })

  it('matches snapshot', () =>{
    expect(ui).toMatchSnapshot();
  });
  
});