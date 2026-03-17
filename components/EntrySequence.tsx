'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntrySequenceProps {
  onComplete?: () => void;
}

const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; left: number; size: number; duration: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ['#C084FC', '#60A5FA', '#E879A0', '#A78BFA', '#F0C8F0'];
    
    // Generate 18 random particles
    const p = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80, // 10% to 90% of viewport width
      size: Math.random() * 2 + 2, // 2px to 4px
      duration: Math.random() * 4 + 5, // 5s to 9s
      delay: Math.random() * 2, // 0s to 2s stagger
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(p);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: '80vh', opacity: 0 }}
          animate={{
            y: ['80vh', '-10vh'],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default function EntrySequence({ onComplete }: EntrySequenceProps) {
  const [phase, setPhase] = useState<'intro' | 'hold' | 'outro'>('intro');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setPhase('hold');
    }, 1200);

    const outroTimer = setTimeout(() => {
      setPhase('outro');
    }, 3600);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 5000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outroTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center pointer-events-none"
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
            opacity: phase === 'outro' ? 0 : 1,
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            opacity: { duration: 1.4, ease: [0.4, 0, 1, 1] },
            backgroundPosition: { duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
          }}
          exit={{ opacity: 0 }}
        >
          
          <Particles />

          <motion.div
            className="flex flex-col items-center relative z-20 font-display font-light text-[clamp(72px,14vw,180px)] leading-[0.9] tracking-[-0.04em] text-[#2D1B6E]"
            animate={
              phase === 'outro'
                ? { opacity: 0, scale: 1.3, y: -30, filter: 'blur(20px)' }
                : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={
              phase === 'outro'
                ? { duration: 1.2, ease: [0.4, 0, 1, 1] }
                : { duration: 0 }
            }
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={phase === 'intro' || phase === 'hold' ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Build
            </motion.span>
            
            <motion.span
              className="block italic opacity-70"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={phase === 'intro' || phase === 'hold' ? { opacity: 0.72, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              the World
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
