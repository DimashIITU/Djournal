import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { setCookie } from 'nookies';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { UserApi } from '../../utils/api/user';
import { SignInDto } from '../../utils/api/types';
import { registrateSchema } from '../../utils/schema/validation';
import { FormField } from '../FormField';
import styles from './forms.module.scss';
import { Api } from '../../utils/api';

interface IRegisterProps {
  onClickAuthorize: () => void;
}

export const Register = (props: IRegisterProps) => {
  const [errorState, setErrorState] = React.useState('');
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(registrateSchema),
  });
  const onSubmit = async (data: SignInDto) => {
    try {
      const res = await Api().user.register(data);
      setCookie(null, 'token', res.access_token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      setErrorState('');
    } catch (error) {
      console.warn(error);
      setErrorState(error.response.data.message);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name={'fullName'} label={'Имя пользователья'} />
        <FormField name={'email'} label={'Эл. почта'} />
        <FormField name={'password'} label={'Пароль'} />
        {errorState && (
          <Alert severity="error" className="mb-20">
            {errorState}
          </Alert>
        )}
        <div className={styles.signButtons}>
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            color="primary"
            variant="contained">
            Регистрация
          </Button>
          <Button color="primary" variant="text" onClick={props.onClickAuthorize}>
            Войти
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
