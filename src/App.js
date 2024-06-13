import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';
import routes from "./routes";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import NotFound from './pages/notFound/NotFound';
import './App.css';
import './mock/login'; // 引入mock数据


const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<AppLayout />}>
          {routes.map(route => (
            route.children ? (
                route.children.map(childItem => (
                  <Route key={childItem.path} exact path={childItem.path} Component={childItem.component} />
                ))
            ) : (
              <Route key={route.path} exact path={route.path} Component={route.component} />
            )
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};
export default App;