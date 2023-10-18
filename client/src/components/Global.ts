import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: Merriweather;
  font-weight: 700;
  font-style: normal;
  src: url('/fonts/Merriweather/Merriweather-Bold.ttf');
}

@font-face {
  font-family: Lato;
  font-weight: 400;
  font-style: normal;
  src: url('/fonts/Lato/Lato-Regular.ttf');
}

* {
  font-family: 'Merriweather';
}

body {
  margin: 0;
}

`;
