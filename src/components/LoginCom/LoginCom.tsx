import React from 'react';
import { NavigateFunction } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './LoginCom.scss';
import login from '../../common/api/loginApi'
import { msgModel } from '../../types/util';

interface loginProps {
    showMsg: (msg: msgModel) => void;
    navigate: NavigateFunction
}

function Login (props: loginProps) {
    const onFinish = (values: any) => {
        const { username, password, remember} = values;
        
        // 使用
        login(username, password)
          .then(response => {
            const {code, data, message} = response;
            if(code === 200) {
              if(remember) {
                // 存储用户名和密码
                localStorage.setItem('username', username);
                localStorage.setItem('token', data.token);
              }
              setTimeout(()=>{
                props.navigate('/flow/FlowProgress', { replace: true });
              },1000)
              props.showMsg({ content: '登录成功!' });
            } else {
                props.showMsg({
                    type: 'error',
                    content: message,
                });
            }
          })
          .catch(error => {
            console.error('登录失败', error);
          });
    };
  
    return (
        <div className="login-container">
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '用户名不能为空!' }]}
            >
                <Input maxLength={11} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '密码不能为空!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                maxLength={11}
                placeholder="请输入密码"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                登录
                </Button>
                <Button type="link">立即注册!</Button>
            </Form.Item>
            </Form>
        </div>
    );
  }
  
  export default Login;