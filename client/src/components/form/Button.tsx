import React, { FC } from 'react'
import IComponentProps from 'interfaces/IComponentProps';
import styled from 'styled-components';
import theme from 'style/theme';
import Icon from 'components/Icon';

interface IButtonProps extends IComponentProps{
  icon?:string;
}

const ButtonStyled = styled.button`
  width: 100%;
  font-size:1em;
  border:none;
  padding: 1em 1em;
  background-color:transparent;

  .material-icons {
    vertical-align:bottom;
    &.left {
      margin-right:.2em;
    }
  }
  
  transition: all 0.2s ease;
  &:hover {
    background-color:${theme.color3}
  }
  &:active {
    transform:translateY(2px);
  }
  
  &[type=submit] {
    background-color:${theme.color3};
    &:hover {
      background-color:${theme.color2};
    }
  }
`

const Button:FC<IButtonProps>= (props:IButtonProps) => {
  return (
    <ButtonStyled {...(props as any)}>
      {
        props.icon && <Icon className={`${props.children?'left': ''}`} name={props.icon}/>
      }
      {props.children}
    </ButtonStyled>
  )
}

export default Button;