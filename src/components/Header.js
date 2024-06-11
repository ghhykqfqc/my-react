import { Avatar, Button, message } from 'antd';
import { useNavigate } from "react-router-dom";
import Iconfont from '../common/js/Iconfont'

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
      <Avatar>管理员</Avatar>
      <Button type="primary" onClick={loginOut}>
        <Iconfont name="logout" color='#fff' className="additional-class"/>退出登录
      </Button>
    </div>
  );
}

export default Header;