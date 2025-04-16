import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: '56px',
          borderRadius: '9px',
          fontSize: '1.1rem',
          backgroundColor: 'transparent',
          '& fieldset': {
            border: 'solid 1px #92949c',
          },
          // '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error) fieldset': {
          //   borderColor: '#f9a826',
          // },
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
          fontSize: '15px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          textTransform: 'none',
          borderRadius: '9px',
          padding: '6px 20px 6px 20px',
        },
        containedPrimary: {
          color: 'white',
          '&:hover': {
            backgroundColor: '#1a5f70',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: '1rem',
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
      color: '#ffa800',
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
      light: '#004d60',
      main: '#004d60',
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

export { defaultTheme };
