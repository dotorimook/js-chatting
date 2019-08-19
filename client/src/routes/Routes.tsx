import React, { FC } from 'react';
import IComponentProps from 'interfaces/IComponentProps';
import {Route as RouteSuper} from 'react-router-dom';
import config from 'config';

interface IRouteProps extends IComponentProps{
  exact?: boolean;
  path?: string;
  render?: (props?:any) => JSX.Element;
}

const Routes:FC<IRouteProps> = (props:IRouteProps) => {
  const {exact, path, render} = props;
  return (
    <RouteSuper
      {...props}
      exact={exact}
      path={config.contextPath+path}
      render = {render}
    />
  )
}

Routes.defaultProps = {
  exact:false,
  path:'',
  render: (props?:any):JSX.Element => <></>
}

export default Routes;