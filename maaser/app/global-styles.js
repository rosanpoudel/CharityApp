import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  *{
    text-decoration: none;
    margin: 0;
    padding: 0;
  }

  

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
