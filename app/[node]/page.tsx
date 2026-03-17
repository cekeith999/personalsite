import NodeView from '../../components/NodeView';
import { nodes } from '../../data/nodes';

export function generateStaticParams() {
  return nodes.map((node) => ({
    node: node.id,
  }));
}

export default function NodePage({ params }: { params: { node: string } }) {
  const nodeData = nodes.find(n => n.id === params.node);
  
  if (!nodeData) {
    return null;
  }

  // Because NodeView expects nodeId and onClose
  return <NodeView nodeId={nodeData.id} onClose={() => {}} />;
}
