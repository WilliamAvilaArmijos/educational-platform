import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Image, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
// props react router dom redirect to Home
const LoginPage = () => {
  const navigate = useNavigate()
  const onFinish = values => {
    navigate('/home')
  }

  return (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

        // background: ' rgb(12,22,51)',
        // background:
        //   'linear-gradient(180deg, rgba(12,22,51,1) 1%, rgba(0,212,255,1) 25%, rgba(0,212,255,1) 75%, rgba(12,22,51,1) 100%)',
      }}
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Image src={logo} width={300} style={{ marginBottom: 50 }} preview={false} />
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Ingrese su correo',
          },
        ]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Correo electrónico' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Ingrese su contraseña!',
          },
        ]}
      >
        <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Contraseña' />
      </Form.Item>
      <Form.Item>
        {/* <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Recordarme</Checkbox>
        </Form.Item> */}

        <a className='login-form-forgot' href='' style={{ color: 'white' }}>
          Olvide mi contraseña
        </a>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Iniciar sesión
        </Button>{' '}
        O{' '}
        <a href='/register' style={{ color: 'white' }}>
          Crear cuenta
        </a>
      </Form.Item>
    </Form>
  )
}

export default LoginPage
