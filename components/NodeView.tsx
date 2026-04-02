'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { nodes } from '../data/nodes';

interface NodeViewProps {
  nodeId: string | null;
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const, staggerChildren: 0.08, delayChildren: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function NodeView({ nodeId, onClose }: NodeViewProps) {
  const node = nodes.find(n => n.id === nodeId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          className="fixed inset-0 z-[800] overflow-y-auto overflow-x-hidden cursor-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            // Close if clicking the backdrop itself
            if (e.target === e.currentTarget) onClose();
          }}
          style={{ backgroundColor: '#F8F4FF' }}
        >
          {/* Background Overlay */}
          {node.id === 'thinking' ? (
            <motion.div 
              className="fixed inset-0 -z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, #C084FC, #F472B6, #FB923C, #60A5FA, #C084FC)',
                backgroundSize: '300% 300%'
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            >
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.62)' }} />
            </motion.div>
          ) : (
            <div 
              className="fixed inset-0 -z-10 pointer-events-none"
              style={{ background: node.bgGrad }}
            />
          )}

          {/* Back Button */}
          <div
            onClick={onClose}
            data-cursor="hover"
            className="fixed top-5 md:top-10 left-5 md:left-12 font-mono text-[9px] text-[#5C4D73] tracking-[0.14em] uppercase md:cursor-none cursor-pointer flex items-center gap-[10px] opacity-60 transition-all duration-200 z-10 hover:opacity-100 before:content-[''] before:w-6 before:h-px before:bg-current"
            style={{ '--hover-color': node.color } as any}
            onMouseEnter={(e) => e.currentTarget.style.color = node.color}
            onMouseLeave={(e) => e.currentTarget.style.color = '#5C4D73'}
          >
            Back
          </div>

          {/* Content Wrapper */}
          <div className="w-full max-w-[800px] mx-auto pt-[60px] md:pt-[100px] px-[24px] md:px-[60px] pb-[80px] md:pb-[120px] pointer-events-none">
            <div className="pointer-events-auto">
              {/* Section Tag */}
              <motion.div variants={itemVariants} className="font-mono text-[9px] text-[#5C4D73] tracking-[0.2em] uppercase mb-7 opacity-70">
                {node.content.sectionTag}
              </motion.div>

              {/* Title */}
              <motion.h2 variants={itemVariants} className="font-display text-[clamp(52px,7vw,96px)] font-light leading-[0.88] tracking-[-0.03em] mb-12 pb-10 border-b border-[#1A1410]/10 text-[#1A1410]">
                {node.content.titleFirst}<br />
                {node.id === 'thinking' ? (
                  <motion.em 
                    className="italic inline-block"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #C084FC, #F472B6, #FB923C, #60A5FA, #C084FC)',
                      backgroundSize: '300% 300%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: 'transparent'
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  >
                    {node.content.titleEm}
                  </motion.em>
                ) : (
                  <em className="italic" style={{ color: node.color }}>{node.content.titleEm}</em>
                )}
              </motion.h2>

              {/* Paragraphs */}
              {node.content.paragraphs && (
                <div className={`text-[18px] font-light leading-[1.85] max-w-[620px] mb-8 ${node.id === 'thinking' ? 'text-[#F5F0FF]' : 'text-[#251C1A]'}`}>
                  {node.content.paragraphs.map((p, i) => (
                    <motion.p key={i} variants={itemVariants} className={i > 0 ? "mt-6" : ""}>
                      {/* Very simple markdown parser for *italics* just for the word The Light */}
                      {p.split('*').map((part, j) => j % 2 === 1 ? <em key={j} className={`italic ${node.id === 'thinking' ? 'text-white' : 'text-[#1A1410]'}`}>{part}</em> : part)}
                    </motion.p>
                  ))}
                </div>
              )}

              {/* Demo Video (Building node) */}
              {node.id === 'building' && (
                <motion.div variants={itemVariants} className="mb-10 max-w-[620px]">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#0e0e0b] border border-[#7C6FE0]/20 flex flex-col items-center justify-center relative">
                    {node.videoUrl ? (
                      <video 
                        src={node.videoUrl}
                        className="w-full h-full object-cover border-none"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                      />
                    ) : (
                      <>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#7C6FE0]">
                          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                        <div className="font-mono text-[10px] text-[#5C4D73] mt-3 uppercase tracking-wider">
                          Demo Coming Soon
                        </div>
                      </>
                    )}
                  </div>
                  <div className="font-mono text-[9px] text-[#5C4D73] mt-3 uppercase tracking-widest text-center">
                    Nalana — voice to production-ready 3D
                  </div>
                </motion.div>
              )}

              {/* Items (Made node) */}
              {node.content.items && (
                <div className="mb-8">
                  {node.content.items.map((item, i) => (
                    <motion.div key={i} variants={itemVariants} className="py-7 border-b border-[#1A1410]/5 grid grid-cols-[200px_1fr] gap-6 items-start">
                      <div className="font-mono text-[10px] text-[#5C4D73] tracking-[0.1em] uppercase pt-1">
                        {item.label}
                      </div>
                      <div className="w-full overflow-hidden">
                        <div className="text-[20px] font-normal text-[#1A1410] mb-1.5 tracking-[-0.01em]">
                          {item.title}
                        </div>
                        <div className="text-[14px] italic text-[#5C4D73] leading-[1.7]">
                          {item.desc}
                        </div>
                        {item.images && item.images.length > 0 && (
                          <div className="mt-5 flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
                            {item.images.map((img, imgIdx) => (
                              <div key={imgIdx} className="relative w-[160px] h-[100px] flex-shrink-0 snap-start overflow-hidden rounded-lg bg-[#1A1410]/5">
                                <Image
                                  src={img.src}
                                  alt={img.alt || item.title}
                                  fill
                                  sizes="160px"
                                  style={{ objectFit: 'cover' }}
                                  loading="lazy"
                                  onClick={() => setSelectedImage(img.src)}
                                  className="cursor-pointer hover:opacity-90 transition-opacity"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* People (Network node) */}
              {node.content.people && (
                <div className="mb-8">
                  {node.content.people.map((person, i) => (
                    <motion.div key={i} variants={itemVariants} className="mb-8">
                      {person.image && (
                        <div className="mb-4">
                          <Image
                            src={person.image}
                            alt={person.name}
                            width={80}
                            height={80}
                            style={{ borderRadius: '50%' }}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="text-[20px] font-normal text-[#1A1410] mb-1">
                        {person.name}
                      </div>
                      <div className="font-mono text-[10px] tracking-wide uppercase mb-2" style={{ color: node.color }}>
                        {person.role}
                      </div>
                      <div className="text-[15px] italic text-[#5C4D73] leading-[1.7] max-w-[600px]">
                        {person.desc}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Network Note */}
              {node.content.networkNote && (
                <motion.div variants={itemVariants} className="mt-10 text-[15px] italic text-[#5C4D73] leading-[1.8] max-w-[620px]">
                  {node.content.networkNote}
                </motion.div>
              )}

              {/* Thoughts */}
              {node.content.thoughts && (
                <div className="mb-8">
                  {node.content.thoughts.map((thought, i) => (
                    <motion.div key={i} variants={itemVariants} className="text-[19px] font-light italic leading-[1.8] text-[#251C1A] mb-8 max-w-[620px]">
                      {thought.split('*').map((part, j) => j % 2 === 1 ? <em key={j} className="font-normal not-italic">{part}</em> : part)}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Invitation */}
              {node.content.showInvitation && (
                <motion.div variants={itemVariants} className="mt-[52px] pt-10 border-t border-[#1A1410]/5">
                  <div className="font-mono text-[9px] text-[#5C4D73] tracking-[0.2em] uppercase mb-5">
                    The Invitation
                  </div>
                  <div className="text-[19px] font-light leading-[1.8] text-[#251C1A] mb-6 max-w-[620px]">
                    If something here resonates — the work, the thinking, the questions — I want to hear from you.
                  </div>
                  <a 
                    href="mailto:clarence@clarencekeith.com" 
                    data-cursor="hover"
                    className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#E8943A] border-b border-[#E8943A] pb-0.5 hover:opacity-80 transition-opacity inline-block cursor-none"
                  >
                    clarence@clarencekeith.com
                  </a>
                </motion.div>
              )}

              {/* Stats */}
              {node.content.stats && (
                <motion.div variants={itemVariants} className="flex flex-wrap gap-[52px] mt-14 pt-10 border-t border-[#1A1410]/5">
                  {node.content.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="font-display text-[36px] font-thin text-[#1A1410] leading-none mb-2">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[9px] text-[#5C4D73] tracking-widest uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#1A1410]/90 p-4 md:p-10 backdrop-blur-sm cursor-pointer"
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
              <Image
                src={selectedImage}
                alt="Expanded view"
                fill
                style={{ objectFit: 'contain' }}
                quality={100}
                className="drop-shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
