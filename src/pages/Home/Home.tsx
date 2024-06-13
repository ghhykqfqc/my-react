import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import './Home.scss'

function Home () {
  const navigate = useNavigate();
  const toEnjoy = () => {
    navigate('/login', { replace: false });
  }

  return (
    <div className='home-page'>
      <div className='home-header'>
        <h1 className='home-header-title'>Low Code World</h1>
      </div>
      <div className='home-wrapper'>
        <Button type="primary" onClick={toEnjoy}>立即体验</Button>
      </div>
      <div className='home-footer'>
        <div>备案号：xxx</div>
      </div>
    </div>
  );
}

export default Home;