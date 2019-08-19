import React, {FC, useEffect} from 'react'
import IChatRoomScreenProps from 'interfaces/screens/IChatRoomScreenProps';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import SendChat from 'components/screens/ChatRoom/SendChat';
import ChatList from 'components/screens/ChatRoom/ChatList';
import Header from 'components/Header';
import IComponentProps from 'interfaces/IComponentProps';
import Button from 'components/form/Button';
import styled from 'styled-components';
import { applyFlexbox } from 'style/mixins';
import InviteUser from 'components/screens/ChatRoom/InviteUser';
import Dialog from 'components/Dialog';

interface IChatRoomPathVariables {
  id?:string;
}

const ContentFrame = styled.div`
  flex:1;
  ${applyFlexbox('column','flex-start','stretch')};
  overflow:hidden;
`

interface IChatRoomProps extends IChatRoomScreenProps, RouteComponentProps<IChatRoomPathVariables> {}

const ChatRoom:FC<IChatRoomProps> = (props:IChatRoomProps) => {
  const {screenChatRoom:screenModel, match, history} = props;
  useEffect(() => {
    if(!screenModel)
      return;
    screenModel.roomId = Number(match.params.id);
    screenModel.load();
    screenModel.loadInvitableUser();
    screenModel.inviteDialogVisible = false;
  }, []);

  // let {inviteDialogVisible} = screenModel;

  if(!screenModel)
    throw new Error('no screen model found');
  
  return (
    <>
      <Header
        Left={
          (props:IComponentProps)=>{
            return(
              <Button 
              icon='arrow_back'
              onClick={()=>{
                history.goBack();
              }}>뒤로</Button>
            )
          }
        }
        Right= {
          (props:IComponentProps) => {
            return (
              <Button
                icon='person_add'
                onClick={()=>{
                  screenModel.inviteDialogVisible = !screenModel.inviteDialogVisible;
                }}
              />
            )
          }
        }
        title={screenModel.info? screenModel.info.title : ''}
      />
      <ContentFrame>
        <ChatList/>
        <SendChat/>
        <Dialog visible={screenModel.inviteDialogVisible} onClose={()=>{screenModel.inviteDialogVisible = false}}>
          <InviteUser/>
        </Dialog>
      </ContentFrame>
    </>
  );
}

export default withRouter(inject('screenChatRoom')(observer(ChatRoom)));