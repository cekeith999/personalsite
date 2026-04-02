'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { nodes } from '../data/nodes';
import Node from './Node';

function ParallaxNode({ node, index, CX, CY, mouseX, mouseY, onOpen, onPositionChange }: { node: any, index: number, CX: number, CY: number, mouseX: any, mouseY: any, onOpen: (id: string) => void, onPositionChange: (id: string, x: number, y: number) => void }) {
  const depth = [8, 12, 10, 14, 9, 11, 13][index];
  
  const rad = (node.angle * Math.PI) / 180;
  const initialX = CX + Math.cos(rad) * node.dist;
  const initialY = CY + Math.sin(rad) * node.dist;

  const rawPx = useTransform(mouseX, (x: number) => typeof x === 'number' ? x * (depth / 500) : 0);
  const rawPy = useTransform(mouseY, (y: number) => typeof y === 'number' ? y * (depth / 500) : 0);
  
  const px = useSpring(rawPx, { stiffness: 400, damping: 40 });
  const py = useSpring(rawPy, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x: px,
        y: py,
      }}
    >
      <Node 
        node={node} 
        onOpen={onOpen} 
        initialX={initialX} 
        initialY={initialY} 
        onPositionChange={onPositionChange} 
      />
    </motion.div>
  );
}

const initNodePositions = (cx: number, cy: number) => {
  const positions: Record<string, { x: number; y: number }> = {}
  nodes.forEach(node => {
    const rad = (node.angle * Math.PI) / 180
    positions[node.id] = {
      x: cx + Math.cos(rad) * node.dist,
      y: cy + Math.sin(rad) * node.dist,
    }
  })
  return positions
}

