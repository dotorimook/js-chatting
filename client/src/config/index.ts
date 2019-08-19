interface IConfig {
  host: string;
  hostRes: string;
  contextPath: string;
}

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

export default config;