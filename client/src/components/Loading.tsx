import React, { FC } from 'react';
import IComponentProps from 'interfaces/IComponentProps';
import styled, { keyframes } from 'styled-components';
import Frame, { FrameCenter } from './Frame';
import img0 from 'assets/img/loading/0.svg';
import img1 from 'assets/img/loading/1.svg';
import img2 from 'assets/img/loading/2.svg';
import img3 from 'assets/img/loading/3.svg';
import theme from 'style/theme';

interface ILoadingProps extends IComponentProps{
  visible: boolean;
};

const loading = keyframes`
  0% {transform: scale(.95, .95);}
  65% {transform: scale(1.05,1.05);}
  100% {transform: scale(.95, .95);}
`

const Dimmer = styled(Frame)`
  position:fixed;
  top:0;
  left:0;
  background:${theme.dimmer};
`;
const LoadingFrame = styled(FrameCenter)`
  position:fixed;
  background:none;
  transition: visibility opacity .1s ease;
  visibility: hidden;
  opacity: 0;
  z-index:99999;
  &.visible {
    visibility: visible;
    opacity:1;
  }
  .title-img {
    animation: ${loading} 1.5s ease-in-out infinite;
  }
  .msg {
    z-index:99999;
  }
`

const Loading:FC<ILoadingProps> = (props:ILoadingProps) => {
  return (
    <LoadingFrame className={`msg-frame ${props.visible? 'visible': ''}`}>
      <Dimmer/>
      <img className='title-img loading' src={[img0,img1,img2,img3][Math.round(Math.random()*3)]} alt='logo'/>
      <div className='msg'>
        로딩중입니다...
      </div>
    </LoadingFrame>
  )
}
export default Loading;