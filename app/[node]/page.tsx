'use client';

import NodeView from '../../components/NodeView';
import { nodes } from '../../data/nodes';
import { useRouter } from 'next/navigation';

export default function NodePage({ params }: { params: { node: string } }) {
  const router = useRouter();
  const nodeData = nodes.find(n => n.id === params.node);
  
  if (!nodeData) {
    return null;
  }

  // NodeView needs to run as a client component to handle events
  return <NodeView nodeId={nodeData.id} onClose={() => router.push('/')} />;
}
