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
    Mehead.webp             ← real photo for center node
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
> I've never been able to accept a box. Not because I'm restless — because the box has never made sense to me. I can learn. I can think. I can build. The only real limits are what I care enough about to go deep on. That's why I'm a founder, artist, learner, philosopher all at once. And it turns out — the overlap between those things is where the most interesting problems are hiding.

### 01 — What I'm Building
Nalana is a design tool that lets you build cars, phones, furniture, architecture — anything — just by speaking. You describe it. It builds it in 3D, production-ready, immediately usable in any professional pipeline.

I have seven years of 3D design experience. Deep expertise. And I still kept hitting the same wall — ideas that were completely clear in my head that the tools couldn't keep up with. Sometimes the geometry broke downstream. Sometimes I was spending more time fighting the software than actually designing. Sometimes the idea just never made it out. That friction is the problem Nalana solves.

Most AI 3D tools generate geometry from scratch. It looks right until an engineer or designer actually tries to use it. Nalana is built as a soft fork of Blender, using Blender's native operations and modifiers. Every object it creates is clean, editable, and pipeline-compatible from day one. It doesn't just generate — it builds the way a professional would.

The model learns from the people who use it. The longer you work with Nalana, the more it understands your design language — your proportions, your instincts, your preferences. That understanding compounds. Switching costs grow. The moat builds itself.

I've spoken directly with Eric Bruckbauer, Director of Innovation Footwear Material Design at Nike, and Adam Thuss, Computational Design Director at Nike Innovation Kitchen. The problem is real at every level of the industry — from students trying to get ideas out of their heads to the people designing what Nike makes next. The tools don't move fast enough. They don't stay usable. Nalana fixes that.

Stats: Nike Innovation (Validated), Top 8 (USC NVSC), 2025 (Founded)

### 02 — How I Think
Everything starts with understanding why — not just that. Why does this work? Why does this feel right? Why does this company have staying power when that one doesn't? I keep a style journal — over 200 entries — not to document taste but to interrogate it. Most people know what they like. I want to know why I like it. That practice transfers to everything.

I've noticed something recently. My ideas are coming in more technical than expressive. My artistic output has slowed. I'm thinking more about systems and company building than about pure creation. I heard Kanye talk about how childlike creativity gets crowded by grown thoughts — and those bars hit me for the first time because I'm living a version of that. I'm aware of the shift. I'm watching it. That kind of self-awareness is something I think about as a practice, not an accident.

I sit at the overlap of technical fluency, societal intuition, and taste. Most people develop one. I think the people who develop all three are about to matter a lot more than they did before. I write about what's in that overlap in The Light.

### 03 — What I've Made
Everything I've built has fed the next thing. I didn't always know it in the moment — but looking back, the thread is always there.

Sidian taught me how shoes are actually designed. The tolerances, the geometry, the way a last translates into a wearable object. I designed and produced six wearable pairs from scratch. That knowledge lives inside Nalana now — I'm not building a tool for a problem I read about. I'm building a tool for a process I know intimately.

- 2025–Present | Nalana: Voice-controlled 3D design tool. Production-ready geometry. Built on Blender. Interest from Nike Innovation, USC NVSC quarterfinals.
- 2025 | Sidian: A complete line of 3D printed shoes. Designed, modeled, printed, and worn. Six pairs. Every step done by hand. The most important thing I've built for understanding what Nalana needs to be.
- 2024-2025 | Honda Innovation: Speculative vehicle concept design inside one of the world's most recognized industrial design organizations. Junior designer. Real constraints, real process.
- 2023–2024 | MATTE Projects: Retail displays and product visualizations for Cartier, Macallan, Vans. The first time my work existed in rooms I wasn't in.
- 2025 | FSF National Case Study: Won nationally. A 21-slide strategy reimagining Adidas' product ecosystem through AI wearables and cross-category storytelling. Named a Virgil Abloh "Post-Modern" Scholar.
- 2024 | Google Makeathon: Won. Built something that worked under pressure with people I'd never met before.
- 2025 | Faith in MDVS: Cactus Jack Design Competition entry. Oversized leather muscle tee. Spiritual expression and intentional mark-making.

### 04 — How I Work
I start every problem the same way — I ask questions until I can visualize it. To me, understanding means being able to see a problem in my head and explain it in the language of any field it touches. Once I can visualize it, the solution usually follows. Either it comes on its own or I research until I find the one that fits, and then I move.

