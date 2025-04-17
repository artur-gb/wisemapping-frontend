import { createTheme } from '@mui/material/styles';

const communexTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: '56px',
          borderRadius: '9px',
          fontSize: '1.1rem',
          backgroundColor: 'transparent',

          '& fieldset': {
            border: '1px solid #92949c !important',
          },
          '&:hover fieldset': {
            border: '1px solid #92949c !important',
          },
          '&.Mui-focused fieldset': {
            border: '1px solid #92949c !important',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#f9a826',
          fontSize: '1.1rem',
        },
        outlined: {
          zIndex: 'inherit',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          borderRadius: '9px',
          padding: '6px 20px 6px 20px',
        },
        containedPrimary: {
          color: 'black',
          '&:hover': {
            backgroundColor: '#d6f2ae',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: '0',
          marginBottom: '0',
          width: '100%',
          fontSize: '1.1rem',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px !important',
          maxWidth: '1004px !important',
          width: '100% !important',
          boxSizing: 'border-box',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Roboto'].join(','),
    h4: {
      color: '#000000',
      fontWeight: 600,
      marginBottom: '10px',
    },
    h6: {
      fontSize: '25px',
      fontWeight: 'bold',
    },
  },
  palette: {
    primary: {
      light: '#d3f1a7',
      main: '#d3f1a7',
      dark: '#ffa800',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#a19f9f',
      main: '#5a5a5a',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
  },
});

export { communexTheme };
