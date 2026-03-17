'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EntrySequence from '../components/EntrySequence';
import NodeCanvas from '../components/NodeCanvas';
import NodeView from '../components/NodeView';

export default function Home() {
  const [entryComplete, setEntryComplete] = useState(false);
  const [openNodeId, setOpenNodeId] = useState<string | null>(null);

  return (
    <main className="w-full h-full relative">
      <AnimatePresence mode="wait">
        {!entryComplete && (
          <EntrySequence key="entry" onComplete={() => setEntryComplete(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entryComplete && (
          <NodeCanvas key="canvas" onNodeOpen={(id) => setOpenNodeId(id)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openNodeId && (
          <NodeView key="nodeview" nodeId={openNodeId} onClose={() => setOpenNodeId(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
