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
 
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];
 
let id = 0;
const getId = () => `dndnode_${id++}`;
const flowKey = 'example-flow';
 
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport, screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();
 
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
 
  const onDragOver = useCallback((event) => {
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
          parentId: null,
          extent: 'parent',
        };
      }
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

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