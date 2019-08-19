import React from 'react';
import 'setupTest';
import Error from 'components/Error';
import ErrorModel from 'store/models/Error';
import {mount} from 'enzyme';
import { Provider } from 'mobx-react';

describe('Error Test', () => {
  let ui = null;
  const error = new ErrorModel({});
  global.Math.random = jest.fn(()=>0);

  beforeAll(()=>{
    error.msg = 'error message';
    error.visible = true;
    ui = mount(
      <Provider error={error}>
        <Error/>
      </Provider>
    );
  });

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  });

  it('properly renders error message', () => {
    expect(ui.find('.msg').text().indexOf(error.msg)).toBeGreaterThanOrEqual(0);
  });

  it('has a close button', () => {
    expect(ui.find('button.btn-close')).toHaveLength(1);
  });

  it('frame has visible className when error.visible true', () => {
    error.visible = true;
    ui.update();
    expect(ui.find('.msg-frame.visible').length).toBeGreaterThan(0);
  });

  it('error.visible becomes false called when a close button clicked', () => {
    const closeButton = ui.find('button.btn-close');
    closeButton.simulate('click');
    expect(error.visible).toBe(false);
  });
});