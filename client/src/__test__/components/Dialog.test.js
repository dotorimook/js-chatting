import React from 'react';
import 'setupTest';
import Dialog from 'components/Dialog';
import {shallow} from 'enzyme';

describe('Dialog Test', () => {
  let ui = null;
  const children = <div className='test'></div>;
  const onClose = jest.fn();

  beforeAll(()=>{
    ui = shallow(<Dialog onClose={onClose}>{children}</Dialog>);
  });

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  });

  it('properly renders chidlren', () => {
    expect(ui.find('div.test')).toHaveLength(1);
  });

  it('has a close button', () => {
    expect(ui.find('.btn-close')).toHaveLength(1);
  });

  it('onClose called when a close button clicked', () => {
    const closeButton = ui.find('.btn-close');
    closeButton.simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});