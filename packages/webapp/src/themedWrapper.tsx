// ThemeWrapper.tsx
import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles, CssBaseline } from '@mui/material';
import { defaultTheme } from './theme/defaultTheme';
import { communexTheme } from './theme/communexTheme';
import { KeyboardContext } from './classes/provider/keyboard-context';

const isCommunexPath = (pathname: string) =>
  ['/c/login', '/c/registration', '/c/forgot-password'].includes(pathname);

const ThemeWrapper = () => {
  const location = useLocation();

  const theme = useMemo(
    () => (isCommunexPath(location.pathname) ? communexTheme : defaultTheme),
    [location.pathname],
  );

  const [hotkeyEnabled, setHotkeyEnabled] = useState(true);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={[
              { html: { fontFamily: 'Roboto', fontSize: '90%' } },
              `@font-face {
               font-family: 'Roboto';
               src: url('/assets/fonts/KFOmCnqEu92Fr1Mu4mxK.woff2') format('woff2');
               font-weight: 400;
               font-style: normal;
               font-display: swap;
               unicode-range: U+0000-00FF;
             }`,
              `@font-face {
              font-family: 'Roboto';
              src: url('/assets/fonts/KFOlCnqEu92Fr1MmWUlfBBc4.woff2') format('woff2');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
              unicode-range:
                U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074,
                U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }`,
              `@font-face {
               font-family: 'Roboto';
               src: url('/assets/fonts/KFOmCnqEu92Fr1Mu5mxKOzY.woff2') format('woff2');
               font-weight: 400;
               font-style: normal;
               font-display: swap;
               unicode-range: U+0400-04FF;
             }`,
            ]}
          />
          <CssBaseline />
          <KeyboardContext.Provider value={{ hotkeyEnabled, setHotkeyEnabled }}>
            <Outlet />
          </KeyboardContext.Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeWrapper;
