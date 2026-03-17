'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NodeData } from '../data/nodes';

export default function Node({ node, onOpen }: { node: NodeData; onOpen: (id: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  // Convert hex color to rgba for the 50% opacity string
  // If it's already an rgba string, we just use it, but context says color is a hex
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
      className="relative -translate-x-1/2 -translate-y-1/2 cursor-none"
      onClick={() => onOpen(node.id)}
      data-cursor="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1 — Glow div */}
      <motion.div
        className="absolute -inset-1/4 rounded-full -z-10"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(24px)',
        }}
        animate={isHovered ? {
          opacity: 0.85,
          scale: 1.2
        } : {
          opacity: [0.25, 0.55, 0.25],
          scale: [1, 1.12, 1]
        }}
        transition={isHovered ? {
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
        animate={{ scale: isHovered ? 1.07 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
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
        className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#8A7AA0] tracking-[0.14em] uppercase whitespace-nowrap pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0.5,
          y: isHovered ? 0 : 6
        }}
        transition={{ duration: 0.3 }}
      >
        {node.label}
      </motion.div>

      {/* Layer 4 — Number */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#8A7AA0] opacity-35 pointer-events-none">
        {node.num}
      </div>
    </motion.div>
  );
}
