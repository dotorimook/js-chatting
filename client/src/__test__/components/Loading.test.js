import React from 'react';
import 'setupTest';
import Loading from 'components/Loading';
import {shallow} from 'enzyme';

describe('Loading Test', () => {
  let uiVisible = null;
  let uiInvisible = null;
  global.Math.random = jest.fn(()=>0);

  beforeAll(()=>{
    uiVisible = shallow(<Loading visible={true}/>);
    uiInvisible = shallow(<Loading visible={false}/>);

  });

  it('properly renders', () => {
    expect(uiVisible.find('.msg-frame.visible').length).toBeGreaterThan(0);
    expect(uiInvisible.find('.msg-frame.visible').length).toBe(0)
  });

  it('matches snapshot', () => {
    expect(uiVisible).toMatchSnapshot();
  });

});