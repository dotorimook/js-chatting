import styled, { keyframes } from 'styled-components';
import { applyFlexbox } from 'style/mixins';
import theme from 'style/theme';

const Frame = styled.div`
  width:100%;
  height:100%;
  ${applyFlexbox('column','flex-start','stretch')};
  
  &.msg-frame {
    .title-img {
      width: 50%;
      display:block;
      margin: 0 auto;
    }
    .msg {
      margin-top:2em;
      text-align:center;
    }
  }
`;

const FrameCenter = styled(Frame)`
  ${applyFlexbox('column', 'center', 'stretch')};
`

const FormFrame = styled.div`
  ${applyFlexbox('column', 'flex-start', 'stretch')};
  width:100%;
  .row {
    padding-left:1em;
    padding-right:1em;
    margin-top:0.5em;
    margin-bottom:0.5em;
  }
  .row > * {
    width: 100%;
  }
  .error {
    color: #f00;
    margin-top:.5em;
    margin-bottom:.5em;
  }
`

const dialogOpen = keyframes`
  0% {
    opacity:0;
    transform: scale(0.95,0.95) translateY(-12px);
  }
  85% {
    transform: scale(1.05,1.05) translateY(5px);
  }
  100% {
    opacity:1;
    transform: scale(1,1) translateY(0px);
  }
`;

const dialogClose = keyframes`
  0% {opacity:1}
  100% {opacity:0}
`;

const DialogFrame = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  ${applyFlexbox('column','center','center')}
  .dimmer {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:${theme.dimmer};
  }
  .dialog-frame {
    width:80%;
    z-index:999;
    padding:1.2em;
    margin:1em;
    background:${theme.white};
    position:relative;
    box-shadow:${theme.dialogShadow};
    .title {
      margin-top:0.5em;
      margin-bottom:0.5em;
    }
    .btn-close {
      position:absolute;
      display:block;
      cursor:pointer;
      top:0.6em;
      right:0.6em;
      width:auto;
      font-size:0.6em;
    }
  }
  &.visible {
    visibility:visible;
    .dialog-frame {
      animation: ${dialogOpen} 0.5s ease-in-out;
    }
  }
  &.hidden {
    visibility:hidden;
    .dialog-frame {
      animation: ${dialogClose} 0.5s ease-in-out;
    }
  }
`

export {Frame, FrameCenter, FormFrame, DialogFrame};

export default Frame;