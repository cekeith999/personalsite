'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for exact tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use spring for delayed lerp effect (equivalent to ~0.12 lerp factor)
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.8 });

  useEffect(() => {
    document.documentElement.style.cursor = 'none';

    // Disable custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      document.documentElement.style.cursor = 'auto';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, [data-cursor="hover"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.style.cursor = '';
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] origin-center"
        style={{
          width: 10,
          height: 10,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#2D1B6E',
        }}
        animate={{
          scale: isHovering ? 0.6 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] origin-center"
        style={{
          width: 36,
          height: 36,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
        animate={{
          scale: isHovering ? 1.55 : 1,
          borderColor: isHovering ? 'rgba(124,111,224,0.8)' : 'rgba(124,111,224,0.4)',
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </>
  );
}
