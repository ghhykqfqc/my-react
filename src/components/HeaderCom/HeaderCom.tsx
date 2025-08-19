import { Avatar, Button, message } from 'antd';
import { useNavigate } from "react-router-dom";
import Iconfont from '@/common/js/Iconfont'
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import './HeaderCom.scss'
import { IRootState } from '@/stores/index';
import { deleteUser } from '@/stores/modules/userStore';

interface headerProps {
  collapsed: boolean,
  setCollapsed: (newCollapsed: boolean) => void;
}

function HeaderCom(headerProps: headerProps) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const loginOut = () => {
    localStorage.removeItem('token');
    dispatch(deleteUser());
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 1000);
    messageApi.open({
      type: 'success',
      content: '退出登录成功!',
      duration: 1,
    });
  }

  const username = useSelector((state: IRootState) => state.user.username) || '';
  console.log('HeaderCom username:', username);
  
  return (
    <div className='header-container'>
      {contextHolder}
      <div className='header-container__left'>
        <Button
          type="text"
          icon={headerProps.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => headerProps.setCollapsed(!headerProps.collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <h1 className='header-container__left-title'>低代码平台</h1>
      </div>
      <div className='header-container__right'>
        <Avatar>{ username }</Avatar>
        <Button type="primary" onClick={loginOut}>
          <Iconfont name="logout" color='#fff' className="additional-class"/>退出登录
        </Button>
      </div>
    </div>
  );
}

export default HeaderCom;