import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';
import routes from "./routes";
import AppLayout from "./pages/Layout";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import './App.css';


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
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Layout>
  );
};
export default App;