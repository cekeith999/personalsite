# Clarence Keith — Personal Site
## Cursor Project Context

This file is the single source of truth for this project.
Read this fully before making any changes to the codebase.

---

## Current Build Status

### Completed
- [x] Next.js 14 App Router scaffolded
- [x] TypeScript configured
- [x] Tailwind CSS configured
- [x] Framer Motion installed
- [x] Project folder structure created:
      /app, /components, /data, /styles, /public
- [x] clarence-keith.html — original working HTML prototype (visual/behavioral reference)

### In Progress / Not Yet Built
- [ ] Tailwind config extended with custom colors + fonts
- [ ] /data/nodes.ts — typed node data and content
- [ ] EntrySequence.tsx
- [ ] NodeCanvas.tsx
- [ ] Node.tsx
- [ ] NodeView.tsx
- [ ] Cursor.tsx
- [ ] page.tsx wired together
- [ ] Mobile responsive layout
- [ ] SEO + OG tags
- [ ] Vercel deploy config

---

## What This Site Is

A personal site for Clarence Keith — founder, artist, learner, philosopher.
Not a portfolio site. A window into a person.

Two primary audiences:
1. **Investors** — YC, a16z, accelerators, angels. Signal fast: what is he building, why will it win, why is he the one.
2. **People looking him up** — creatives, collaborators, mentors, curious strangers. Feel a person, not read a resume.

---

## The Concept

**"A dive into my brain."**

Visitors explore, not browse. The interface is the statement.
A canvas with Clarence at center, organic glass nodes radiating outward.
Each node is a region of his mind. Clicking reveals depth.

The color language is **prismatic light** — the way light looks passing through something clear.
Luminous, airy, iridescent. This is also the Nalana color world.
The personal site and the product feel like the same universe.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Canvas effects | Plain canvas API or Three.js |
| Deploy | Vercel |
| CMS (future) | Sanity or Contentful |

### Critical Rules
- Every component using mouse events, Framer Motion, or browser APIs needs `'use client'` at the top
- App Router is server-first — forgetting `'use client'` causes silent failures with Framer Motion
- All copy lives in `/data/nodes.ts` — never hardcode content inside components
- Never change copy in components — edit nodes.ts only

---

## Project Structure

```
/app
  layout.tsx                ← root layout, fonts, metadata, Cursor
  page.tsx                  ← main canvas page
/components
  EntrySequence.tsx
  NodeCanvas.tsx
  Node.tsx
  NodeView.tsx
  Cursor.tsx
/data
  nodes.ts                  ← all node content + config (typed)
/styles
  globals.css
/public
  /images
    clarence.jpg            ← real photo (add when ready)
    og-image.jpg            ← OG image for social sharing
```

---

## Color System — Iridescent Light

### The Palette

Extracted from reference image: a soft iridescent gradient with a white radial
bloom at center, pink top-left, sky blue top-right, purple bottom-left, cyan bottom-right.
This is also the Nalana brand color world.

```
--irid-white:      #FFFFFF       ← center bloom
--irid-pink:       #F0C8F0       ← top left, soft blush
--irid-pink-deep:  #C890F0       ← bottom left, violet-pink
--irid-blue:       #A8D8FF       ← top right, sky
--irid-blue-pale:  #C0E8FF       ← bottom right, pale cyan
--irid-purple:     #B878E8       ← bottom left corner, deepest
--irid-bg:         #F8F4FF       ← page background base

--ink:             #1A1520       ← near-black, slight purple tint
--ink-soft:        #3D3050       ← body text
--ink-muted:       #8A7AA0       ← labels, captions, metadata
```

### The Background Gradient

Use this exact CSS for the canvas background and entry sequence:

```css
background:
  radial-gradient(ellipse 60% 60% at 50% 45%, rgba(255,255,255,0.95) 0%, transparent 55%),
  radial-gradient(ellipse 80% 70% at 10% 15%, rgba(240,200,240,0.55) 0%, transparent 55%),
  radial-gradient(ellipse 70% 60% at 90% 10%, rgba(168,216,255,0.50) 0%, transparent 55%),
  radial-gradient(ellipse 60% 70% at 5%  90%, rgba(184,120,232,0.40) 0%, transparent 55%),
  radial-gradient(ellipse 50% 50% at 95% 85%, rgba(192,232,255,0.40) 0%, transparent 55%),
  #F8F4FF;
```

### Animated Background Drift

CSS keyframes that gently shift radial positions ±4% over 20 seconds.
Creates a living, breathing atmosphere. Applied to both entry and canvas.

```css
@keyframes bgDrift {
  0%, 100% { background-position: 0% 0%; }
  25%  { background-position: 2% -3%; }
  50%  { background-position: -2% 4%; }
  75%  { background-position: 3% 2%; }
}
```

Use `background-size: 110% 110%` + `animation: bgDrift 20s ease-in-out infinite`.

### Node Colors

Cooler palette, aligned with the iridescent world:

