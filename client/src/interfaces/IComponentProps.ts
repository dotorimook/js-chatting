import React from 'react';
export default interface IComponentProps extends React.Props<any> {
  [key: string]: any;
  [key: number]: any;
};