I keep two journals. A style journal — over 200 entries — where I write about why something works, not just that it works. Understanding the why behind taste is what builds taste that compounds. The second is a startup journal, where I track ideas, reactions to other companies, what I'd do differently. Same practice, different domain. I'm always trying to understand the world, not just observe it.

I've lost pitch competitions. Had demos break. Walked away from hackathons without winning. I don't experience those as failures for very long — I move too fast to sit in it. What I do is study exactly what the gap was. After one pitch competition the judges told me directly: clearer communication, stronger traction. I looked at the pitches that advanced and they were right. I'm a different pitcher now because of that specific feedback. The hackathon taught me something else — I was compromising my ideas to incorporate others', and after seeing what won, my original instincts were right. I learned to trust my own judgment more, not less.

I work best slightly over my head — intentionally. The projects that changed me the most were the ones where I had to become a different person to finish them.

### 05 — Where I'm From
I'm from Chicago. I grew up observant — borderline analytical about everything around me. Creative, technical, athletic. Always more than one thing at once and never able to explain why that was a problem.

My dad is a real estate entrepreneur. He installed one belief in me early: I am the owner, not the worker. Whatever I build, I run it. That landed somewhere deep. When my friends stress about internships or where they're going to work, it doesn't register the same way for me. Building Nalana doesn't feel like a risk. It feels like the only natural thing.

He also guided me toward guiding my own ship. I remember people commenting in high school that I seemed to know where I was going. I did. I knew what resonated and what didn't. That clarity has never been about having all the answers — it's about knowing which direction to move in and trusting it. I'm still doing that.

I ended up at USC's Iovine and Young Academy after Emory, then USC Marshall. The path wasn't linear — it was searching. What I found at IYA wasn't just the right program. It was permission. Permission to be all of the things I am at the same time and have that be the point, not a problem.

I'm graduating in 2027. I'm building Nalana now. I'm not waiting.
Stats: 2027 (Graduating), IYA (USC Los Angeles), Chicago (Origin)

### 06 — Who's In My Corner
The people around me aren't decorations. They're active inputs into how I think and what I build.

- Matthew Rowean — Founder, MATTE Projects. He came from a creative background and built a company that produces real work for real clients at scale. I've talked to him a lot about the tension between creative identity and company building — and those conversations hit differently now that I'm living that tension myself. When I was in a period where I wasn't executing my ideas to the extent I wanted to, he told me to just do it. Simple. But it reignited something. He's going to be an important one as Nalana grows.
- Adam Hiler — Senior Director of 3D Excellence, Jordan Brand. He operates at the highest level of 3D design in the industry and chose to advise Nalana. That means something. He understands exactly what the tool needs to be.
- Aven Wright — Senior Manager, Jordan Brand Global. My FSF mentor. He's shown me what it looks like to lead with taste inside a massive institution without losing the taste.
- Eric Quick — CEO of Caffree, IYA Alum, Lecturer. The clearest thinker I know about what it actually takes to build a company from a creative practice. Every conversation recalibrates something.
- Ghadi Nehme — MIT DeCoDE Lab. The bridge between where AI and design research is heading academically and where Nalana is going practically.

These aren't people I name-drop. They're people who have given me real time, real feedback, and real belief. That's a different thing.

### 07 — What I'm Thinking About
The gap between what humans can imagine and what they can build is about to close permanently. That's the thesis. 3D is the layer that makes it possible — because 3D is how the physical world actually works. Not a representation of it. The thing itself, simulated. Once you can simulate anything in 3D, you can train on it, test it, iterate on it, understand it before it exists. Medicine. Manufacturing. Architecture. Aerospace. Nalana is one entry point. The underlying shift is much larger.

I'm also thinking about what it means to build a creative practice that compounds. Every project should make the next one harder to replicate — richer, more distinctly yours, more impossible to separate from who you are. I'm early in that. But I can feel it starting.

The question I keep coming back to — the one I write about in The Light and still don't have the answer to — is how to create something truly new. Not novel. Not original. New. In an era when generation is cheap and everything references something else, what does it actually take to make something that didn't exist before you made it? I don't know yet. But I think the answer matters more now than it ever has.

### The Invitation
> If something here resonates — the work, the thinking, the questions — I want to hear from you.
> clarence@nalana.io
> cekeith@usc.edu


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