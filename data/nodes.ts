import React from 'react';

export interface NodeData {
  id: string;
  label: string;
  num: string;
  color: string;
  colorSoft: string;
  shadow: string;
  angle: number;
  dist: number;
  size: number;
  morphPath: string;
  bgGrad: string;
  pulseDelay?: number;
  videoUrl?: string;
  shortDesc: string;
  content: {
    sectionTag: string;
    titleFirst: string;
    titleEm: string;
    paragraphs?: string[];
    stats?: { value: string; label: string }[];
    items?: { label: string; title: string; desc: string }[];
    people?: { name: string; role: string; desc: string }[];
    networkNote?: string;
    thoughts?: string[];
    showInvitation?: boolean;
  };
}

export const nodes: NodeData[] = [
  {
    id: 'building',
    label: 'What I\'m Building',
    num: '01',
    color: '#E8943A',
    colorSoft: 'rgba(232,148,58,0.18)',
    shadow: 'rgba(232,148,58,0.4)',
    angle: -30, dist: 240,
    size: 88,
    morphPath: 'M50,8 C72,6 88,22 90,42 C93,62 80,80 60,86 C40,93 18,82 10,62 C2,42 10,20 28,11 C36,6 42,9 50,8Z',
    bgGrad: `linear-gradient(135deg, #FDF0DC 0%, #FAF6EE 100%)`,
    pulseDelay: 0,
    videoUrl: '/videos/nalana-demo.mp4',
    shortDesc: 'Voice-controlled 3D design tool',
    content: {
      sectionTag: '01 — Currently Building',
      titleFirst: 'What I\'m',
      titleEm: 'Building',
      paragraphs: [
        'Nalana is a design tool that lets you build cars, phones, furniture, architecture — anything — just by speaking. You describe it. It builds it in 3D, production-ready, immediately usable in any professional pipeline.',
        'I have seven years of 3D design experience. Deep expertise. And I still kept hitting the same wall — ideas that were completely clear in my head that the tools couldn\'t keep up with. Sometimes the geometry broke downstream. Sometimes I was spending more time fighting the software than actually designing. Sometimes the idea just never made it out. That friction is the problem Nalana solves.',
        'Most AI 3D tools generate geometry from scratch. It looks right until an engineer or designer actually tries to use it. Nalana is built as a soft fork of Blender, using Blender\'s native operations and modifiers. Every object it creates is clean, editable, and pipeline-compatible from day one. It doesn\'t just generate — it builds the way a professional would.',
        'The model learns from the people who use it. The longer you work with Nalana, the more it understands your design language — your proportions, your instincts, your preferences. That understanding compounds. Switching costs grow. The moat builds itself.',
        'I\'ve spoken directly with Eric Bruckbauer, Director of Innovation Footwear Material Design at Nike, and Adam Thuss, Computational Design Director at Nike Innovation Kitchen. The problem is real at every level of the industry — from students trying to get ideas out of their heads to the people designing what Nike makes next. The tools don\'t move fast enough. They don\'t stay usable. Nalana fixes that.'
      ],
      stats: [
        { value: 'Nike Innovation', label: 'Validated' },
        { value: 'Top 8', label: 'USC NVSC' },
        { value: '2025', label: 'Founded' }
      ]
    }
  },
  {
    id: 'thinking',
    label: 'How I Think',
    num: '02',
    color: '#C084FC',
    colorSoft: 'rgba(192,132,252,0.15)',
    shadow: 'rgba(192,132,252,0.35)',
    angle: 0, dist: 280,
    size: 80,
    morphPath: 'M52,6 C70,4 88,18 92,38 C96,60 84,82 64,88 C44,95 20,84 10,64 C0,44 8,18 28,9 C38,4 44,7 52,6Z',
    bgGrad: `linear-gradient(135deg, #F8F0FF 0%, #EEE8FF 100%)`,
    pulseDelay: 0.4,
    shortDesc: 'Everything starts with understanding why — not just that.',
    content: {
      sectionTag: '02 — Thinking',
      titleFirst: 'How I',
      titleEm: 'Think',
      paragraphs: [
        'Everything starts with understanding why — not just that. Why does this work? Why does this feel right? Why does this company have staying power when that one doesn\'t? I keep a style journal — over 200 entries — not to document taste but to interrogate it. Most people know what they like. I want to know why I like it. That practice transfers to everything.',
        'I\'ve noticed something recently. My ideas are coming in more technical than expressive. My artistic output has slowed. I\'m thinking more about systems and company building than about pure creation. I heard Kanye talk about how childlike creativity gets crowded by grown thoughts — and those bars hit me for the first time because I\'m living a version of that. I\'m aware of the shift. I\'m watching it. That kind of self-awareness is something I think about as a practice, not an accident.',
        'I sit at the overlap of technical fluency, societal intuition, and taste. Most people develop one. I think the people who develop all three are about to matter a lot more than they did before. I write about what\'s in that overlap in The Light.'
      ]
    }
  },
  {
    id: 'made',
    label: 'What I\'ve Made',
    num: '03',
    color: '#FB923C',
    colorSoft: 'rgba(251,146,60,0.15)',
    shadow: 'rgba(251,146,60,0.35)',
    angle: 45, dist: 280,
    size: 84,
    morphPath: 'M48,5 C68,3 90,16 93,38 C96,60 82,84 60,90 C38,96 14,82 7,60 C0,38 12,14 32,7 C38,4 42,6 48,5Z',
    bgGrad: `linear-gradient(135deg, #FFF4EE 0%, #FEF0E6 100%)`,
    pulseDelay: 0.8,
    shortDesc: 'Everything I\'ve built has fed the next thing.',
    content: {
      sectionTag: '03 — Work',
      titleFirst: 'What I\'ve',
      titleEm: 'Made',
      paragraphs: [
        'Everything I\'ve built has fed the next thing. I didn\'t always know it in the moment — but looking back, the thread is always there.',
        'Sidian taught me how shoes are actually designed. The tolerances, the geometry, the way a last translates into a wearable object. I designed and produced six wearable pairs from scratch. That knowledge lives inside Nalana now — I\'m not building a tool for a problem I read about. I\'m building a tool for a process I know intimately.'
      ],
      items: [
        { label: '2025–Present', title: 'Nalana', desc: 'Voice-controlled 3D design tool. Production-ready geometry. Built on Blender. Interest from Nike Innovation, USC NVSC quarterfinals.' },
        { label: '2025', title: 'Sidian', desc: 'A complete line of 3D printed shoes. Designed, modeled, printed, and worn. Six pairs. Every step done by hand. The most important thing I\'ve built for understanding what Nalana needs to be.' },
        { label: '2024-2025', title: 'Honda Innovation', desc: 'Speculative vehicle concept design inside one of the world\'s most recognized industrial design organizations. Junior designer. Real constraints, real process.' },
        { label: '2023–2024', title: 'MATTE Projects', desc: 'Retail displays and product visualizations for Cartier, Macallan, Vans. The first time my work existed in rooms I wasn\'t in.' },
        { label: '2025', title: 'FSF National Case Study', desc: 'Won nationally. A 21-slide strategy reimagining Adidas\' product ecosystem through AI wearables and cross-category storytelling. Named a Virgil Abloh "Post-Modern" Scholar.' },
        { label: '2024', title: 'Google Makeathon', desc: 'Won. Built something that worked under pressure with people I\'d never met before.' },
        { label: '2025', title: 'Faith in MDVS', desc: 'Cactus Jack Design Competition entry. Oversized leather muscle tee. Spiritual expression and intentional mark-making.' }
      ]
    }
  },
  {
    id: 'work',
    label: 'How I Work',
    num: '04',
    color: '#F59E0B',
    colorSoft: 'rgba(245,158,11,0.15)',
    shadow: 'rgba(245,158,11,0.35)',
    angle: 135, dist: 280,
    size: 76,
    morphPath: 'M50,7 C70,5 88,20 91,42 C94,64 80,84 58,89 C36,94 14,80 8,58 C2,36 14,14 34,8 C40,5 44,8 50,7Z',
    bgGrad: `linear-gradient(135deg, #FFFBF0 0%, #FEF9E7 100%)`,
    pulseDelay: 1.2,
    shortDesc: 'I start every problem the same way — I ask questions until I can visualize it.',
    content: {
      sectionTag: '04 — Process',
      titleFirst: 'How I',
      titleEm: 'Work',
      paragraphs: [
        'I start every problem the same way — I ask questions until I can visualize it. To me, understanding means being able to see a problem in my head and explain it in the language of any field it touches. Once I can visualize it, the solution usually follows. Either it comes on its own or I research until I find the one that fits, and then I move.',
        'I keep two journals. A style journal — over 200 entries — where I write about why something works, not just that it works. Understanding the why behind taste is what builds taste that compounds. The second is a startup journal, where I track ideas, reactions to other companies, what I\'d do differently. Same practice, different domain. I\'m always trying to understand the world, not just observe it.',
        'I\'ve lost pitch competitions. Had demos break. Walked away from hackathons without winning. I don\'t experience those as failures for very long — I move too fast to sit in it. What I do is study exactly what the gap was. After one pitch competition the judges told me directly: clearer communication, stronger traction. I looked at the pitches that advanced and they were right. I\'m a different pitcher now because of that specific feedback. The hackathon taught me something else — I was compromising my ideas to incorporate others\', and after seeing what won, my original instincts were right. I learned to trust my own judgment more, not less.',
        'I work best slightly over my head — intentionally. The projects that changed me the most were the ones where I had to become a different person to finish them.'
      ]
    }
  },
  {
    id: 'origin',
    label: 'Where I\'m From',
    num: '05',
    color: '#84CC16',
    colorSoft: 'rgba(132,204,22,0.1)',
    shadow: 'rgba(132,204,22,0.25)',
    angle: 180, dist: 260,
    size: 72,
    morphPath: 'M52,8 C72,6 90,22 92,44 C94,66 78,86 56,90 C34,94 12,80 7,58 C2,36 16,12 38,7 C44,5 48,9 52,8Z',
    bgGrad: `linear-gradient(135deg, #F8FEF0 0%, #F4FCE8 100%)`,
    pulseDelay: 1.6,
    shortDesc: 'I\'m from Chicago. I\'ve always guided my own ship.',
    content: {
      sectionTag: '05 — Origin',
      titleFirst: 'Where I\'m',
      titleEm: 'From',
      paragraphs: [
        'I\'m from Chicago. I grew up observant — borderline analytical about everything around me. Creative, technical, athletic. Always more than one thing at once and never able to explain why that was a problem.',
        'My dad is a real estate entrepreneur. He installed one belief in me early: I am the owner, not the worker. Whatever I build, I run it. That landed somewhere deep. When my friends stress about internships or where they\'re going to work, it doesn\'t register the same way for me. Building Nalana doesn\'t feel like a risk. It feels like the only natural thing.',
        'He also guided me toward guiding my own ship. I remember people commenting in high school that I seemed to know where I was going. I did. I knew what resonated and what didn\'t. That clarity has never been about having all the answers — it\'s about knowing which direction to move in and trusting it. I\'m still doing that.',
        'I ended up at USC\'s Iovine and Young Academy after Emory, then USC Marshall. The path wasn\'t linear — it was searching. What I found at IYA wasn\'t just the right program. It was permission. Permission to be all of the things I am at the same time and have that be the point, not a problem.',
        'I\'m graduating in 2027. I\'m building Nalana now. I\'m not waiting.'
      ],
      stats: [
        { value: '2027', label: 'Graduating' },
        { value: 'IYA', label: 'USC Los Angeles' },
        { value: 'Chicago', label: 'Origin' }
      ]
    }
  },
  {
    id: 'network',
    label: 'Who\'s In My Corner',
    num: '06',
    color: '#60A5FA',
    colorSoft: 'rgba(96,165,250,0.15)',
    shadow: 'rgba(96,165,250,0.3)',
    angle: 240, dist: 250,
    size: 80,
    morphPath: 'M50,6 C70,4 90,18 93,40 C96,62 82,84 60,90 C38,96 12,82 7,60 C2,38 14,14 36,7 C42,4 44,7 50,6Z',
    bgGrad: `linear-gradient(135deg, #EEF6FF 0%, #E8F2FF 100%)`,
    pulseDelay: 2.0,
    shortDesc: 'The people around me aren\'t decorations. They\'re active inputs.',
    content: {
      sectionTag: '06 — Network',
      titleFirst: 'Who\'s In My',
      titleEm: 'Corner',
      paragraphs: [
        'The people around me aren\'t decorations. They\'re active inputs into how I think and what I build.'
      ],
      people: [
        { name: 'Matthew Rowean', role: 'Founder, MATTE Projects', desc: 'He came from a creative background and built a company that produces real work for real clients at scale. I\'ve talked to him a lot about the tension between creative identity and company building — and those conversations hit differently now that I\'m living that tension myself. When I was in a period where I wasn\'t executing my ideas to the extent I wanted to, he told me to just do it. Simple. But it reignited something. He\'s going to be an important one as Nalana grows.' },
        { name: 'Adam Hiler', role: 'Senior Director of 3D Excellence, Jordan Brand', desc: 'He operates at the highest level of 3D design in the industry and chose to advise Nalana. That means something. He understands exactly what the tool needs to be.' },
        { name: 'Aven Wright', role: 'Senior Manager, Jordan Brand Global', desc: 'My FSF mentor. He\'s shown me what it looks like to lead with taste inside a massive institution without losing the taste.' },
        { name: 'Eric Quick', role: 'CEO of Caffree, IYA Alum, Lecturer', desc: 'The clearest thinker I know about what it actually takes to build a company from a creative practice. Every conversation recalibrates something.' },
        { name: 'Ghadi Nehme', role: 'MIT DeCoDE Lab', desc: 'The bridge between where AI and design research is heading academically and where Nalana is going practically.' }
      ],
      networkNote: 'These aren\'t people I name-drop. They\'re people who have given me real time, real feedback, and real belief. That\'s a different thing.'
    }
  },
  {
    id: 'thoughts',
    label: 'What I\'m Thinking About',
    num: '07',
    color: '#F472B6',
    colorSoft: 'rgba(244,114,182,0.12)',
    shadow: 'rgba(244,114,182,0.3)',
    angle: 280, dist: 250,
    size: 78,
    morphPath: 'M54,7 C74,5 92,20 93,42 C94,64 78,86 56,91 C34,96 10,82 6,60 C2,38 16,12 38,7 C44,5 50,8 54,7Z',
    bgGrad: `linear-gradient(135deg, #FFF0F8 0%, #FEE8F4 100%)`,
    pulseDelay: 2.4,
    shortDesc: 'The gap between what humans can imagine and what they can build is about to close permanently.',
    content: {
      sectionTag: '07 — Current Thinking',
      titleFirst: 'What I\'m',
      titleEm: 'Thinking About',
      thoughts: [
        'The gap between what humans can imagine and what they can build is about to close permanently. That\'s the thesis. 3D is the layer that makes it possible — because 3D is how the physical world actually works. Not a representation of it. The thing itself, simulated. Once you can simulate anything in 3D, you can train on it, test it, iterate on it, understand it before it exists. Medicine. Manufacturing. Architecture. Aerospace. Nalana is one entry point. The underlying shift is much larger.',
        'I\'m also thinking about what it means to build a creative practice that compounds. Every project should make the next one harder to replicate — richer, more distinctly yours, more impossible to separate from who you are. I\'m early in that. But I can feel it starting.',
        'The question I keep coming back to — the one I write about in The Light and still don\'t have the answer to — is how to create something truly new. Not novel. Not original. New. In an era when generation is cheap and everything references something else, what does it actually take to make something that didn\'t exist before you made it? I don\'t know yet. But I think the answer matters more now than it ever has.'
      ],
      showInvitation: true
    }
  }
];
