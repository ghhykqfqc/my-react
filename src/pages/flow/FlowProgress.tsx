import React, { useState } from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Steps, theme } from 'antd';
import './FlowProgress.scss'

function FlowProgress () {
  const stepList = [
    {
      title: 'First',
      content: 'First-content:流程1的具体内容描述',
    },
    {
      title: 'Second',
      content: 'Second-content:流程2的具体内容描述',
    },
    {
      title: 'Last',
      content: 'Last-content:流程3的具体内容描述',
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = stepList.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div>
      {/* 其他页面内容 */}
      <div >流程进度管理</div>
      <Steps
        className='step-gap'
        items={[
          {
            title: 'Login',
            status: 'finish',
            icon: <UserOutlined />,
          },
          {
            title: 'Verification',
            status: 'finish',
            icon: <SolutionOutlined />,
          },
          {
            title: 'Pay',
            status: 'process',
            icon: <LoadingOutlined />,
          },
          {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
          },
        ]}
      />

      <Steps className='step-gap' current={current} items={items} />
      <div style={contentStyle}>{stepList[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < stepList.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === stepList.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        <Button type="primary" href="/flowEngine">
          流程配置
        </Button>
      </div>
    </div>
  );
}

export default FlowProgress;