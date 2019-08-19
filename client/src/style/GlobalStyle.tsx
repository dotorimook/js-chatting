import {createGlobalStyle} from 'styled-components';
import theme from './theme';
import {boxSizing} from './mixins';
import 'index.scss';

const GlobalStyle = createGlobalStyle`

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    font-size:16px;
  }

  h1 {
    ${theme.h1}
  }

  h2 {
    ${theme.h2}
  }

  h3 {
    ${theme.h3}
  }

  * {
    font-family: 'Noto Sans KR', 'Roboto', sans-serif;
    color:${theme.black};
    ${boxSizing('border-box')}
  }

  button, label {
    cursor: pointer;
  }

  input {
   -webkit-appearance: none;
   -webkit-border-radius: 0;
  }
  
  .msg-main {
    text-align: center;
  }

  .msg-caption {
    text-align: center;
  }

  .logo-img {
    display: block;
    margin: 0 auto;
    width: 75%;
  }
  
  ::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }
  ::-webkit-scrollbar-button {
    width: 0.5em;
    height: 0.5em;
  }
  ::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #666;
  }
  ::-webkit-scrollbar-track {
    background: #ccc;
    border: 0px none #ffffff;
    border-radius: 0.5em;
  }
  ::-webkit-scrollbar-track:hover {
    background: #aaa;
  }
  ::-webkit-scrollbar-track:active {
    background: #999;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  .material-icons {
    vertical-align:middle;
  }
  
  html,body,#root {
    width:100%;
    height:100%;
  }
`;

export default GlobalStyle;