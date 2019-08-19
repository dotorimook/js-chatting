import React, { FC } from 'react'
import IRoomListScreenProps from 'interfaces/screens/IRoomListScreenProps';
import { inject, observer } from 'mobx-react';
import IRoom from 'interfaces/IRoom';
import IComponentProps from 'interfaces/IComponentProps';
import URIs from 'const/URIs';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import theme from 'style/theme';
import Icon from 'components/Icon';
import { toJS } from 'mobx';

interface IChatRoomListProps extends IRoomListScreenProps,RouteComponentProps{};
interface IChatRoomItemProps extends IComponentProps {
  room:IRoom;
  onClick:(id:number)=>void;
}

const ChatRoomItemStyled = styled.li`
  cursor:pointer;
  padding:2em;
  &:hover {
    background-color:rgba(153,153,153,0.25);
  }
  .title-frame {
    font-size:1.13em;
    .title {
      font-weight:450;
      margin-right:0.5em;
    }
    .user-num {
      color: ${theme.gray6};
    }
  }
  .create-time {
    color: ${theme.gray9};
    font-size: 0.8em;
    text-align:right;
    margin-top:0.5em;
  }
`;

const ChatRoomItem:FC<IChatRoomItemProps> = (props: IChatRoomItemProps) => {
  const {room, onClick} = props;
  return (
    <ChatRoomItemStyled onClick={()=>{onClick(room.id)}}>
      <div className='title-frame'>
        <span className='title'>{room.title}</span>
        <Icon className='user-num' name='group'/> <span className='user-num'>{room.userNum}</span>
      </div>
      <div className='create-time'>
        {room.createTime}
      </div>
    </ChatRoomItemStyled>
  )
}

const ChatRoomList:FC<IChatRoomListProps> = (props:IChatRoomListProps) => {
  const {screenRoomList:screenModel, history} = props;
  if(!screenModel) {
    throw new Error('no screen model found');
  }
  return (
    <ul>
      {
        toJS(screenModel.rooms).map((room:IRoom)=>{
          return (
            <ChatRoomItem key={`room-${room.id}`} 
              room={room}
              onClick={(id:number)=>{
                history.push(URIs.screen_chatRoom(id));
              }}
            />
          )
        })
      }
    </ul>
  );
}

export default withRouter(inject('screenRoomList')(observer(ChatRoomList)));