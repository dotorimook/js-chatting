import React from 'react'
import 'setupTest';
import Button from 'components/form/Button';
import {shallow} from 'enzyme';

describe('Button Test', () => {
  let ui = null;
  const buttonText = 'button';

  beforeAll(()=>{
    ui = shallow(<Button onClick={()=>{alert('test');}}>{buttonText}</Button>);
  });

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  });

  it('property render child', () => {
    expect(ui.text()).toEqual(buttonText);
  });

  it('properly onClick called', ()=> {
    window.alert = jest.fn();
    ui.simulate('click');
    expect(window.alert).toHaveBeenCalledWith('test');
  });
});