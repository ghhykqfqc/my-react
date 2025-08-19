import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'counter',
  // 初始 state
  initialState: {
    username: null
  },
  // 修改数据的同步方法 支持直接修改
  reducers: {
    addUser(state, action) {
      console.log('action', action);
      // 不需要返回一个 state对象，可以直接修改，得益于内置了immer中间件
      state.username = action.payload;
    },
    deleteUser(state){
      state.username = null;
    }
  }
})
// 解构出 actionCreater 函数
// action 具有两个值 一个是 payload 另一个是 type
// 一个行为具有行为的类型（type）和具体的实施（payload 传递值）
const { addUser, deleteUser } = userStore.actions

// 获取 reducer 函数
const userReducer = userStore.reducer

// 导出
export { addUser, deleteUser }
export default userReducer