import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
// 全局样式
import './common/styles/frame.scss'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes />
      </App>
    </Router>
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';

// // 导入自定义路由配置
// import routes from './routes';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       {routes.filter(({ path }) => !path.startsWith('/iframe')).map(route => (
//         <Route
//           key={route.path}
//           path={route.path}
//           exact={route.exact}
//           Component={route.component}
//         />
//       ))}
//     </Routes>
//   </BrowserRouter>
// );