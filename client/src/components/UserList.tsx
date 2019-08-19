import React, { FC } from 'react';
import IUser from 'interfaces/IUser';
import IComponentProps from 'interfaces/IComponentProps';
import styled from 'styled-components';
import Button from './form/Button';
import theme from 'style/theme';
import { applyFlexbox } from 'style/mixins';

interface IUserListProps extends IComponentProps {
  users: IUser[];
  selectable: boolean;
  onSelect:(userId:number) => void;
}

const UserListFrame = styled.ul`
`;

const UserListItem = styled.li`
  height:2em;
  width:100%;

  .list-item-user {
    width:100%;
    height:100%;
    display:block;
    padding:0 1em;
    ${applyFlexbox('row', 'flex-start', 'center')};
    button {
      display:none;
    }
  }
  .list-item-user:hover {
    background-color:${theme.color2};
  }
`;

const UserList:FC<IUserListProps> = (props:IUserListProps) => {
  const {users, selectable, onSelect} = props;
  return (
    <UserListFrame>
      {
        users.map((user:IUser) => (
          <UserListItem key={`user-${user.id}`}>
            <label className='list-item-user'>
              <span className='name'>{user.name}</span>
              {
                selectable &&
                <Button
                  onClick={()=>{onSelect(user.id);}}
                >
                </Button>
              }
            </label>
          </UserListItem>
        ))
      }
    </UserListFrame>
  )
}

export default UserList;