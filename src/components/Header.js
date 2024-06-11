import { Button, message } from 'antd';
import { useNavigate } from "react-router-dom";

function Header() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const loginOut = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1000);
    messageApi.open({
      type: 'success',
      content: '退出登录成功!',
      duration: 1,
    });
  }
  return (
    <div>
      {contextHolder}
      <h1>低代码平台</h1>
      <Button type="primary" onClick={loginOut}>退出登录</Button>
    </div>
  );
}

export default Header;