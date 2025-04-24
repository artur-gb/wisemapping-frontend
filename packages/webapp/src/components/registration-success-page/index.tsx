import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormContainer from '../layout/form-container';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReactGA from 'react-ga4';

const RegistrationSuccessPage = (): React.ReactElement => {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: 'registation.success-title',
      defaultMessage: 'Registation Success | WiseMapping',
    });
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
      title: 'Registration:Success',
    });
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <FormContainer>
        <Typography variant="h4" component="h1">
          <FormattedMessage
            id="resetpassword.success.title"
            defaultMessage="Your account has been created successfully"
          />
        </Typography>

        <Typography paragraph>
          <FormattedMessage
            id="registration.success.desc"
            defaultMessage="Click 'Sign In' button below and start creating mind maps."
          />
        </Typography>

        <Button
          color="primary"
          size="medium"
          variant="contained"
          component={RouterLink}
          to="/c/login"
          disableElevation={true}
        >
          <FormattedMessage id="login.signin" defaultMessage="Sign In" />
        </Button>
      </FormContainer>
    </div>
  );
};

export default RegistrationSuccessPage;
