import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

function Home () {
  const navigate = useNavigate();
  const toEnjoy = () => {
    setTimeout(() => {
      navigate('/flow/FlowProgress', { replace: false });
    }, 1000);
  }

  return (
    <div>
      <Header />
      <div>
        <Button type="primary" onClick={toEnjoy}>立即体验</Button>
      </div>
    </div>
  );
}

export default Home;