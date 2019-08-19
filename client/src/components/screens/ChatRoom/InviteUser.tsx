import React, { FC, useEffect } from 'react'
import IChatRoomScreenProps from 'interfaces/screens/IChatRoomScreenProps';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import UserList from 'components/UserList';
import { toJS } from 'mobx';

interface IInviteUserProps extends IChatRoomScreenProps {};

const InviteUserFrame = styled.div`
  .infomation {
    margin-bottom: 1em;
  }
`;

const InviteUser:FC<IInviteUserProps> = (props:IInviteUserProps) => {
  const {screenChatRoom:screenModel} = props;
  if(!screenModel)
    throw new Error('screen model not found');
  const invitableUsers = toJS(screenModel.invitableUsers);
  return(
    <InviteUserFrame>
      <h3 className='title'>사용자 초대</h3>
      <div className='infomation'>
        초대할 사용자를 선택하세요.
      </div>
      {
        invitableUsers.length === 0 ?
        '초대할 사용자가 없습니다.'
        : <UserList 
          users={invitableUsers}
          selectable={true}
          onSelect={async (userId:number) => {
            await screenModel.inviteUser(userId);
            screenModel.inviteDialogVisible = false;
          }}
        />
      }
    </InviteUserFrame>
  );
}

export default inject('screenChatRoom')(observer(InviteUser));