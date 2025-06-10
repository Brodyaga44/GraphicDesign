import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Input, Button, message } from 'antd';
import { authApi } from '../api/authApi';
import { RegisterFormData } from '../model/types';

const schema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  about: yup.string(),
  skills: yup.string(),
});

export const RegisterForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authApi.register(data);
      messageApi.success('Registration successful!');
      // Here you would typically store the token and redirect
      console.log('Registration response:', response);
    } catch (error) {
      messageApi.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      {contextHolder}
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item
          label="Login"
          validateStatus={errors.login ? 'error' : ''}
          help={errors.login?.message}
        >
          <Input {...register('login')} />
        </Form.Item>

        <Form.Item
          label="Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Input {...register('name')} />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Input.Password {...register('password')} />
        </Form.Item>

        <Form.Item
          label="About"
          validateStatus={errors.about ? 'error' : ''}
          help={errors.about?.message}
        >
          <Input.TextArea {...register('about')} />
        </Form.Item>

        <Form.Item
          label="Skills"
          validateStatus={errors.skills ? 'error' : ''}
          help={errors.skills?.message}
        >
          <Input {...register('skills')} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}; 