import React, { FC } from 'react'
import IComponentProps from 'interfaces/IComponentProps';
import styled from 'styled-components';
import { applyFlexbox } from 'style/mixins';
import theme from 'style/theme';

interface IHeaderProps extends IComponentProps {
  Left?: FC<IComponentProps>;
  title?: string|FC<IComponentProps>;
  Right?: FC<IComponentProps>;
}

const HeaderFrame = styled.div`
  width:100%;
  height:4em;
  border-bottom: 1px solid ${theme.headerBorder};
  position:relative;
  background-color:${theme.header};
  .title-frame,.btn-frame {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
  }
  .title-frame {
    ${applyFlexbox('row','center','center')};
    .title {
      text-align:center;
    }
  }
  .btn-frame {
    ${applyFlexbox('row','space-between','stretch')};
    button {
      width: auto;
      min-width:4em;
    }
  }
`;

const Header:FC<IHeaderProps> = (props:IHeaderProps) => {
  const {Left, Right, title} = props;
  return (
    <HeaderFrame>
      <div className='title-frame'>
        {!!title  &&  <h1 className='title'>{title}</h1>}
      </div>
      <div className='btn-frame'>
        {!! Left   &&  <Left {...props} />}
        <div style={{flex:1}}></div>
        {!! Right &&  <Right {...props} />}
      </div>
    </HeaderFrame>
  )
}

export default Header;