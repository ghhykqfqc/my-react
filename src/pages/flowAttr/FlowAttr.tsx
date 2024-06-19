import React from 'react';
import { Space, Table, Tag, Input, Form, Row, Button, Select, Col, theme, FormInstance } from 'antd';
import type { TableProps } from 'antd';
import './FlowAttr.scss'

function FlowAttr () {
  interface OptionType {
    value: string;
    text: string;
  }
  interface ItemType {
    name: string;
    label: string;
    type: string;
    options?: OptionType[];
  }

  const { Option } = Select;
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

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
      options: [
        {
          text: '全部',
          value: '0'
        },
        {
          text: 'nice',
          value: '1'
        },
        {
          text: 'loser',
          value: '2'
        },
        {
          text: 'cool',
          value: '3'
        },
      ]
    }
  ]

  const getFormItem = (item: ItemType, index: number) => {
    switch (item.type) {
      case 'select':
        return (
          <Form.Item
            name={item.name}
            label={item.label + ':'}
            initialValue="0"
          >
            <Select>
              {item.options && item.options.map((option, optionIndex) => (
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
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const resetForm = (form: FormInstance) => {
    form.resetFields();
  };
  interface DataType {
    key: string;
    flowId: string;
    flowName: string;
    status: string;
  }
  
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
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        // 根据 status 的值来设置颜色
        let color = status.length > 5 ? 'geekblue' : 'green';

        // 如果 status 等于 'loser'，则设置特定颜色
        if (status === 'loser') {
          color = 'volcano';
        }
    
        // 返回渲染的标签
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
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
  
  const data: DataType[] = [
    {
      key: '1',
      flowId: '32',
      flowName: 'John Brown',
      status: 'nice',
    },
    {
      key: '2',
      flowId: '42',
      flowName: 'Jim Green',
      status: 'loser',
    },
    {
      key: '3',
      flowId: '52',
      flowName: 'Joe Black',
      status: 'cool',
    },
  ];

  return (
    <div>
      <div className='page-title'>流程属性列表</div>
      <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
        <Row gutter={24}>{getFields()}</Row>
        <div style={{ textAlign: 'right' }}>
          <Space size="small">
            <Button type="primary" htmlType="submit"> 筛选 </Button>
            <Button onClick={() => {resetForm(form)}}> 重置 </Button>
          </Space>
        </div>
      </Form>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
}

export default FlowAttr;