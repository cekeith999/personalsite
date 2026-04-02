'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { NodeData } from '../data/nodes';

interface NodeProps {
  node: NodeData;
  onOpen: (id: string) => void;
  initialX: number;
  initialY: number;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export default function Node({ node, onOpen, initialX, initialY, onPositionChange }: NodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const hasDragged = useRef(false);
  const dragDelta = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: initialX, y: initialY });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const glowColor = node.color.startsWith('#') ? hexToRgba(node.color, 0.5) : node.color;
  const pulseDelayValue = node.pulseDelay ? node.pulseDelay : 0;

  return (
    <motion.div
      className="absolute touch-none pointer-events-auto"
      style={{ 
        left: initialX, 
        top: initialY, 
        marginLeft: -(node.size / 2),
        marginTop: -(node.size / 2),
        x, 
        y, 
        cursor: isDragging ? 'grabbing' : 'grab' 
      }}
      drag
      dragMomentum={false}
      dragElastic={0.08}
      dragTransition={{
        bounceStiffness: 180,
        bounceDamping: 18,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 50,
      }}
      onDragStart={() => {
        setIsDragging(true);
        hasDragged.current = false;
        dragDelta.current = { x: 0, y: 0 };
      }}
      onDrag={(_event, info) => {
        dragDelta.current = { x: info.offset.x, y: info.offset.y };
        const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
        if (dist > 4) {
          hasDragged.current = true;
        }

        // Calculate current center position of this node
        currentPos.current = {
          x: initialX + info.offset.x,
          y: initialY + info.offset.y,
        }
        onPositionChange(node.id, currentPos.current.x, currentPos.current.y);
      }}
      onDragEnd={(_event, info) => {
        setIsDragging(false);
        const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
        if (dist <= 4) {
          hasDragged.current = false;
        }

        currentPos.current = {
          x: initialX + info.offset.x,
          y: initialY + info.offset.y,
        }
        onPositionChange(node.id, currentPos.current.x, currentPos.current.y);
      }}
      onClick={(e) => {
        if (!hasDragged.current) {
          onOpen(node.id);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="hover"
    >
      {/* Layer 1 — Glow div */}
      <motion.div
        className="absolute -inset-1/4 rounded-full -z-10"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(24px)',
        }}
        animate={isDragging ? {
          opacity: 0.9,
          scale: 1.3
        } : isHovered ? {
          opacity: 0.85,
          scale: 1.2
        } : {
          opacity: [0.25, 0.55, 0.25],
          scale: [1, 1.12, 1]
        }}
        transition={isDragging ? {
          duration: 0.15
        } : isHovered ? {
          duration: 0.4
        } : {
          duration: 3 + (pulseDelayValue * 0.5),
          ease: 'easeInOut',
          repeat: Infinity,
          delay: pulseDelayValue
        }}
      />

      {/* Layer 2 — SVG blob */}
      <motion.div
        animate={{ scale: isDragging ? 1.1 : isHovered ? 1.07 : 1 }}
        transition={{ duration: isDragging ? 0.15 : 0.4, ease: "easeOut" }}
      >
        <svg
          width={node.size}
          height={node.size}
          viewBox="0 0 100 100"
          className="block drop-shadow-[0_4px_24px_var(--node-shadow)]"
          style={{ '--node-shadow': node.shadow } as React.CSSProperties}
        >
          <defs>
            <radialGradient id={`g${node.id}`} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.82)" />
              <stop offset="45%" stopColor={node.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0.42" />
            </radialGradient>
            <filter id={`f${node.id}`}>
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>
          <path
            d={node.morphPath}
            fill={`url(#g${node.id})`}
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="0.8"
            filter={`url(#f${node.id})`}
            style={{ backdropFilter: 'blur(12px)' }}
          />
          <path
            d={node.morphPath}
            fill="none"
            stroke={node.color}
            strokeWidth="0.4"
            opacity="0.45"
          />
        </svg>
      </motion.div>

      {/* Layer 3 — Label */}
      <motion.div
        className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#5C4D73] tracking-[0.14em] uppercase whitespace-nowrap pointer-events-none"
        animate={{
          opacity: (isHovered || isDragging) ? 1 : 0.5,
          y: (isHovered || isDragging) ? 0 : 6
        }}
        transition={{ duration: 0.3 }}
      >
        {node.label}
      </motion.div>

      {/* Layer 4 — Number */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#5C4D73] opacity-35 pointer-events-none">
        {node.num}
      </div>
    </motion.div>
  );
}
