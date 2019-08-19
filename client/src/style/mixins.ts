
// Flexbox display
const flexbox = ():string => `
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
`;

// The 'flex' shorthand
// - applies to: flex items
// <positive-number>, initial, auto, or none
const flex = (values:string | number):string => `
  -webkit-box-flex: ${values};
    -moz-box-flex: ${values};
      -webkit-flex: ${values};
        -ms-flex: ${values};
            flex: ${values};
`;

// Flex Flow Direction
// - applies to: flex containers
// row | row-reverse | column | column-reverse
const flexDirection = (direction:string):string => `
  -webkit-flex-direction: ${direction};
      -moz-flex-direction: ${direction};
      -ms-flex-direction: ${direction};
          flex-direction: ${direction};
`;

// Flex Line Wrapping
// - applies to: flex containers
// nowrap | wrap | wrap-reverse
const flexWrap = (wrap:string):string => `
  -webkit-flex-wrap: ${wrap};
      -moz-flex-wrap: ${wrap};
      -ms-flex-wrap: ${wrap};
          flex-wrap: ${wrap};
`;

// Flex Direction and Wrap
// - applies to: flex containers
// <flex-direction> || <flex-wrap>
const flexFlow = (flow:string):string => `
  -webkit-flex-flow: ${flow};
      -moz-flex-flow: ${flow};
      -ms-flex-flow: ${flow};
          flex-flow: ${flow};
`;

// Display Order
// - applies to: flex items
// <integer>
const order = (val:string):string => `
  -webkit-box-ordinal-group: ${val};
      -moz-box-ordinal-group: ${val};
            -ms-flex-order: ${val};
            -webkit-order: ${val};
                order: ${val};
`;

// Flex grow factor
// - applies to: flex items
// <number>
const flexGrow = (grow:string):string => `
  -webkit-flex-grow: ${grow};
      -moz-flex-grow: ${grow};
      -ms-flex-grow: ${grow};
          flex-grow: ${grow};
`;

// Flex shrink
// - applies to: flex item shrink factor
// <number> 
const flexShrink = (shrink:string):string => `
  -webkit-flex-shrink: ${shrink};
      -moz-flex-shrink: ${shrink};
      -ms-flex-shrink: ${shrink};
          flex-shrink: ${shrink};
`;

// Flex basis
// - the initial main size of the flex item
// - applies to: flex itemsnitial main size of the flex item
// <width> 
const flexBasis = (width:string):string => `
  -webkit-flex-basis: ${width};
      -moz-flex-basis: ${width};
      -ms-flex-basis: ${width};
          flex-basis: ${width};
`;

// Axis Alignment
// - applies to: flex containers
// flex-start | flex-end | center | space-between | space-around 
const justifyContent = (justify:string):string => `
  -webkit-justify-content: ${justify};
      -moz-justify-content: ${justify};
      -ms-justify-content: ${justify};
          justify-content: ${justify};
            -ms-flex-pack: ${justify};
`;

// Packing Flex Lines
// - applies to: multi-line flex containers
// flex-start | flex-end | center | space-between | space-around | stretch 
const alignContent = (align:string):string => `
  -webkit-align-content: ${align};
      -moz-align-content: ${align};
      -ms-align-content: ${align};
          align-content: ${align};
`;

// Cross-axis Alignment
// - applies to: flex containers
// flex-start | flex-end | center | baseline | stretch 
const alignItems = (align:string):string => `
  -webkit-align-items: ${align};
      -moz-align-items: ${align};
      -ms-align-items: ${align};
          align-items: ${align};
`;

// Cross-axis Alignment
// - applies to: flex items
// auto | flex-start | flex-end | center | baseline | stretch 
const alignSelf = (align:string):string => `
  -webkit-align-self: ${align};
      -moz-align-self: ${align};
      -ms-align-self: ${align};
          align-self: ${align};
`

const boxSizing = (type:string):string => `
-webkit-box-sizing:${type};
-moz-box-sizing:${type};
box-sizing:${type};
`

const applyFlexbox = (_direction:string = 'row', _justifyContent:string = 'center', _alignItems:string = 'center', _wrap:string = 'nowrap'):string => `
  ${flexbox()}
  ${flexWrap(_wrap)}
  ${flexDirection(_direction)}
  ${justifyContent(_justifyContent)}
  ${alignItems(_alignItems)}
`

export {
  flexbox,
  flex,
  flexDirection,
  flexWrap,
  flexFlow,
  order,
  flexGrow,
  flexShrink,
  flexBasis,
  justifyContent,
  alignContent,
  alignItems,
  alignSelf,
  boxSizing,
  applyFlexbox
};