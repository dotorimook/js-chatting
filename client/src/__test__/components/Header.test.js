import React from 'react'
import 'setupTest';
import Header from 'components/Header';
import {shallow} from 'enzyme';

describe('Header Test', () => {
  let ui = null;
  const Left = () => (<div className='left'>leftChildren</div>);
  const Right = () => (<div className='right'>rightChildren</div>);
  const title = 'title';

  beforeAll(()=>{
    ui = shallow(<Header Left={Left} Right={Right} title={title}/>);
  });

  it('matches snapshot', () => {
    expect(ui).toMatchSnapshot();
  });

  it('properly renders title', () => {
    expect(ui.find('.title').length).toBeGreaterThan(0);
    expect(ui.find('.title').text().indexOf(title)).toBeGreaterThanOrEqual(0);
  });

  it('has a left and right', () => {
    expect(ui.find(Left)).toHaveLength(1);
    expect(ui.find(Right)).toHaveLength(1);
  });
})