import React, {FC, useEffect} from 'react'
import { FrameCenter as FrameCenterSuper } from 'components/Frame';
import LoginForm from 'components/LoginForm';
import { inject, observer } from 'mobx-react';
import ILoginFormValue from 'interfaces/form/ILoginFormValue';
import LoginInfo from 'store/models/LoginInfo';
import img0 from 'assets/img/logo/0.svg';
import img1 from 'assets/img/logo/1.svg';
import img2 from 'assets/img/logo/2.svg';
import styled, { keyframes } from 'styled-components';
import theme from 'style/theme';
import Button from 'components/form/Button';
import Header from 'components/Header';
import Dialog from 'components/Dialog';
import Register from 'components/Register';
import IRegisterFormValues from 'interfaces/form/IRegisterFormValues';
import ILoginScreenProps from 'interfaces/screens/ILoginScreenProps';
import IComponentProps from 'interfaces/IComponentProps';

interface ILoginProps extends ILoginScreenProps {
  loginInfo?: LoginInfo;
}

const showUp = keyframes`
  0% {opacity: 0}
  100% {opacity: 100}
`

const FrameCenter = styled(FrameCenterSuper)`
  text-align:center;
  .title {
    margin-bottom:1em;
  }
  .title-img {
    position:relative;
    height:25%;
    img {
      width:100%;
    }
  }
  .msg-dialog-frame {
    background:${theme.white};
    margin-left:2em;
    margin-right:2em;
    overflow:hidden;
    opacity: 0;
    animation: ${showUp} 2s forwards;
    .row{
      padding:0;
    }
    .row,.row-submit {
      margin:0;
    }
  }
`;

const Login:FC<ILoginProps> = (props:ILoginProps) => {
  const {loginInfo, screenLogin:screenModel} = props;
  useEffect(() => {
    if(!!screenModel)
      screenModel.registerDialogVisible = false;
  }, [screenModel]);

  if(!loginInfo && !screenModel)
    throw new Error('로그인 모델이 없습니다.');
  return (
    <>
      <Header
        Left={
          (props:IComponentProps)=>{
            return(
              <Button
              onClick={()=>{
                screenModel.registerDialogVisible = !screenModel.registerDialogVisible;
              }}>회원가입</Button>
            )
          }
        }
        title={'chat chat chat'}
      />
      <FrameCenter className='msg-frame'>
        <img className='title-img' src={[img0,img1,img2][Math.round(Math.random()*2)]} alt='logo'/>
        <div className='msg'>
          <h3 className='title'>로그인이 필요한 서비스입니다.</h3>
          <div className='msg-dialog-frame'>
            <LoginForm
              onSubmit={(values:ILoginFormValue)=>{
                loginInfo.login(values.username);
              }}
            />
          </div>
        </div>
      </FrameCenter>
      {
        <Dialog 
          visible = {screenModel.registerDialogVisible}
          onClose={()=>{screenModel.registerDialogVisible = false;}}
        >
          <Register
            onSubmitComplete={(values:IRegisterFormValues)=>{
              loginInfo.login(values.username);
            }}
          />
        </Dialog>
      }
    </>
  );
}
export default inject('screenLogin', 'loginInfo')(observer(Login));