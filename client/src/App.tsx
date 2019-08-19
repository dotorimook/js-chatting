import React, { FC, useEffect, Component } from 'react';
import { inject, observer } from 'mobx-react';
import Frame from 'components/Frame';
import GlobalStyle from 'style/GlobalStyle';
import { BrowserRouter, Switch } from 'react-router-dom';
import Routes from 'routes/Routes';
import IComponentProps from 'interfaces/IComponentProps';
import LoginInfo from 'store/models/LoginInfo';
import Loading from 'components/Loading';

import Screens from 'screens';
import LoadingModel from 'store/models/Loading';
import Error from 'store/models/Error';
import ErrorComponent from 'components/Error';
import ErrorBoundary from 'react-error-boundary';

interface IAppProps extends IComponentProps {
  loginInfo?: LoginInfo;
  loading?: LoadingModel;
  error?: Error;
}

const App:FC<IAppProps> = (props:IAppProps) => {
  const {loginInfo, loading, error} = props;
  useEffect(() => {
    if(!!loginInfo && loginInfo.isFirstTry) {
      loginInfo.autoLogin();
    }
  }, [loginInfo]);
    return (
      <>
        <ErrorBoundary onError={(err, stack) => {
          error.msg = err.message;
          error.visible = true;
        }} FallbackComponent={ ({ componentStack, error }) =><ErrorComponent/>}>
          <Frame>
            <GlobalStyle/>
            <Loading visible={!loginInfo || !loading || !error || loading.isLoading} />
            <ErrorComponent />
            {
              !!loginInfo && !loginInfo.isLogin?
                <Screens.Login />
              :
                <BrowserRouter>
                  <Switch>
                  <Routes exact path='/' render = {(props)=><Screens.RoomList {...props}/>}/>
                  <Routes exact path='/chat/:id' render = {(props)=><Screens.ChatRoom {...props}/>}/>
                  <Routes render={(props)=><Screens.NotFound {...props}/>}/>
                  </Switch>
                </BrowserRouter>
            }
          </Frame>
        </ErrorBoundary>
      </>
    );
}

export default inject('loginInfo', 'loading', 'error')(observer(App));
