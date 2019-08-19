
# JS-chatting
<p float="left">
    <img src="https://github.com/dotorimook/js-chatting/raw/github_master/screenshots/screenshot0.png" width="200"/>
    <img src="https://github.com/dotorimook/js-chatting/raw/github_master/screenshots/screenshot1.png" width="200"/>
    <img src="https://github.com/dotorimook/js-chatting/raw/github_master/screenshots/screenshot2.png" width="200"/>
    <img src="https://github.com/dotorimook/js-chatting/raw/github_master/screenshots/screenshot3.png" width="200"/>
</p>
자바스크립트를 이용한 채팅 애플리케이션입니다.

서버와 클라이언트 프로젝트가 폴더로 분리되어있습니다.

- 서버 경로: /server
- 클라이언트 경로: /client

## Features

- 사용자는 첫 진입 시, ID를 입력하여 접속할 수 있다.
- 채팅방 리스트에서 채팅방을 선택하여 들어갈 수 있다.
- 채팅방에 다른 사용자를 초대할 수 있다.
- 사용자는 채팅방에서 텍스트를 입력할 수 있다.
- 사용자는 채팅방에서 이미지를 입력할 수 있다.
- 아이디와 사용자 이름을 입력하여 계정을 생성할 수 있다.
- 자신이 초대되거나 개설한 채팅방을 볼 수 있고, 채팅방의 사용자 수를 확인할 수 있다.
- REST API와 WebSocket을 이용하여 대화 내용을 받아옵니다.
- SPA, CSR로 구현되어있습니다.

## Strategy

### 백엔드 주요 스펙

- Express: 서버 프레임워크
    - express-session: 세션 관리
    - multer: 이미지 업로드 처리
    - cors: 개발시 CORS 관련
- socket.io: WebSocket을 이용한 메시지 송수신
- luxon: Date 포맷 관련
- sqlite: 채팅 DB 관리

### 프론트엔드 주요 스펙

- React, create-react-app: 프론트 프로젝트 구성
- typescript
- mobx, mobx-react: react component state 관리
- axios: http 리퀘스트 래핑
- styled-component: 컴포넌트 스타일링
- react-router-dom: 라우팅
- socket.io: WebSocket을 이용한 메시지 송수신
- luxon: Date 포맷 관리
- formik: 폼 생성
- yup: 폼 validation
- material-icons: 아이콘

### Features

- 별도의 DB 환경 세팅이 없도록 SQLite로 DB를 관리합니다.
- REST API와 socket.io를 활용하였고, room 개념을 이용해서 특정 채팅방의 메시지만을 송수신하도록 구현하였습니다.

- 재사용 가능성이 있는 컴포넌트 (`Frame`, `Button`, `TextInput`, `Dialog` 등)을 컴포넌트화 하여 사용하였습니다.
- styled-component를 활용하여 컴포넌트별로 스타일을 분리하였습니다.
- `GlobalStyle`, `theme`, `URIs`등 프로젝트 전반에서 사용되는 값들을 별도로 분리해두었습니다.
- 화면별로 store를 분리하여 관리합니다.
- axios instance로 http request 시 loading, error 처리를 하였습니다.

## 실행 방법

### 0. 환경설정

node 최신 버전과 yarn을 설치해주세요. (npm도 가능하지만 아래는 yarn을 기준으로 설명합니다.)

- node: [https://nodejs.org/ko/](https://nodejs.org/ko/)
- yarn: [https://yarnpkg.com/lang/en/](https://yarnpkg.com/lang/en/)

### 1. 빌드 없이 서버, 클라이언트를 각각 실행할 때,

1. 서버 실행
서버 프로젝트 폴더로 이동하여 다음과 같이 실행합니다.
    1. 의존성 설치

        `yarn`으로 의존성을 설치합니다.

            $ yarn

    2. 실행

        프로젝트 루트 폴더에 `.env`파일의 `NODE_PORT`값을 확인해주세요. 해당 포트로 서버에 접속할 수 있습니다. (기본 `8080`)

            NODE_PORT=8080

        `yarn start`로 서버를 실행합니다.

            $ yarn start

2. 클라이언트 실행

    클라이언트 프로젝트 폴더로 이동하여 다음과 같이 실행합니다.

    1. 의존성 설치

        의존성 설치는  `yarn`을 통해 합니다.

            $ yarn

    2. 클라이언트 실행

        프로젝트 루트 폴더의  `.env` 파일의 `REACT_APP_ENV`값을 확인합니다.

            REACT_APP_ENV='production'

        `REACT_APP_ENV=production` 또는 `REACT_APP_ENV=development`에 따라 호스트 주소 설정이 달라집니다. 그 내용은 `src/config/index.ts`에 포함되어있습니다.

            ...
            const config: IConfig = (():IConfig => {
              switch (process.env.REACT_APP_ENV) {
                case 'development':
                  return {
                    host: 'http://localhost:8080',
                    hostRes: 'http://localhost:8080/resources',
                    contextPath: ''
                  };
                default:
                  return {
                    host: '/',
                    hostRes: '/resources',
                    contextPath: ''
                  };
              }
            })();
            ...

        실행은 `yarn start` 로 실행합니다.

            $ yarn start

        클라이언트는 접속은 `localhost:3000`으로 가능합니다.

### 2. 클라이언트를 빌드하고 서버에서 실행할 때

1. 클라이언트 빌드

    클라이언트 빌드는 클라이언트 프로젝트 폴더에서 `yarn build`명령어로 가능합니다. 빌드시 post build 스크립트가 실행되어 자동으로 빌드 결과물이 sever에 해당 폴더로 이동됩니다.

        $ yarn build

2. 서버 실행

    서버 프로젝트 폴더에서 `yarn start` 로 서버를 실행합니다.

        $ yarn start

    서버 실행이후 `localhost:8080`으로 접속하면 서버 내에서 클라이언트가 작동하는 것을 확인할 수 있습니다.

## Future Work

프로젝트를 구현 하면서 시간이 더 있었다면 해보고 싶은 것들을 정리해보았습니다.

1. 구체적인 테스트코드

    좀더 구체적으로 테스트 코드를 작성해보기

2. 비밀번호 및 회원정보 고도화

    비밀번호 및 암호화를 적용한 회원 가입/인증, 회원정보 사진, 메모 등 부가 정보를 추가하고 회원의 상세정보 확인, 관리할 수 있는 기능 구현

3. 채팅방 정보, 방 리스트 고도화

    채팅방 생성 시간 외에 최근 대화 시각, 읽지않은 메시지 수. 대화방 참가 정보 추가 및 리스트 정렬방식 선택 (최신 대화 순, 최근 생성일 순 등), 대화방 나가기 기능 구현

4. 채팅 기능 고도화

    대화방 상세 정보를 볼 수 있는 기능, 대화방 로그 (초대, 나가기 등 로그) 나타내기, 대화 초대 상대 검색기능 구현

5. 마이크로 인터랙션
디테일한 애니메이션을 활용한 마이크로 인터랙션을 추가하여 재미요소와 UX 향상