| Node | Color | Hex |
|------|-------|-----|
| 01 Building | Violet-blue | `#7C6FE0` |
| 02 Thinking | Animated iridescent | `#C084FC` → `#60A5FA` |
| 03 Made | Rose-pink | `#E879A0` |
| 04 Work | Periwinkle | `#818CF8` |
| 05 Origin | Mint-teal | `#5EEAD4` |
| 06 Network | Sky blue | `#60A5FA` |
| 07 Thoughts | Soft violet | `#A78BFA` |

### Node Interior Backgrounds

When a node is expanded, the background is `#F8F4FF` with a very soft color tint:

| Node | Tint overlay |
|------|-------------|
| Building | rgba(124,111,224,0.06) |
| Thinking | Full iridescent animation (special case) |
| Made | rgba(232,121,160,0.06) |
| Work | rgba(129,140,248,0.06) |
| Origin | rgba(94,234,212,0.06) |
| Network | rgba(96,165,250,0.06) |
| Thoughts | rgba(167,139,250,0.06) |

### Tailwind Config Extensions

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      irid: {
        white:      '#FFFFFF',
        pink:       '#F0C8F0',
        'pink-deep':'#C890F0',
        blue:       '#A8D8FF',
        'blue-pale':'#C0E8FF',
        purple:     '#B878E8',
        bg:         '#F8F4FF',
      },
      ink: {
        DEFAULT: '#1A1520',
        soft:    '#3D3050',
        muted:   '#8A7AA0',
      },
      node: {
        building: '#7C6FE0',
        thinking: '#C084FC',
        made:     '#E879A0',
        work:     '#818CF8',
        origin:   '#5EEAD4',
        network:  '#60A5FA',
        thoughts: '#A78BFA',
      },
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],
      mono:    ['DM Mono', 'monospace'],
    },
  },
},
```

---

## Typography

Add to `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

