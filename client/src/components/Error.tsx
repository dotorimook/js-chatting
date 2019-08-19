import React, { FC } from 'react';
import IComponentProps from 'interfaces/IComponentProps';
import ErrorModel from 'store/models/Error';
import styled from 'styled-components';
import Frame, { FrameCenter } from './Frame';
import img0 from 'assets/img/error/0.svg';
import img1 from 'assets/img/error/1.svg';
import Button from './form/Button';
import theme from 'style/theme';
import { inject, observer } from 'mobx-react';
import { applyFlexbox } from 'style/mixins';

interface IErrorProps extends IComponentProps{
  error?:ErrorModel;
};

const ErrorFrame = styled(FrameCenter)`
  position:fixed;
  background:none;
  transition: visibility opacity .1s ease;
  visibility: hidden;
  ${applyFlexbox('column','center','center')};
  z-index:99999;
  opacity: 0;
  &.visible {
    visibility: visible;
    opacity:1;
  }
  .msg,.title-img {
    z-index: 99999;
  }
  .msg {
    p {
      margin-bottom:2em;
    }
  }
`;
const Dimmer = styled(Frame)`
  position:fixed;
  top:0;
  left:0;
  background:${theme.dimmer};
`;

const ErrorComponent:FC<IErrorProps> = (props:IErrorProps) => {
  const {error} = props;
  if(!error)
    throw new Error('error model not found');
  return (
    <ErrorFrame className={`msg-frame ${error.visible? 'visible': ''}`}>
      <Dimmer/>
      <img className='title-img' src={[img0,img1][Math.round(Math.random()*1)]} alt='logo'/>
      <div className='msg'>
        <p>
          {error.msg}
        </p>
        <Button
          className='btn-close'
          onClick={()=>{error.visible = false;}}
        >
          알겠습니다.
        </Button>
      </div>
    </ErrorFrame>
  )
}

export default inject('error')(observer(ErrorComponent));