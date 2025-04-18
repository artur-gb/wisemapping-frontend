import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import SubmitButton from '../form/submit-button';
import Input from '../form/input';
import GlobalError from '../form/global-error';
import FormContainer from '../layout/form-container';
import FormControl from '@mui/material/FormControl';
import ReactGA from 'react-ga4';
import Separator from '../common/separator';
import GoogleButton from '../common/google-button';
import AppConfig from '../../classes/app-config';
import { useMutation } from 'react-query';
import { ErrorInfo, LoginErrorInfo } from '../../classes/client';
import { ClientContext } from '../../classes/provider/client-context';
import { Box } from '@mui/material';
import { TextButton } from '../form/sign-in-button';
import CommunexLogo from '../common/communex-icon';
import PasswordInput from '../form/password-input';

export type Model = {
  email: string;
  password: string;
};

export type LoginErrorProps = {
  errorCode: number | undefined;
};

const defaultModel: Model = { email: '', password: '' };

const LoginError = ({ errorCode }: LoginErrorProps) => {
  const intl = useIntl();

  let msg: null | string = null;
  if (errorCode) {
    switch (errorCode) {
      case 1:
        msg = intl.formatMessage({
          id: 'login.unexpected-error',
          defaultMessage: 'Unexpected error during login. Please, try latter.',
        });
        break;
      case 2:
        msg = intl.formatMessage({
          id: 'login.userinactive',
          defaultMessage:
            "Sorry, your account has not been activated yet. You'll receive a notification email when it becomes active. Stay tuned!.",
        });
        break;
      default:
        msg = intl.formatMessage({
          id: 'login.error',
          defaultMessage: 'The email address or password you entered is not valid.',
        });
    }
  }
  return msg ? <GlobalError error={{ msg: msg }} /> : null;
};

const LoginPage = (): React.ReactElement => {
  const intl = useIntl();
  const [model, setModel] = useState<Model>(defaultModel);
  const [loginError, setLoginError] = useState<number | undefined>(undefined);

  const client = useContext(ClientContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: 'login.page-title',
      defaultMessage: 'Login | WiseMapping',
    });
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname, title: 'Login' });
  }, []);

  const mutation = useMutation<void, ErrorInfo, Model>(
    (model: Model) => client.login({ ...model }),
    {
      onSuccess: () => {
        // If the url has been defined, redirect to the original url.
        let redirectUrl = new URLSearchParams(location.search).get('redirect');
        redirectUrl = redirectUrl ? redirectUrl : '/c/maps/';
        console.log(`redirectUrl: ${redirectUrl}`);
        navigate(redirectUrl);
      },
      onError: (error: LoginErrorInfo) => {
        setLoginError(error.code);
      },
    },
  );

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    mutation.mutate(model);
    event.preventDefault();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const name = event.target.name;
    const value = event.target.value;
    setModel({ ...model, [name as keyof Model]: value });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '984px', width: '100%', boxSizing: 'border-box', margin: '10px' }}>
        <FormContainer>
          <Box my={'16px'} width={'100%'}>
            <CommunexLogo width={'50%'} fill="#000" />
          </Box>
          <LoginError errorCode={loginError} />

          <FormControl>
            <form onSubmit={handleOnSubmit}>
              <Input
                onChange={handleOnChange}
                name="email"
                type="email"
                label={intl.formatMessage({
                  id: 'login.email',
                  defaultMessage: 'Email',
                })}
                required
                autoComplete="email"
              />
              <PasswordInput
                onChange={handleOnChange}
                name="password"
                label={intl.formatMessage({
                  id: 'login.password',
                  defaultMessage: 'Password',
                })}
                required
                autoComplete="current-password"
                sx={{ mt: '1rem' }}
              />
              <SubmitButton
                value={intl.formatMessage({
                  id: 'login.signin',
                  defaultMessage: 'Sign In',
                })}
              />
            </form>
          </FormControl>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="32px"
            width="100%"
            mt={2}
          >
            <TextButton
              to="/c/registration"
              label="header.donthaveaccount"
              defaultMessage="Register now"
            />
            <TextButton
              to="/c/forgot-password"
              label="login.forgotpwd"
              defaultMessage="Forgot Password?"
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="32px"
            width="100%"
            mt={2}
          >
            <TextButton
              to="https://www.intrakommuna.de/datenschutz"
              label="footer.termsandconditions"
              defaultMessage="Term And Conditions"
            />
          </Box>
          {AppConfig.isRegistrationEnabled() && (
            <>
              <Separator
                responsive={false}
                text={intl.formatMessage({
                  id: 'login.division',
                  defaultMessage: 'or',
                })}
              />
              <GoogleButton
                text={intl.formatMessage({
                  id: 'login.google.button',
                  defaultMessage: 'Sign in with Google',
                })}
                onClick={() => {
                  const authUrl = AppConfig.getGoogleOauth2Url();
                  if (authUrl) {
                    window.location.href = authUrl;
                  } else {
                    console.log('GoogleOauth2Url is not configured.');
                  }
                }}
              />
            </>
          )}
        </FormContainer>
      </div>
    </div>
  );
};

export default LoginPage;
