import Input from '../common/Input';
import Button from '../common/Button';
import tw from 'tailwind-styled-components';
import useInput from '../../hooks/useInput';
import { join } from '../../apis/auth';
import useSubmit from '../../hooks/useSubmit';

const Container = tw.form`flex flex-col w-10/12 h-full justify-center items-center rounded-xl`;

const Register = () => {
  const form = {
    email: useInput({
      initialValue: '',
      errorMessage: '이메일 형식이 올바르지 않습니다.',
      pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
      required: true,
    }),
    password: useInput({
      initialValue: '',
      pattern: '^(?=.*[a-zA-Z])(?=.*).{8,25}$',
      errorMessage: '비밀번호가 8자 이상인지 확인해 주세요.',
      required: true,
    }),
    pwdCheck: useInput({
      initialValue: '',
      errorMessage: '비밀번호가 같지 않습니다.',
      required: true,
    }),
  };

  const { onSubmit } = useSubmit({
    submitFunction: join,
    formData: { email: form.email.value, password: form.password.value },
  });

  return (
    <Container onSubmit={onSubmit}>
      <Input type='email' label='Email' {...form.email} />
      <Input type='password' label='Password' {...form.password} />
      <Input type='password' label='Password Check' {...form.pwdCheck} pattern={form.password.value} />
      <Button type='submit' className={'mt-1 bg-rose-400 text-white shadow-md mx-auto'}
              disabled={!form.email.valid || !form.password.valid || !form.pwdCheck.valid}>Join</Button>
    </Container>);
};

export default Register;