html, body { cursor: none; }
body { background: #F8F4FF; }
```

| Role | Font | Weight | Color |
|------|------|--------|-------|
| Entry word | Cormorant Garamond | 300 | `#2D1B6E` |
| Display headings | Cormorant Garamond | 300 | `#1A1520` |
| Italic / em | Cormorant Garamond | 300 italic | node color |
| Node labels | DM Mono | 400 | `#8A7AA0` |
| Body | Cormorant Garamond | 300 | `#3D3050` |
| Metadata | DM Mono | 300 | `#8A7AA0` |

**Never use:** Inter, Roboto, Arial, system-ui, or any sans-serif.

---

## TypeScript Types

```ts
// /data/nodes.ts

export interface NodeData {
  id: string
  label: string
  num: string
  color: string
  colorSoft: string
  shadow: string
  angle: number       // degrees from center
  dist: number        // px distance from center
  size: number        // SVG width/height
  morphPath: string   // SVG organic shape path data
  bgGrad: string      // CSS for expanded view background
  pulseDelay: number  // seconds, stagger the pulse animation
}
```

---

## Node Positions (from clarence-keith.html)

```ts
{ id: 'building',  angle: -60,  dist: 240, size: 88 }
{ id: 'thinking',  angle: 0,    dist: 280, size: 80 }
{ id: 'made',      angle: 60,   dist: 250, size: 84 }
{ id: 'work',      angle: 130,  dist: 240, size: 76 }
{ id: 'origin',    angle: 180,  dist: 260, size: 72 }
{ id: 'network',   angle: 240,  dist: 250, size: 80 }
{ id: 'thoughts',  angle: 300,  dist: 240, size: 78 }
```

---

## Design System

### Node Design
- Organic irregular SVG shapes — not border-radius circles
- Glass: `backdrop-filter: blur(12px)` + `rgba(255,255,255,0.35)` fill
- Radial gradient fill: white 0% → node color 20% opacity at 45% → node color 40% opacity at 100%
- Outer glow: absolute div, blur 24px, node color 30–40% opacity, inset -25%
- Pulse: Framer Motion `animate={{ opacity: [0.25,0.55,0.25], scale: [1,1.12,1] }}`
  duration 3–4s, ease "easeInOut", repeat Infinity, delay = pulseDelay
- Connection lines: SVG quadratic bezier, gradient stroke, animateMotion signal dots
- Hover: blob scale 1.07, glow opacity 0.8 scale 1.2, label opacity 1
- Click: expands via NodeView overlay

### Motion
- Entry: staggered word reveal → blur dissolve, 3.2s total
- Canvas fade in: opacity 0→1, duration 1.2s, delay 0.6s
- Node hover: duration 0.3s, ease "easeOut"
- Node expand: duration 0.6s, ease [0.16, 1, 0.3, 1]
- Parallax: useMotionValue + useTransform, depth 8–20px per node, center depth 2–3
- No bounce, no spring physics

### Custom Cursor
- Dot: 10px, `#2D1B6E`, follows mouse exactly
- Ring: 36px, `rgba(124,111,224,0.4)` border, lerp delay ~0.12
- Hover state: dot 6px, ring 56px
- `data-cursor="hover"` on all interactive elements

---

## Content — All 7 Nodes

### Opening Statement
> I'm a founder, artist, learner, philosopher — all four, all at once, because that's just who I am. The interesting thing is what happens when you stop trying to pick one lane. The problems and opportunities you find there, nobody else is looking at yet.

### 01 — What I'm Building
Nalana is a design tool that lets you build cars, phones, furniture, architecture — anything — just by speaking. You describe what you want. It builds it in 3D, production-ready, immediately usable in any professional pipeline.

Most AI 3D tools generate geometry from scratch. The output looks right but breaks the moment an engineer or designer tries to use it. Nalana is built as a soft fork of Blender, using Blender's native operations and modifiers under the hood. Every object it creates is clean, editable, and pipeline-compatible from day one.

The people who use it daily are the ones it learns from. The longer you work with Nalana, the more it understands your design language — your proportions, your aesthetic instincts, your preferences. This builds a moat of switching costs compounding over time.

I'm uniquely positioned to build this. I'm a designer who understands 3D pipelines from the inside — a practitioner who lived the problem, then built the solution.

Traction: Nike Innovation interest · USC NVSC quarterfinals · faculty + industry advisor support

### 02 — How I Think
I call myself a builder. Everything I do starts with an idea.

Your ability to learn, ideate, and execute is most of what determines where you end up — alongside the connections you maintain and create, the will you have to win, and the openness to keep learning. The skill of acquiring skills. That's what I'm always working to sharpen.

I sit at the overlap of technical fluency, societal intuition, and pure intellect. Most people develop one. I think you need all three — and the people who have all three are about to matter a lot more than they did before.

I write about this in The Light — a newsletter about authentic creation, what it means to make something that couldn't have come from anyone else, and what gets in the way of that.

### 03 — What I've Made
- Nalana — Voice-controlled 3D design tool. Production-ready geometry. Built on Blender.
- Sidian — 3D printed shoe line. Six wearable pairs, designed and produced from scratch.
- Honda Innovation — Speculative vehicle concept design. Junior designer inside one of the world's most recognized industrial design organizations.
- MATTE Projects — Retail displays and visualizations for Cartier, Macallan, Vans.
- FSF National Case Study — Won.
- Google Makeathon 2024 — Won.
- Faith in MDVS — Cactus Jack Design Competition. Oversized leather muscle tee about spiritual expression and intentional mark-making.

### 04 — How I Work
I keep a style journal. Over 200 entries and counting. Written observations about why something works, why I like it, how it could be better, and how I could use it. It covers art, but also what I see in the business and economic world. It's the practice underneath the practice.

When I built Nalana, I wasn't trying to build a voice interface — I was drawn to the space of 3D and AI, imagining the possibilities within that combination. I followed that curiosity and found a problem space that was deeper than my knowledge at the time. I worked to teach myself, ask professionals, and build within the space. After a while, came Nalana. The tool came from curiosity, learning, problem solving, then finally vision.

I move between making and thinking constantly. A sketch teaches me something a conversation couldn't. A conversation teaches me something a sketch couldn't.

I work best when I'm slightly over my head — intentionally. The projects that taught me the most were the ones where I had to become someone new to finish them.

### 05 — Where I'm From
Junior at USC's Iovine and Young Academy (IYA), Class of 2027. Program trains people at the intersection of technology, business, and liberal arts. Small, hard to explain, and exactly right for me.

Before IYA: Emory, then USC Marshall. The path wasn't linear. It was searching — for the right context, the right people, the right permission to be all the things I am. I found it.

I grew up interested in everything. That used to feel like a liability. It's starting to feel like the whole point.

### 06 — Who's In My Corner
- Aven Wright — Senior Manager, Jordan Brand Global. FSF mentor. He's shown me what it looks like to lead with taste inside a massive institution.
- Adam Hiler — Senior Director of 3D Excellence, Jordan Brand. An advisor who understands what Nalana is trying to do and why it matters to the industry.
- Eric Quick — CEO of Caffree, IYA alum, IYA lecturer. The clearest thinker I know about what it takes to build a company from a creative practice.
- Ghadi Nehme — MIT DeCoDE Lab connection. A bridge between the academic side of AI and design and the applied side.
- These are people who have given me real time, real feedback, and real belief. That means something.

### 07 — What I'm Thinking About
- 3D as infrastructure. A way of representing the physical world that AI can reason about. The implications go far beyond design tools — healthcare, manufacturing, simulation, education. Nalana is one application. The underlying idea is much larger.
- What it means to build a creative practice that compounds. Every project should make the next one easier, richer, more distinctly yours. I'm early in that but I can feel it starting to happen.
- What authentic creation looks like in an era when generation is cheap. If anyone can make anything, the question becomes: what makes something worth making? I write about this in The Light. I don't have the answer yet.

### The Invitation
> If something here resonates — the work, the thinking, the questions — I want to hear from you.
> clarence@clarencekeith.com

---

## Copy Rules
- Never use: "actual," "actually," "genuinely"
- Never write "Not X but Y" — just write Y
- Voice: direct, confident, slightly philosophical
- No corporate language. Short sentences fine. Fragments fine.
- Sounds like a sharp 21-year-old who has read a lot and built real things

---

## Reference Files
- `clarence-keith.html` — original working prototype, visual + behavioral reference
- Iridescent gradient reference: white bloom center, pink top-left, blue top-right, purple bottom-left, cyan bottom-right