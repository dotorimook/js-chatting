import React, { FC, useRef, useEffect } from 'react'
import IChatRoomScreenProps from 'interfaces/screens/IChatRoomScreenProps';
import LoginInfo from 'store/models/LoginInfo';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import IChat from 'interfaces/IChat';
import theme from 'style/theme';
import { applyFlexbox } from 'style/mixins';
import Button from 'components/form/Button';
import config from 'config';

interface IChatListProps extends IChatRoomScreenProps {
  loginInfo?:LoginInfo;
}

const ChatListFrame = styled.ul`
  flex:1;
  overflow-y:auto;
  .list-item-frame {
    margin: 1em;
    .chat-name {
      font-size:0.9em;
      color:${theme.gray6};
      margin-left:1.2em;
      margin-bottom:0.2em;
    }
    .chat-frame {
      position:relative;
      ${applyFlexbox('row','flex-start','flex-end')};
      margin:0 1em;
      .chat-name.self {
        display:none;
      }
      .chat-content {
        background-color:${theme.chatBubble};
        padding:0.8em;
        border-radius:0.8em;
        box-shadow: ${theme.chatBubbleShadow};
        .chat-content-image {
          width:100%;
          cursor:pointer;
        }
      }
      .chat-create-time {
        margin:0 0.6em;
        font-size:0.5em;
        font-color:${theme.gray9};
      }
      &:after {
        content: '';
        position:absolute;
        border-style: solid;
        border-width: 0 0 .6em .6em;
        border-color: transparent transparent ${theme.chatBubble} transparent;
        left:-.6em;
        bottom:0.8em;
        box-shadow: ${theme.chatBubbleShadow};
      }
    }
    &.myself{
      .chat-frame {
        ${applyFlexbox('row-reverse','flex-start','flex-end')};
        .chat-content {
          background-color:${theme.color3};
        }
        &:after {
          content: '';
          position:absolute;
          border-style: solid;
          border-width: .6em 0 0 .6em;
          border-color: transparent transparent transparent ${theme.color3};
          left:unset;
          right:-.6em;
          bottom:0.8em;
        }
      }
      .chat-name {
        display:none;
      }
    }
  }
`;

const ChatList:FC<IChatListProps> = (props:IChatListProps) => {
  const{screenChatRoom:screenmodel, loginInfo}= props;
  const ref = useRef(null);
  if(!screenmodel || !loginInfo)
    throw new Error('no screen model found');
  useEffect(() => {
  if(!!ref.current)
    ref.current.scroll({top:ref.current.scrollHeight, behavior:'smooth'});
  })

  return(
    <ChatListFrame
      ref={ref}
    >
      {
        screenmodel.chats.map((chat:IChat)=>(
          <li
            key={`chat-${chat.id}`}
            className={`list-item-frame ${chat.userId === loginInfo.id && 'myself'}`}
          >
            <div className='chat-name'>
              {chat.name}
            </div>
            <div className='chat-frame '>
              <div className='chat-content'>
                {
                  chat.type === 'image' ?
                  <img
                    alt='image message'
                    className='chat-content-image'
                    src={`${config.hostRes}/uploads/${chat.content}`}
                    title='image'
                    onClick={()=>{
                      window.open(`${config.hostRes}/uploads/${chat.content}`, '_blank');
                    }}
                  />
                  :
                  chat.content
                }
              </div>
              <div className='chat-create-time'>
                {chat.createTime}
              </div>
            </div>
          </li>
        ))
      }
    </ChatListFrame>
  )
}

export default inject('screenChatRoom', 'loginInfo')(observer(ChatList));