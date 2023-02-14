import { TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface IFormFieldProps {
  name: string;
  label: string;
}

export const FormField = ({ name, label }: IFormFieldProps) => {
  const { formState, register } = useFormContext();
  return (
    <TextField
      {...register(name)}
      name={name}
      label={label}
      className="mb-20"
      size="small"
      variant="outlined"
      error={!!formState.errors[name]}
      helperText={formState.errors[name]?.message}
      fullWidth
    />
  );
  //   );
};
