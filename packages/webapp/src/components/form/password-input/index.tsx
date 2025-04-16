import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ErrorInfo } from '../../../classes/client';

type PasswordInputProps = {
  name: string;
  label: string;
  error?: ErrorInfo;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  maxLength?: number;
};

const PasswordInput = ({
  name,
  label,
  error,
  value,
  onChange,
  required = true,
  autoComplete = 'current-password',
  fullWidth = true,
  disabled = false,
  maxLength = 254,
}: PasswordInputProps): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const fieldError = error?.fields?.[name];

  return (
    <TextField
      name={name}
      placeholder={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      error={Boolean(fieldError)}
      helperText={fieldError}
      variant="outlined"
      required={required}
      fullWidth={fullWidth}
      margin="dense"
      disabled={disabled}
      autoComplete={autoComplete}
      inputProps={{ maxLength }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              aria-label="toggle password visibility"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;