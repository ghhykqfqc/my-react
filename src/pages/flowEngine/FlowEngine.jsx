import React, { useState, useRef, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Panel,
} from '@xyflow/react';
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
import '@xyflow/react/dist/style.css';
import './FlowEngine.css';
 
const initialNodes = [];
 
let id = 0;
const getId = () => `dndnode_${id++}`;
const flowKey = 'example-flow';
 
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport, screenToFlowPosition, getIntersectingNodes } = useReactFlow();
  const [type, setType] = useDnD();
 
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
 
  const onDragOver = useCallback((event, node) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      // check if the dropped element is valid
      if (!type) {
        return;
      }
      let newNode = null;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      if(type === 'group') {
        newNode = {
          id: getId(),
          type,
          position,
          style: { width: 200, height: 200 },
          data: { label: `Group-${type}` },
        };
      } else {
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type}-Node` },
        };
      }
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  const onNodeDrag = useCallback((_, node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);
    setNodes((ns) =>
      ns.map((n) => ({
        ...n,
        className: intersections.includes(n.id) ? 'highlight' : '',
      })),
    );
  }, []);

  const onNodeDragStop = useCallback((_, node)=> {
    const intersectionGroup = getIntersectingNodes(node).find((n) => n.type === 'group');
    if(!intersectionGroup) {
      return
    }
    setNodes((ns) => {
      // 1. 找到 intersectionGroup 节点（假设它存在且有 id）
      const groupNode = intersectionGroup ? { ...intersectionGroup } : null;

      // 2. 从原节点数组中过滤掉 intersectionGroup（避免重复，后面我们会手动插入到最前）
      const otherNodes = ns.filter((n) => n.id !== groupNode?.id);

      // 3. 对其他节点应用你原有的逻辑：高亮、parentId、extent
      const processedOtherNodes = otherNodes.map((n) => {
        const parentId =
          n.id === node.id && intersectionGroup ? intersectionGroup.id : n.parentId;
        const extent =
          n.id === node.id && intersectionGroup ? 'parent' : n.extent;
          return {
            ...n,
            // className: intersections.includes(n.id) ? 'highlight' : '',
            parentId,
            extent
          }
      });

      // 4. 构造最终节点数组：[intersectionGroup, ...processedOtherNodes]
      // 注意：如果 intersectionGroup 不存在，则直接返回 processedOtherNodes
      return groupNode ? [groupNode, ...processedOtherNodes] : processedOtherNodes;
    });
  }, [])

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
 
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
 
    restoreFlow();
  }, [setNodes, setViewport]);
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onInit={setRfInstance}
          fitView
          fitViewOptions={{ padding: 2 }}
        >
          <Controls />
          <Background />
          <Panel position="top-right">
            <button className="xy-theme__button" onClick={onSave}>
              save
            </button>
            <button className="xy-theme__button" onClick={onRestore}>
              restore
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};
 
const FlowEngine = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);

export default FlowEngine;