export default function NodeCanvas({ onNodeOpen }: { onNodeOpen: (id: string) => void }) {
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Use the exact pattern requested by the user
  const nodePositions = useRef(initNodePositions(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  ));
  const [lineTick, setLineTick] = useState(0);

  const rafRef = useRef<number | null>(null);

  const handlePositionChange = useCallback((id: string, x: number, y: number) => {
    nodePositions.current[id] = { x, y };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setLineTick(t => t + 1);
        rafRef.current = null;
      });
    }
  }, []);

  // Parallax tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Center element subtle parallax (depth 2)
  const rawCenterX = useTransform(mouseX, (x) => typeof x === 'number' ? x * (2 / 500) : 0);
  const rawCenterY = useTransform(mouseY, (y) => typeof y === 'number' ? y * (2 / 500) : 0);
  
  const centerX = useSpring(rawCenterX, { stiffness: 400, damping: 40 });
  const centerY = useSpring(rawCenterY, { stiffness: 400, damping: 40 });

  const finalCenterX = useTransform(centerX, x => `calc(-50% + ${x}px)`);
  const finalCenterY = useTransform(centerY, y => `calc(-50% + ${y}px)`);

  useEffect(() => {
    setMounted(true);
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    setIsMobile(window.innerWidth <= 768);
    nodePositions.current = initNodePositions(cx, cy);
    setLineTick(t => t + 1);

    const handleResize = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth <= 768);
      // Re-initialize positions on resize
      nodePositions.current = initNodePositions(cx, cy);
      setLineTick(t => t + 1);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const CX = windowSize.w / 2;
  const CY = windowSize.h / 2;

  if (isMobile) {
    return (
      <motion.div
        className="fixed inset-0 overflow-y-auto overflow-x-hidden min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(248,196,120,0.45) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 85% 75%, rgba(200,222,255,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(253,240,220,0.6) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 75% 15%, rgba(192,132,252,0.12) 0%, transparent 50%),
            var(--cream)
          `,
          backgroundSize: '110% 110%',
        }}
      >
        <svg className="fixed inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay">
          <filter id="grain-mobile">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-mobile)" />
        </svg>

        <div className="relative z-10 w-full pb-20">
          {/* Opening Statement */}
          <div className="px-8 pt-16 pb-8 text-center">
            <p className="font-display italic text-[20px] text-[#251C33] leading-[1.7]">
              I've never been able to accept a box. Not because I'm restless — because the box has never made sense to me. I can learn. I can think. I can build. The only real limits are what I care enough about to go deep on. That's why I'm a founder, artist, learner, philosopher all at once. And it turns out — the overlap between those things is where the most interesting problems are hiding.
            </p>
          </div>

          {/* Center Element */}
          <div className="flex flex-col items-center mt-4">
            <div
              className="w-[80px] h-[80px] rounded-full p-[2px] relative flex items-center justify-center bg-cream shadow-[0_0_30px_rgba(167,139,250,0.25)]"
              style={{
                background: `conic-gradient(from 0deg, #C084FC, #60A5FA, #A78BFA, #E879A0, #C084FC)`
              }}
            >
              <div className="w-full h-full bg-cream rounded-full overflow-hidden flex items-center justify-center relative">
                <img src="/images/Mehead.webp" alt="Clarence" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="mt-3 font-mono text-sm tracking-[0.25em] uppercase text-[#251C33]">
              Clarence Keith
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-wider uppercase text-[#5C4D73]">
              Founder · Artist · Learner · Philosopher
            </div>
          </div>

          {/* Node Cards */}
          <div className="mt-10 flex flex-col gap-3 px-6 max-w-[400px] mx-auto">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => onNodeOpen(node.id)}
                className="rounded-2xl bg-white/75 backdrop-blur-sm p-[16px_20px] flex items-center gap-[14px] cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0" style={{ backgroundColor: node.color, opacity: 0.06 }} />
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: node.color }} />
                
                <div className="w-[40px] h-[40px] relative z-10 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d={node.morphPath} fill={node.color} fillOpacity="0.3" />
                  </svg>
                </div>
                
                <div className="flex flex-col relative z-10">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[9px] text-[#5C4D73]">{node.num}</span>
                  </div>
                  <div className="font-display text-[18px] text-[#1A1410] leading-none mb-1">
                    {node.label}
                  </div>
                  <div className="font-display text-[13px] italic text-[#5C4D73] leading-tight">
                    {node.shortDesc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className="mt-12 text-center pb-8">
            <a href="mailto:clarence@clarencekeith.com" className="font-mono text-[9px] text-[#5C4D73] tracking-widest uppercase py-8 inline-block">
              Email
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.6 }}
    >
      {/* 1. Background Gradient & Grain */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(248,196,120,0.45) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 85% 75%, rgba(200,222,255,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(253,240,220,0.6) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 75% 15%, rgba(192,132,252,0.12) 0%, transparent 50%),
            var(--cream)
          `,
          backgroundSize: '110% 110%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* SVG Grain Filter Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </motion.div>

      {/* 2. SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          {nodes.map((node) => (
            <linearGradient key={`grad-${node.id}`} id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(167,139,250,0.25)" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0.12" />
            </linearGradient>
          ))}
        </defs>
        {nodes.map((node, index) => {
          const pos = nodePositions.current[node.id];
          if (!pos) return null;

          const cx = CX;
          const cy = CY;
          const nx = pos.x;
          const ny = pos.y;

          // Midpoint with slight curve offset
          const mx = (cx + nx) / 2 + (Math.sin(node.angle * Math.PI / 180) * 30);
          const my = (cy + ny) / 2 - (Math.cos(node.angle * Math.PI / 180) * 30);

          const pathD = `M ${cx} ${cy} Q ${mx} ${my} ${nx} ${ny}`;

          // Pass lineTick to force re-render when tracking positions change
          return (
            <g key={`line-${node.id}-${lineTick}`}>
              <path
                id={`path-${node.id}`}
                d={pathD}
                fill="none"
                stroke={`url(#grad-${node.id})`}
                strokeWidth="1.5"
              />
              <circle r="2" fill={node.color} opacity="0">
                <animateMotion
                  dur={`${3 + index * 0.7}s`}
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                  path={pathD}
                />
                <animate 
                  attributeName="opacity" 
                  keyTimes="0;0.1;0.7;1" 
                  values="0;0.65;0.65;0" 
                  dur={`${3 + index * 0.7}s`}
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* 3. Parallax Layer Container */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* Nodes */}
        {nodes.map((node, i) => (
          <ParallaxNode
            key={node.id}
            node={node}
            index={i}
            CX={CX}
            CY={CY}
            mouseX={mouseX}
            mouseY={mouseY}
            onOpen={onNodeOpen}
            onPositionChange={handlePositionChange}
          />
        ))}

        {/* Center Element */}
        <motion.div
          className="absolute top-1/2 left-1/2 flex flex-col items-center pointer-events-none"
          style={{
            x: finalCenterX,
            y: finalCenterY,
          }}
        >
          {/* Breathing Glow Layer */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10"
            style={{
              width: '220px',
              height: '220px',
              background: 'radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(192,200,255,0.2) 40%, transparent 70%)',
              filter: 'blur(28px)',
            }}
            animate={{
              scale: [1, 1.18, 0.95, 1.12, 1],
              opacity: [0.5, 0.85, 0.4, 0.75, 0.5],
            }}
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.3, 0.55, 0.75, 1],
            }}
          />

          {/* Photo Ring wrapper with breathing pulse */}
          <motion.div
            className="w-[120px] h-[120px] rounded-full p-[2px] relative flex items-center justify-center bg-cream"
            style={{
              background: `conic-gradient(from 0deg, #C084FC, #60A5FA, #A78BFA, #E879A0, #C084FC)`
            }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(167,139,250,0.3), 0 0 80px rgba(167,139,250,0.12)',
                '0 0 65px rgba(167,139,250,0.55), 0 0 130px rgba(167,139,250,0.25)',
                '0 0 30px rgba(167,139,250,0.2), 0 0 60px rgba(167,139,250,0.08)',
                '0 0 55px rgba(167,139,250,0.45), 0 0 110px rgba(167,139,250,0.2)',
                '0 0 40px rgba(167,139,250,0.3), 0 0 80px rgba(167,139,250,0.12)',
              ]
            }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, times: [0,0.3,0.55,0.75,1] }}
          >
            {/* Inner mask for image */}
            <div className="w-full h-full bg-cream rounded-full overflow-hidden flex items-center justify-center relative">
              <img src="/images/clarence.webp" alt="Clarence" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <div className="mt-4 font-mono text-sm tracking-[0.25em] uppercase text-[#251C33]">
            Clarence Keith
          </div>
          <div className="mt-1 font-mono text-[9px] tracking-wider uppercase text-[#5C4D73]">
            Founder · Artist · Learner · Philosopher
          </div>
        </motion.div>
      </div>

      {/* 6. Opening Statement */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[720px] text-center px-6 z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <p className="font-display italic text-[17px] text-[#251C33] leading-[1.7]">
          I've never been able to accept a box. Not because I'm restless — because the box has never made sense to me. I can learn. I can think. I can build. The only real limits are what I care enough about to go deep on. That's why I'm a founder, artist, learner, philosopher all at once. And it turns out — the overlap between those things is where the most interesting problems are hiding.
        </p>
      </motion.div>

      {/* 7. Top Bar */}
      <motion.div
        className="absolute top-9 left-0 w-full px-11 flex justify-between z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="font-mono text-[9px] text-[#5C4D73] tracking-widest uppercase">
          clarencekeith.com
        </div>
        <div className="flex gap-6 pointer-events-auto">
          <a href="mailto:clarence@clarencekeith.com" data-cursor="hover" className="font-mono text-[9px] text-[#5C4D73] tracking-widest uppercase hover:text-[#E8943A] transition-colors duration-300">
            Email
          </a>
          <a href="#" data-cursor="hover" className="font-mono text-[9px] text-[#5C4D73] tracking-widest uppercase hover:text-[#E8943A] transition-colors duration-300">
            The Light ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
