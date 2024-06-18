import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import './FlowAttr.scss'

function FlowAttr () {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    status: string;
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
          <span>Invite {record.name}</span>
          <span>Delete</span>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      status: 'nice',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      status: 'loser',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      status: 'cool',
    },
  ];

  return (
    <div>
      {/* 其他页面内容 */}
      <div >流程属性列表</div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default FlowAttr;