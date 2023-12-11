import FlowProgress from "./pages/flow/FlowProgress";
import RightRelate from "./pages/rule/RightRelate";
import LeftFactor from "./pages/rule/LeftFactor";
import LeftRelate from "./pages/rule/LeftRelate";
import RightFactor from "./pages/rule/RightFactor";

const routes = [
    {
      path: '/rule',
      exact: true,
      children: [
        {
          path: '/rule/LeftFactor',
          exact: true,
          component: LeftFactor
        },
        {
          path: '/rule/RightFactor',
          exact: true,
          component: RightFactor
        },
        {
          path: '/rule/LeftRelate',
          exact: true,
          component: LeftRelate
        },
        {
          path: '/rule/RightRelate',
          exact: true,
          component: RightRelate
        }
      ]
    },
    {
      path: '/flow/FlowProgress',
      exact: true,
      component: FlowProgress
    }
  ];
  
export default routes;