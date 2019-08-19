import React, {FC, useEffect} from 'react';
import IComponentProps from 'interfaces/IComponentProps';
import IRoomListScreenProps from 'interfaces/screens/IRoomListScreenProps';
import { inject, observer } from 'mobx-react';
import ChatRoomList from 'components/screens/RoomList/ChatRoomList';
import InsertChatRoom from 'components/screens/RoomList/InsertChatRoom';
import { withRouter, RouteComponentProps } from 'react-router';
import Header from 'components/Header';
import Button from 'components/form/Button';
import Dialog from 'components/Dialog';
import LoginInfo from 'store/models/LoginInfo';
import styled from 'styled-components';
import { applyFlexbox } from 'style/mixins';
import { toJS } from 'mobx';

interface IRoomList extends IRoomListScreenProps,RouteComponentProps{
  loginInfo?:LoginInfo;
};

const ContentFrame = styled.div`
  flex:1;
  ${applyFlexbox('column','flex-start','stretch')};
  overflow:auto;
  .chat-room-list-empty {
    flex:1;
    ${applyFlexbox('column', 'center', 'center')}
    .btn-insert-chat-room {
      width:unset;
    }
    p {
      line-height:1.5em;
      margin-bottom:1em;
    }
  }
`


const RoomList:FC<IRoomList> = (props:IRoomList) => {
  const {screenRoomList:screenModel, history, loginInfo} = props;
  useEffect(() => {
    if(!!screenModel){
      screenModel.loadRooms();
      screenModel.insertChatRoomVisible = false;
    }
  }, []);
  if(!screenModel || !loginInfo) {
    throw new Error('no screen model found');
  }

  const InsertChatButton =  () => (<Button
  className='btn-insert-chat-room'
  onClick={()=>{
    screenModel.insertChatRoomVisible = !screenModel.insertChatRoomVisible;
  }}
  icon='chat'
  title='대화추가'
  />);

  return (
    <>
      <Header
        Left={
          (props:IComponentProps)=>{
            return(
              <Button 
              icon='arrow_back'
              onClick={()=>{
                loginInfo.logout();
              }}>로그아웃</Button>
            )
          }
        }
        title='대화방'
        Right={(props:IComponentProps) => (<InsertChatButton/>)}
      />
      <ContentFrame>
        {toJS(screenModel.rooms).length > 0?
          <ChatRoomList/>:
          <div className='chat-room-list-empty'>
            <p>
              현재 대화방이 없습니다.
            </p>
            <p>
              <InsertChatButton/>을 눌러 대화를 시작해보세요.
            </p>
          </div>
        }
      </ContentFrame>
      <Dialog 
        visible={screenModel.insertChatRoomVisible}
        onClose={()=>{screenModel.insertChatRoomVisible = false;}}
      >
        <InsertChatRoom onSubmitComplete={()=>{
          history.push(`/chat/${screenModel.rooms[0].id}`);
        }}/>
      </Dialog>
    </>
  )
};

export default withRouter(inject('screenRoomList', 'loginInfo')(observer(RoomList)));