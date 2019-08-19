import React from 'react'
import IComponentProps from 'interfaces/IComponentProps';

interface IIconProps extends IComponentProps {
  name:string;
};

const Icon = (props:IIconProps) => (
  <span className={`material-icons ${props.className? props.className: ''}`}>{props.name}</span>
);
export default Icon;