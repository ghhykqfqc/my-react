import React, {useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import LoginCom from '../../components/LoginCom/LoginCom';
import { msgModel } from '../../types/util';
import './Login.scss';


function Login () {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const isFirstRender = useRef(true);

  // 检查本地存储中是否存在 token
  useEffect(() => {
    if (isFirstRender.current) { // 使只在组件挂载时执行一次
      isFirstRender.current = false;
      const token = localStorage.getItem('token');
      if (token) {
        // 模拟验证 token 的过程
        // 这里可以调用一个函数来验证 token 是否有效, 此处简单认为token存在即有效
        // 如果有效，则跳转到主页
        setTimeout(() => {
          navigate('/flow/FlowProgress', { replace: true });
        }, 1000);
        showMsg({ content: '登录成功!' });
      }
    }
  }, []);

  const showMsg = (msg: msgModel) => {
    const { type = 'success', content, duration = 1 } = msg;
    messageApi.open({
      type: type,
      content: content,
      duration: duration,
    });
  }

  return (
    <div className='login-page'>
      {contextHolder}
      <LoginCom showMsg={showMsg} />
    </div>
  );
}

export default Login;