import withEmotionStyles from '../../HOCs/withEmotionStyles';
import Container from '@mui/material/Container';

const FormContainer = withEmotionStyles({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '16px',
  boxSizing: 'border-box',
  borderWidth: '1px',
  borderRadius: '8px',
  boxShadow: `rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
                rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
                rgba(0, 0, 0, 0.12) 0px 1px 5px 0px`,
  textAlign: 'center',
})(Container);

export default FormContainer;
