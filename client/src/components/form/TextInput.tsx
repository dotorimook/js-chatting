import React, { FC } from 'react';
import IComponentProps from 'interfaces/IComponentProps';
import styled from 'styled-components';
import theme from 'style/theme';

interface ITextInput extends IComponentProps {
  type: string;
  value: string;
  name: string;
  placehoder?: string;
}

const Input = styled.input`
  font-size:1em;
  border:none;
  border-bottom:1px solid #666;
  padding:1em 1em;
  background-color:transparent;
  &::placeholder {
    color:${theme.gray9};
  }
`

const TextInput:FC<ITextInput> = (props:ITextInput) => <Input {...(props as any)} autoComplete='off'/>;

export default TextInput;