import React from 'react';
import { ThemeProvider, GlobalStyles, CssBaseline } from '@mui/material';
import { defaultTheme } from './theme/defaultTheme';

const ThemedWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={[
          {
            html: {
              fontFamily: 'Roboto',
              fontSize: '90%',
            },
          },
          `
            @font-face {
              font-family: 'Roboto';
              src: url('/assets/KFOmCnqEu92Fr1Mu4mxK.woff2') format('woff2');
              font-style: normal;
              font-weight: 400;
              font-display: swap;
            }
          `,
        ]}
      />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemedWrapper;
