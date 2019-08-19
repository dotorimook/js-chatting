const theme: {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  white: string;
  black: string;
  gray6: string;
  gray9: string;
  dimmer: string;
  header: string;
  chatBubble:string;
  sendChat:string;
  h1:string;
  h2:string;
  h3:string;
  headerBorder: string;
  dialogShadow: string;
  [key:string]: string
} = {
  color1: 'rgba(255, 166, 158, 1)',
  color2: 'rgba(250, 243, 221, 1)',
  color3: 'rgba(184, 242, 230, 1)',
  color4: 'rgba(174, 217, 224, 1)',
  color5: 'rgba(94, 100, 114, 1)',
  white: '#fff',
  black: '#333',
  gray6: '#666',
  gray9: '#999',
  header: 'rgb(245,247,251)',
  dimmer: 'rgba(255,255,255,0.95)',
  chatBubble: '#eceff1',
  sendChat:'#f6fafd',
  h1: `
    font-size:1.2em;
    font-weight:600;
  `,
  h2: `
    font-size:1.15em;
    font-weight:600;
  `,
  h3: `
    font-size:1.15em;
    font-weight:400;
  `,
  headerBorder: 'rgba(67,67,67,0.5)',
  dialogShadow: '0px 4px 28px rgba(67, 67, 67, 0.25)',
  chatBubbleShadow: '0px 6px 14px rgba(212, 219, 222, 0.72)',
};

export default theme;