import {getEn2ChTransResult, getSourceLanguageCode} from '@/common/api/chatApi';
import { msgModel } from '@/types/util';
import { message } from 'antd';
import React, { useState } from 'react';
import './Translate.scss';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Translate: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    let sourceParams = {
      text: input
    }
    determineSourceAndGetTrans(sourceParams)
  };

  const determineSourceAndGetTrans = (sourceParams: any) => {
    getSourceLanguageCode(sourceParams).then(response => {
      const {status, data, statusText} = response;
      if(status === 200) {
        console.log('data.language====>',data.language)
        let sendParams = {
          text: input,
          source: data.language,
          target: data.language !== 'zho_Hans' ? (data.language === 'eng_Latn' ? 'zho_Hans' : 'eng_Latn') : 'eng_Latn'
        }
        getTransResult(sendParams)
      } else {
          showMsg({
              type: 'error',
              content: statusText,
          });
      }
    })
  }

  const getTransResult = (sendParams: any) => {
    // 登录
    getEn2ChTransResult(sendParams)
      .then(response => {
        const {status, data, statusText} = response;
        if(status === 200) {
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: data.result, sender: 'bot' }]);
          }, 1000);
        } else {
            showMsg({
                type: 'error',
                content: statusText,
            });
        }
      })
      .catch(error => {
        console.error('获取翻译信息失败', error);
      });
  };

  const showMsg = (msg: msgModel) => {
    const { type = 'success', content, duration = 1 } = msg;
    messageApi.open({
      type: type,
      content: content,
      duration: duration,
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {contextHolder}
      <div className="chat-header">
        <h2>Chat with Auto Translate Bot</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="请输入..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Translate;