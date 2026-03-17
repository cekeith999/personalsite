'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { nodes } from '../data/nodes';
import Node from './Node';

function ParallaxNode({ node, index, CX, CY, mouseX, mouseY, onOpen }: { node: any, index: number, CX: number, CY: number, mouseX: any, mouseY: any, onOpen: (id: string) => void }) {
  const depth = [8, 12, 10, 14, 9, 11, 13][index];
  
  const rad = (node.angle * Math.PI) / 180;
  const baseLeft = CX + Math.cos(rad) * node.dist;
  const baseTop = CY + Math.sin(rad) * node.dist;

  // IMPORTANT: Hooks inside mapping need to be used within a stable sub-component.
  // We use useSpring to add a tiny bit of smoothness to the parallax
  const rawPx = useTransform(mouseX, (x: number) => typeof x === 'number' ? x * (depth / 500) : 0);
  const rawPy = useTransform(mouseY, (y: number) => typeof y === 'number' ? y * (depth / 500) : 0);
  
  const px = useSpring(rawPx, { stiffness: 400, damping: 40 });
  const py = useSpring(rawPy, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left: baseLeft,
        top: baseTop,
        x: px,
        y: py,
      }}
    >
      <Node node={node} onOpen={onOpen} />
    </motion.div>
  );
}

export default function NodeCanvas({ onNodeOpen }: { onNodeOpen: (id: string) => void }) {
  const [mounted, setMounted] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);

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
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth <= 768);
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

  // Staggered node depths to give depth-of-field effect
  const nodeDepths = [8, 12, 10, 14, 9, 11, 13];

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
            <p className="font-display italic text-[20px] text-[#3D3050] leading-[1.7]">
              I'm a founder, artist, learner, philosopher — all four, all at once, because that's just who I am. 
              The interesting thing is what happens when you stop trying to pick one lane. The problems and 
              opportunities you find there, nobody else is looking at yet.
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
                <div className="font-mono text-[6px] text-[#8A7AA0] uppercase tracking-wider">Photo</div>
                {/* <img src="/images/clarence.jpg" alt="Clarence" className="w-full h-full object-cover" /> */}
              </div>
            </div>
            <div className="mt-3 font-mono text-sm tracking-[0.25em] uppercase text-[#3D3050]">
              Clarence Keith
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-wider uppercase text-[#8A7AA0]">
              Founder · Artist · Learner · Philosopher
            </div>
          </div>

          {/* Node Cards */}
          <div className="mt-10 flex flex-col gap-3 px-6 max-w-[400px] mx-auto">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => onNodeOpen(node.id)}
                className="rounded-2xl bg-white/60 backdrop-blur-sm p-[16px_20px] flex items-center gap-[14px] cursor-pointer relative overflow-hidden"
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
                    <span className="font-mono text-[9px] text-[#8A7AA0]">{node.num}</span>
                  </div>
                  <div className="font-display text-[18px] text-[#1A1410] leading-none mb-1">
                    {node.label}
                  </div>
                  <div className="font-display text-[13px] italic text-[#8A7AA0] leading-tight">
                    Tap to explore
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className="mt-12 text-center">
            <a href="mailto:clarence@clarencekeith.com" className="font-mono text-[9px] text-[#8A7AA0] tracking-widest uppercase py-8 inline-block">
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
          const rad = (node.angle * Math.PI) / 180;
          const nodeX = CX + Math.cos(rad) * node.dist;
          const nodeY = CY + Math.sin(rad) * node.dist;
          const pathD = `M ${CX} ${CY} Q ${(CX + nodeX) / 2} ${(CY + nodeY) / 2 - 40} ${nodeX} ${nodeY}`;

          return (
            <g key={`line-${node.id}`}>
              <path
                id={`path-${node.id}`}
                d={pathD}
                fill="none"
                stroke={`url(#grad-${node.id})`}
                strokeWidth="1.5"
              />
              <circle r="2" fill={node.color} opacity="0.55">
                <animateMotion
                  dur={`${3 + index * 0.7}s`}
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                  path={pathD}
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
          />
        ))}

        {/* Center Element */}
        <motion.div
          className="absolute top-1/2 left-1/2 flex flex-col items-center pointer-events-auto"
          style={{
            x: finalCenterX,
            y: finalCenterY,
          }}
        >
          {/* Photo Ring wrapper with breathing pulse */}
          <motion.div
            className="w-[120px] h-[120px] rounded-full p-[2px] relative flex items-center justify-center bg-cream shadow-[0_0_40px_rgba(167,139,250,0.3),0_0_80px_rgba(167,139,250,0.12)]"
            style={{
              background: `conic-gradient(from 0deg, #C084FC, #60A5FA, #A78BFA, #E879A0, #C084FC)`
            }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(167,139,250,0.3), 0 0 80px rgba(167,139,250,0.12)',
                '0 0 60px rgba(167,139,250,0.45), 0 0 100px rgba(167,139,250,0.2)',
                '0 0 40px rgba(167,139,250,0.3), 0 0 80px rgba(167,139,250,0.12)'
              ]
            }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          >
            {/* Inner mask for image */}
            <div className="w-full h-full bg-cream rounded-full overflow-hidden flex items-center justify-center relative">
              <div className="font-mono text-[8px] text-[#8A7AA0] uppercase tracking-wider">Your Photo</div>
              {/* <img src="/images/clarence.jpg" alt="Clarence" className="w-full h-full object-cover" /> */}
            </div>
          </motion.div>

          <div className="mt-4 font-mono text-sm tracking-[0.25em] uppercase text-[#3D3050]">
            Clarence Keith
          </div>
          <div className="mt-1 font-mono text-[9px] tracking-wider uppercase text-[#8A7AA0]">
            Founder · Artist · Learner · Philosopher
          </div>
        </motion.div>
      </div>

      {/* 6. Opening Statement */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[680px] text-center px-10 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <p className="font-display italic text-[17px] text-[#3D3050] leading-[1.7]">
          I'm a founder, artist, learner, philosopher — all four, all at once, because that's just who I am. 
          The interesting thing is what happens when you stop trying to pick one lane. The problems and 
          opportunities you find there, nobody else is looking at yet.
        </p>
      </motion.div>

      {/* 7. Top Bar */}
      <motion.div
        className="absolute top-9 left-0 w-full px-11 flex justify-between z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="font-mono text-[9px] text-[#8A7AA0] tracking-widest uppercase">
          clarencekeith.com
        </div>
        <div className="flex gap-6 pointer-events-auto">
          <a href="mailto:clarence@clarencekeith.com" data-cursor="hover" className="font-mono text-[9px] text-[#8A7AA0] tracking-widest uppercase hover:text-[#E8943A] transition-colors">
            Email
          </a>
          <a href="#" data-cursor="hover" className="font-mono text-[9px] text-[#8A7AA0] tracking-widest uppercase hover:text-[#E8943A] transition-colors">
            The Light ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
