// mock/flow.js
import Mock from 'mockjs';

// 定义模拟数据
const flowList = Mock.mock({
  'list|10-20': [
    {
      'key': '@guid',
      'flowId': '@id',
      'flowName': `@string('word', 3, 10)流程`,
      'status': `@pick('1', '2', '3')`
    }
  ]
});

// 使用 Mock 模拟获取flowList
Mock.mock('http://localhost:3000/mock-api/getFlowList', 'post', (options) => {
  // 解析请求数据
  const data = JSON.parse(options.body);

  // 根据请求参数筛选数据
  const filteredFlowList = flowList.list.filter(item => {
    return (
      (!data.flowId || item.flowId.includes(data.flowId)) &&
      (!data.flowName || item.flowName.includes(data.flowName)) &&
      (data.status === '0' || item.status === data.status)
    );
  });

  // 返回筛选后的数据
  return {
    code: 200,
    message: 'Success',
    data: filteredFlowList
  }
});