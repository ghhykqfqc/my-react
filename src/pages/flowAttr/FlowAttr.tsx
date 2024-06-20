import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Input, Form, Row, Button, Select, Col, theme, FormInstance, message } from 'antd';
import type { TableProps } from 'antd';
import './FlowAttr.scss'
import getFlowList from '@/common/api/flowApi';
import { keyValueMap, msgModel, SelectOptions } from '@/types/util';

function FlowAttr () {
  interface ItemType {
    name: string;
    label: string;
    type: string;
  }
  
  interface DataType {
    key: string;
    flowId: string;
    flowName: string;
    status: string;
  }

  interface filterType {
    flowId: string;
    flowName: string;
    status: string;
  }

  const { Option } = Select;
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const showMsg = (msg: msgModel) => {
    const { type = 'success', content, duration = 1 } = msg;
    messageApi.open({
      type: type,
      content: content,
      duration: duration,
    });
  }

  const searchList = [
    {
      name:'flowId',
      label:'流程Id',
      type: 'input',
    },
    {
      name:'flowName',
      label:'流程名',
      type: 'input',
    },
    {
      name:'status',
      label:'状态',
      type: 'select',
    }
  ]

  const selectOptions: SelectOptions = {
    'status': [
      {
        text: '全部',
        value: '0'
      },
      {
        text: '已完成',
        value: '1'
      },
      {
        text: '已中断',
        value: '2'
      },
      {
        text: '进行中',
        value: '3'
      },
    ],
  }

  const statusColorMap: keyValueMap = {
    '1': 'green',
    '2': 'volcano',
    '3': 'geekblue',
  }

  const getFormItem = (item: ItemType, index: number) => {
    switch (item.type) {
      case 'select':
        return (
          <Form.Item
            key={index}
            name={item.name}
            label={item.label + ':'}
            initialValue="0"
          >
            <Select>
              {selectOptions[item.name] && selectOptions[item.name].map((option, optionIndex) => (
                <Option key={optionIndex} value={option.value}>
                  {option.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      default:
        return (  
          <Form.Item
            name={item.name}
            label={item.label + ':'}
          >
            <Input placeholder={'请输入' + item.label} />
          </Form.Item>
        );
    }
  }

  const getFields = () => {
    const children = [];
    for (let i = 0; i < searchList.length; i++) {
      const item = searchList[i]
      children.push(<Col span={8} key={i}>{getFormItem(item, i)}</Col>);
    }
    return children;
  };
  
  const resetForm = (form: FormInstance) => {
    form.resetFields();
  };
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '流程Id',
      dataIndex: 'flowId',
      key: 'flowId',
    },
    {
      title: '流程名',
      dataIndex: 'flowName',
      key: 'flowName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let statusText = selectOptions['status'].find(option => option.value === status)?.text || ''
        // 根据 status 的值来设置颜色
        let color = statusColorMap[status] || '#333';

        // 返回渲染的标签
        return (
          <Tag color={color} key={status}>
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <span>Invite {record.flowName}</span>
          <span>Delete</span>
        </Space>
      ),
    },
  ];

  const [flowList, setFlowList] = useState([]);

  const refreshTable = (values: filterType) => {
    const {flowId = '', flowName = '', status} = values;
    getFlowList({flowId, flowName, status})
      .then(response => {
        const {code, data, message} = response;
        if(code === 200) {
          setFlowList(data);
        } else {
          showMsg({
              type: 'error',
              content: message,
          });
        }
      })
      .catch(error => {
        console.error('获取失败', error);
      });
  };

  // 在组件挂载时获取 flowList
  useEffect(() => {
    refreshTable({flowId: '', flowName: '', status: '0'});
  },[])

  return (
    <div>
      {contextHolder}
      <div className='page-title'>流程属性列表</div>
      <Form form={form} name="advanced_search" style={formStyle} onFinish={refreshTable}>
        <Row gutter={24}>{getFields()}</Row>
        <div style={{ textAlign: 'right' }}>
          <Space size="small">
            <Button type="primary" htmlType="submit"> 筛选 </Button>
            <Button onClick={() => {resetForm(form)}}> 重置 </Button>
          </Space>
        </div>
      </Form>
      <Table bordered columns={columns} dataSource={flowList} />
    </div>
  );
}

export default FlowAttr;