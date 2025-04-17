import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

type SubmitButton = {
  value: string;
  disabled?: boolean;
};
const SubmitButton = (props: SubmitButton): React.ReactElement => {
  const [disabled] = useState(props.disabled ? true : false);
  const intl = useIntl();

  let valueTxt = props.value;
  if (disabled) {
    valueTxt = intl.formatMessage({ id: 'common.wait', defaultMessage: 'Please wait ...' });
  }
  const [value] = useState(valueTxt);
  return (
    <Button
      color="primary"
      size="medium"
      variant="contained"
      type="submit"
      disableElevation={true}
      disabled={disabled}
      style={{
        width: '100%',
        height: '44px',
        marginTop: '16px',
        fontWeight: 700,
        fontSize: '0.875rem',
      }}
    >
      {value}
    </Button>
  );
};

export default SubmitButton;
