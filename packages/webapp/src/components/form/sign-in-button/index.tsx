import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface ButtonProps {
  className?: string;
  to: string;
  label: string;
  defaultMessage: string;
}

export const TextButton = ({
  className,
  to,
  label,
  defaultMessage,
}: ButtonProps): React.ReactElement => {
  return (
    <span className={className}>
      <Button
        color="primary"
        size="medium"
        variant="text"
        component={Link}
        to={to}
        sx={{
          px: 1,
          py: 0.375,
          fontSize: '0.8125rem',
          color: '#222428',
          textTransform: 'none',
        }}
      >
        <FormattedMessage id={label} defaultMessage={defaultMessage} />
      </Button>
    </span>
  );
};
