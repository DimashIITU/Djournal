import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup.string().email('неверный формат почты').required('Пота обязательна'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть минимум 6 символов')
    .required('Пароль обязательный'),
});

export const registrateSchema = yup
  .object()
  .shape({
    fullName: yup.string().min(3, 'Заполните поле корректно').required('Имя и фамилья обязательны'),
  })
  .concat(userSchema);
