import FlowAttr from "./pages/flowAttr/FlowAttr";
import FlowProgress from "./pages/flow/FlowProgress";
import RightRelate from "./pages/rule/RightRelate";
import LeftFactor from "./pages/rule/LeftFactor";
import LeftRelate from "./pages/rule/LeftRelate";
import RightFactor from "./pages/rule/RightFactor";
import Translate from "./pages/chat/Translate";

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
      path: '/flow',
      exact: true,
      children: [
        {
          path: '/flow/FlowProgress',
          exact: true,
          component: FlowProgress
        },
        {
          path: '/flow/FlowAttr',
          exact: true,
          component: FlowAttr
        }
      ]
    },
    {
      path: '/chat',
      exact: true,
      children: [
        {
          path: '/chat/translate',
          exact: true,
          component: Translate
        }
      ]
    }
  ];
  
export default routes;