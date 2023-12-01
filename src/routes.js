import Home from "./pages/Home";
import Login from "./pages/Login";
import Rule from "./pages/Rule";
import Flow from "./pages/Flow";
import LeftFactor from "./pages/LeftFactor";
import RightFactor from "./pages/RightFactor";

const routes = [
    {
      path: '/Login',
      exact: true,
      component: Login
    },
    {
      path: '/Home',
      exact: true,
      component: Home
    },
    {
      path: '/Rule',
      exact: true,
      component: Rule,
      children: [
        {
          path: '/LeftFactor',
          exact: true,
          component: LeftFactor
        },
        {
          path: '/RightFactor',
          exact: true,
          component: RightFactor
        }
      ]
    },
    {
      path: '/Flow',
      exact: true,
      component: Flow
    },
  ];
  
export default routes;