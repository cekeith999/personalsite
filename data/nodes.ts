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
    content: {
      sectionTag: '01 — Currently Building',
      titleFirst: 'What I\'m',
      titleEm: 'Building',
      paragraphs: [
        'Nalana is a design tool that lets you build cars, phones, furniture, architecture — anything — just by speaking. You describe what you want. It builds it in 3D, production-ready, immediately usable in any professional pipeline.',
        'Most AI 3D tools generate geometry from scratch. The output looks right but breaks the moment an engineer or designer tries to use it. Nalana is built as a soft fork of Blender, using Blender\'s native operations and modifiers under the hood. Every object it creates is clean, editable, and pipeline-compatible from day one.',
        'The people who use it daily are the ones it learns from. The longer you work with Nalana, the more it understands your design language — your proportions, your aesthetic instincts, your preferences. This builds a moat of switching costs compounding over time.',
        'I\'m uniquely positioned to build this. I\'m a designer who understands 3D pipelines from the inside — a practitioner who lived the problem, then built the solution.'
      ],
      stats: [
        { value: 'Nike', label: 'Innovation Interest' },
        { value: 'Top 8', label: 'USC NVSC' },
        { value: '2024', label: 'Founded' }
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
    content: {
      sectionTag: '02 — Thinking',
      titleFirst: 'How I',
      titleEm: 'Think',
      paragraphs: [
        'I call myself a builder. Everything I do starts with an idea.',
        'Your ability to learn, ideate, and execute is most of what determines where you end up — alongside the connections you maintain and create, the will you have to win, and the openness to keep learning. The skill of acquiring skills. That\'s what I\'m always working to sharpen.',
        'I sit at the overlap of technical fluency, societal intuition, and pure intellect. Most people develop one. I think you need all three — and the people who have all three are about to matter a lot more than they did before.',
        'I write about this in *The Light* — a newsletter about authentic creation, what it means to make something that couldn\'t have come from anyone else, and what gets in the way of that.'
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
    angle: 60, dist: 250,
    size: 84,
    morphPath: 'M48,5 C68,3 90,16 93,38 C96,60 82,84 60,90 C38,96 14,82 7,60 C0,38 12,14 32,7 C38,4 42,6 48,5Z',
    bgGrad: `linear-gradient(135deg, #FFF4EE 0%, #FEF0E6 100%)`,
    pulseDelay: 0.8,
    content: {
      sectionTag: '03 — Work',
      titleFirst: 'What I\'ve',
      titleEm: 'Made',
      items: [
        { label: '2024–Present', title: 'Nalana', desc: 'Voice-controlled 3D design tool. Production-ready geometry. Built on Blender. Nike Innovation interest, USC NVSC quarterfinals.' },
        { label: '2023–2024', title: 'Sidian', desc: 'A line of 3D printed shoes. Six wearable pairs, designed and produced from scratch. Proof that I don\'t just design things that live on screens.' },
        { label: '2023', title: 'Honda Innovation', desc: 'Speculative vehicle concept design. Worked inside one of the world\'s most recognized industrial design organizations as a junior designer.' },
        { label: '2022–2023', title: 'MATTE Projects', desc: 'Retail displays and product visualizations for Cartier, Macallan, Vans. Real clients, real production, real deadlines.' },
        { label: '2024', title: 'FSF National Case Study', desc: 'Won the Fashion Scholarship Fund National Case Study Competition.' },
        { label: '2024', title: 'Google Makeathon', desc: 'Won. Built something that worked under pressure with people I\'d never worked with before.' },
        { label: '2023', title: 'Faith in MDVS', desc: 'Cactus Jack Design Competition entry. Oversized leather muscle tee about spiritual expression and intentional mark-making.' }
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
    angle: 130, dist: 240,
    size: 76,
    morphPath: 'M50,7 C70,5 88,20 91,42 C94,64 80,84 58,89 C36,94 14,80 8,58 C2,36 14,14 34,8 C40,5 44,8 50,7Z',
    bgGrad: `linear-gradient(135deg, #FFFBF0 0%, #FEF9E7 100%)`,
    pulseDelay: 1.2,
    content: {
      sectionTag: '04 — Process',
      titleFirst: 'How I',
      titleEm: 'Work',
      paragraphs: [
        'I keep a style journal. Over 200 entries and counting. Written observations about why something works, why I like it, how it could be better, and how I could use it. It covers art, but also what I see in the business and economic world. It\'s the practice underneath the practice.',
        'When I built Nalana, I wasn\'t trying to build a voice interface — I was drawn to the space of 3D and AI, imagining the possibilities within that combination. I followed that curiosity and found a problem space that was deeper than my knowledge at the time. I worked to teach myself, ask professionals, and build within the space. After a while, came Nalana. The tool came from curiosity, learning, problem solving, then finally vision.',
        'I move between making and thinking constantly. A sketch teaches me something a conversation couldn\'t. A conversation teaches me something a sketch couldn\'t.',
        'I work best when I\'m slightly over my head — intentionally. The projects that taught me the most were the ones where I had to become someone new to finish them.'
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
    content: {
      sectionTag: '05 — Origin',
      titleFirst: 'Where I\'m',
      titleEm: 'From',
      paragraphs: [
        'I\'m a junior at USC\'s Iovine and Young Academy — a program that trains people to work at the intersection of technology, business, and liberal arts. Small, hard to explain, and exactly right for me.',
        'Before IYA I was at Emory, then USC Marshall. The path wasn\'t linear. It was searching — for the right context, the right people, the right permission to be all the things I am. I found it.',
        'I grew up interested in everything. That used to feel like a liability. It\'s starting to feel like the whole point.'
      ],
      stats: [
        { value: '2027', label: 'Graduating' },
        { value: 'IYA', label: 'USC Los Angeles' }
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
    content: {
      sectionTag: '06 — Network',
      titleFirst: 'Who\'s In My',
      titleEm: 'Corner',
      people: [
        { name: 'Aven Wright', role: 'Senior Manager, Jordan Brand Global', desc: 'My FSF mentor. He\'s shown me what it looks like to lead with taste inside a massive institution.' },
        { name: 'Adam Hiler', role: 'Senior Director of 3D Excellence, Jordan Brand', desc: 'An advisor who understands what Nalana is trying to do and why it matters to the industry.' },
        { name: 'Eric Quick', role: 'CEO of Caffree · IYA Alum · Lecturer', desc: 'The clearest thinker I know about what it takes to build a company from a creative practice.' },
        { name: 'Ghadi Nehme', role: 'MIT DeCoDE Lab Connection', desc: 'A bridge between the academic side of AI and design and the applied side.' }
      ],
      networkNote: 'These are people who have given me real time, real feedback, and real belief. That means something.'
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
    content: {
      sectionTag: '07 — Current Thinking',
      titleFirst: 'What I\'m',
      titleEm: 'Thinking About',
      thoughts: [
        '3D as infrastructure. A way of representing the physical world that AI can reason about. The implications go far beyond design tools — healthcare, manufacturing, simulation, education. Nalana is one application. The underlying idea is much larger.',
        'What it means to build a creative practice that compounds. Every project should make the next one easier, richer, more distinctly yours. I\'m early in that but I can feel it starting to happen.',
        'What authentic creation looks like in an era when generation is cheap. If anyone can make anything, the question becomes: what makes something worth making? I write about this in The Light. I don\'t have the answer yet.'
      ],
      showInvitation: true
    }
  }
];
