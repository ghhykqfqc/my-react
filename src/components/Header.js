import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const loginOut = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1000);
  }
  return (
    <div>
      <h1>低代码平台</h1>
      <Button type="primary" onClick={loginOut}>退出登录</Button>
    </div>
  );
}

export default Header;