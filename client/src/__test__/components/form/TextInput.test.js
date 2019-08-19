import React from 'react'
import 'setupTest';
import TextInput from 'components/form/TextInput';
import {shallow} from 'enzyme';

describe('TextInput Test', () => {
  let ui = null;
  const onChange = jest.fn();
  beforeAll(()=>{
    ui = shallow(<TextInput onChange={onChange} />);
  });
  
  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  });

  it('onChange called when change', () => {
    ui.simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});