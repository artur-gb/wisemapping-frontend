/*
 *    Copyright [2021] [wisemapping]
 *
 *   Licensed under WiseMapping Public License, Version 1.0 (the "License").
 *   It is basically the Apache License, Version 2.0 (the "License") plus the
 *   "powered by wisemapping" text requirement on every single page;
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the license at
 *
 *       http://www.wisemapping.org/license
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import {
  Route,
  RouterProvider,
  useNavigate,
  useParams,
  createRoutesFromElements,
  createBrowserRouter,
  useSearchParams,
} from 'react-router-dom';
import ForgotPasswordSuccessPage from './components/forgot-password-success-page';
import RegistationPage from './components/registration-page';
import LoginPage from './components/login-page';
import { ForgotPasswordPage } from './components/forgot-password-page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { defaultTheme } from './theme/defaultTheme';
import { communexTheme } from './theme/communexTheme';
import AppI18n, { Locales } from './classes/app-i18n';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import RegistrationSuccessPage from './components/registration-success-page';
import { ThemeProvider } from '@emotion/react';
import RegistrationCallbackPage from './components/registration-callback';
import ErrorPage from './components/error-page';
import { PageModeType, loader as mapLoader } from './components/editor-page/loader';
import { loader as configLoader } from './loader';

import { ClientContext } from './classes/provider/client-context';
import { KeyboardContext } from './classes/provider/keyboard-context';
import CommonPage from './components/common-page';
import AppConfig from './classes/app-config';
import { GlobalStyles } from '@mui/material';

const EditorPage = React.lazy(() => import('./components/editor-page'));
const MapsPage = React.lazy(() => import('./components/maps-page'));

const PageEditorWrapper = ({ mode }: { mode: PageModeType }) => {
  const id = useParams().id;
  if (id === undefined) {
    throw 'Map could not be loaded';
  }

  // Fetch zoom id from query param ...
  const [searchParams] = useSearchParams();
  const zoomStr = searchParams.get('zoom');
  const zoom = zoomStr ? Number.parseFloat(zoomStr) : undefined;

  const mapId: number = Number.parseInt(id);

  // Is a history view ?
  const hidStr = useParams().hid;
  const hid = hidStr ? Number.parseInt(hidStr) : undefined;

  return (
    <Suspense
      fallback={
        <div>
          <FormattedMessage id="dialog.loading" defaultMessage="Loading ..." />
        </div>
      }
    >
      <EditorPage pageMode={mode} mapId={mapId} hid={hid} zoom={zoom} />
    </Suspense>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route loader={configLoader} errorElement={<ErrorPage />}>
      <Route path="/" element={<Redirect to="/c/login" />} />
      <Route path="/c/login" element={<LoginPage />} />
      <Route path="/c/registration" element={<RegistationPage />} />
      <Route path="/c/registration-google" element={<RegistrationCallbackPage />} />
      <Route path="/c/registration-success" element={<RegistrationSuccessPage />} />
      <Route path="/c/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/c/forgot-password-success" element={<ForgotPasswordSuccessPage />} />

      <Route element={<CommonPage />}>
        <Route
          path="/c/maps/"
          element={
            <Suspense
              fallback={
                <div>
                  <FormattedMessage id="dialog.loading" defaultMessage="Loading ..." />
                </div>
              }
            >
              <MapsPage />
            </Suspense>
          }
        />
        <Route
          path="/c/maps/:id/edit"
          element={<PageEditorWrapper mode="edit" />}
          loader={mapLoader('edit')}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/c/maps/:id/print"
          element={<PageEditorWrapper mode="view-private" />}
          loader={mapLoader('view-private')}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/c/maps/:id/:hid/view"
          element={<PageEditorWrapper mode="view-private" />}
          loader={mapLoader('view-private')}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/c/maps/:id/public"
          loader={mapLoader('view-public')}
          element={<PageEditorWrapper mode="view-public" />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/c/maps/:id/embed"
          loader={mapLoader('view-public')}
          element={<PageEditorWrapper mode="view-public" />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/c/maps/:id/try"
          loader={mapLoader('try')}
          element={<PageEditorWrapper mode="try" />}
          errorElement={<ErrorPage />}
        />
      </Route>
    </Route>,
  ),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      staleTime: 5 * 1000 * 60, // 10 minutes
    },
  },
});

// eslint-disable-next-line react/prop-types
function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const App = (): ReactElement => {
  const isCommunexPage = ['/c/login', '/c/registration', '/c/forgot-password'].includes(
    location.pathname,
  );
  const theme = isCommunexPage ? communexTheme : defaultTheme;

  const locale = AppI18n.getDefaultLocale();
  const [hotkeyEnabled, setHotkeyEnabled] = useState(true);

  return (
    <ClientContext.Provider value={AppConfig.getClient()}>
      <QueryClientProvider client={queryClient}>
        <IntlProvider
          locale={locale.code}
          defaultLocale={Locales.EN.code}
          messages={locale.message as Record<string, string>}
        >
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
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
                        src: url('/assets/KFOmCnqEu92Fr1Mu5mxKOzY.woff2') format('woff2');
                        font-style: normal;
                        font-weight: 400;
                        font-display: swap;
                        unicode-range:
                          U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC,
                          U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                      }
                    `,
                    `
                      @font-face {
                        font-family: 'Roboto';
                        src: url(/assets/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');
                        font-style: normal;
                        font-weight: 400;
                        font-display: swap;
                        unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                      }
                    `,
                  ]}
                />
                <CssBaseline />
                <KeyboardContext.Provider value={{ hotkeyEnabled, setHotkeyEnabled }}>
                  <RouterProvider router={router} />
                </KeyboardContext.Provider>
              </ThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </IntlProvider>
      </QueryClientProvider>
    </ClientContext.Provider>
  );
};

export default App;
