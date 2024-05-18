import styled, { createGlobalStyle } from 'styled-components';
import { primary } from '@/theme/colors';

interface GlobalStyleProps {
  scale: number;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html {
    font-size: 62.5%;
    zoom: ${(props) => props.scale};
  }

  :root {
    --zoom: ${(props) => props.scale};
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }
`;

const elevation2 = `'0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)'`;

export const ButtonLabel = styled.span`
  line-height: 22px;
  margin-bottom: -2px;
  font-size: 1.3rem;
  letter-spacing: 0.46px';
  font-weight: 500;
`;

const commonButtonStyle = {
  padding: '6px 16px',
  width: 'auto',
  height: '36px',
  fontSize: '1.3rem',
};

export const textButtonStyle = {
  ...commonButtonStyle,
  background: 'none',
  color: primary.darkBlue,
  boxShadow: 'none',
};

export const containedButtonStyle = {
  ...commonButtonStyle,
  background: primary.darkBlue,
  color: 'white',
  boxShadow: elevation2,
};
