# Master Context: Clarence Keith Personal Site

## 1. Project Overview & Tech Stack
- **Purpose:** An interactive personal portfolio site for Clarence Keith.
- **Tech Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.
- **Deployment:** Vercel.
- **Vibe/Aesthetic:** Ethereal, organic, glassmorphism, floating nodes, smooth physical animations.

## 2. Architecture & Core Mechanics
- **The Canvas (`NodeCanvas.tsx`):** The site is a full-screen canvas with a central photo and 7 floating, draggable "nodes" orbiting it.
- **Connection Lines:** SVG lines connect the center photo to each node. These lines update dynamically in real-time when nodes are dragged, maintaining connection.
- **Interactions:** 
  - Nodes are draggable with a spring physics feel.
  - *Crucial Rule:* A small drag (<4px) counts as a "click" and opens the node. A large drag only moves the node.
  - Background and elements have subtle mouse parallax (following the cursor).
  - Hovering a node causes a custom cursor interaction (ring expands).
- **Node View (`NodeView.tsx`):** Clicking a node opens a full-screen blurred overlay with specific content (video, text, stats).

## 3. Design System
- **Colors:**
  - Background: Cream (`#FEFBF6`) with complex, breathing radial gradients.
  - Text: Ink Soft (`#251C1A`), Muted (`#5C5146`), Slate (`#5C4D73`).
  - Node Glows: Orange (`#E8943A`), Purple (`#C084FC`), Orange/Peach (`#FB923C`), Amber (`#F59E0B`), Lime (`#84CC16`), Blue (`#60A5FA`), Pink (`#F472B6`).
- **Typography:**
  - Display: `PP Editorial New` (serif, elegant, italicized).
  - Mono: `Space Mono` (uppercase, heavily tracked out for labels).
  - Sans: `Inter` (for general reading).
- **Effects:** Heavy use of backdrop-blur (glassmorphism), a global SVG noise/grain filter over the background, and slow "breathing" scale/opacity animations.

## 4. The Content / Copy (Data Structure)
All copy and content for the nodes is centralized in `data/nodes.ts`.

### 01: What I'm Building
- **Short Desc:** Voice-controlled 3D design tool
- **Video:** `/videos/nalana-demo.mp4`
- **Paragraphs:**
  - "Nalana is a design tool that lets you build cars, phones, furniture, architecture — anything — just by speaking. You describe what you want. It builds it in 3D, production-ready, immediately usable in any professional pipeline."
  - "Most AI 3D tools generate geometry from scratch. The output looks right but breaks the moment an engineer or designer tries to use it. Nalana is built as a soft fork of Blender, using Blender's native operations and modifiers under the hood. Every object it creates is clean, editable, and pipeline-compatible from day one."
  - "The people who use it daily are the ones it learns from. The longer you work with Nalana, the more it understands your design language — your proportions, your aesthetic instincts, your preferences. This builds a moat of switching costs compounding over time."
  - "I'm uniquely positioned to build this. I'm a designer who understands 3D pipelines from the inside — a practitioner who lived the problem, then built the solution."
- **Stats:** Nike (Innovation Interest), Top 8 (USC NVSC), 2024 (Founded)

### 02: How I Think
- **Short Desc:** I call myself a builder.
- **Paragraphs:**
  - "I call myself a builder. Everything I do starts with an idea."
  - "Your ability to learn, ideate, and execute is most of what determines where you end up — alongside the connections you maintain and create, the will you have to win, and the openness to keep learning. The skill of acquiring skills. That's what I'm always working to sharpen."
  - "I sit at the overlap of technical fluency, societal intuition, and pure intellect. Most people develop one. I think you need all three — and the people who have all three are about to matter a lot more than they did before."
  - "I write about this in *The Light* — a newsletter about authentic creation, what it means to make something that couldn't have come from anyone else, and what gets in the way of that."

### 03: What I've Made
- **Short Desc:** USC Iovine and Young Academy.
- **Items:**
  - **2024–Present | Nalana:** Voice-controlled 3D design tool. Production-ready geometry. Built on Blender. Nike Innovation interest, USC NVSC quarterfinals.
  - **2023–2024 | Sidian:** A line of 3D printed shoes. Six wearable pairs, designed and produced from scratch. Proof that I don't just design things that live on screens.
  - **2023 | Honda Innovation:** Speculative vehicle concept design. Worked inside one of the world's most recognized industrial design organizations as a junior designer.
  - **2022–2023 | MATTE Projects:** Retail displays and product visualizations for Cartier, Macallan, Vans. Real clients, real production, real deadlines.
  - **2024 | FSF National Case Study:** Won the Fashion Scholarship Fund National Case Study Competition.
  - **2024 | Google Makeathon:** Won. Built something that worked under pressure with people I'd never worked with before.
  - **2023 | Faith in MDVS:** Cactus Jack Design Competition entry. Oversized leather muscle tee about spiritual expression and intentional mark-making.

### 04: How I Work
- **Short Desc:** Nalana, Sidian, and more.
- **Paragraphs:**
  - "I keep a style journal. Over 200 entries and counting. Written observations about why something works, why I like it, how it could be better, and how I could use it. It covers art, but also what I see in the business and economic world. It's the practice underneath the practice."
  - "When I built Nalana, I wasn't trying to build a voice interface — I was drawn to the space of 3D and AI, imagining the possibilities within that combination. I followed that curiosity and found a problem space that was deeper than my knowledge at the time. I worked to teach myself, ask professionals, and build within the space. After a while, came Nalana. The tool came from curiosity, learning, problem solving, then finally vision."
  - "I move between making and thinking constantly. A sketch teaches me something a conversation couldn't. A conversation teaches me something a sketch couldn't."
  - "I work best when I'm slightly over my head — intentionally. The projects that taught me the most were the ones where I had to become someone new to finish them."

### 05: Where I'm From
- **Short Desc:** The practice underneath the practice.
- **Paragraphs:**
  - "I'm a junior at USC's Iovine and Young Academy — a program that trains people to work at the intersection of technology, business, and liberal arts. Small, hard to explain, and exactly right for me."
  - "Before IYA I was at Emory, then USC Marshall. The path wasn't linear. It was searching — for the right context, the right people, the right permission to be all the things I am. I found it."
  - "I grew up interested in everything. That used to feel like a liability. It's starting to feel like the whole point."
- **Stats:** 2027 (Graduating), IYA (USC Los Angeles)

### 06: Who's In My Corner
- **Short Desc:** People in my corner.
- **People:**
  - **Aven Wright (Senior Manager, Jordan Brand Global):** My FSF mentor. He's shown me what it looks like to lead with taste inside a massive institution.
  - **Adam Hiler (Senior Director of 3D Excellence, Jordan Brand):** An advisor who understands what Nalana is trying to do and why it matters to the industry.
  - **Eric Quick (CEO of Caffree · IYA Alum · Lecturer):** The clearest thinker I know about what it takes to build a company from a creative practice.
  - **Ghadi Nehme (MIT DeCoDE Lab Connection):** A bridge between the academic side of AI and design and the applied side.
- **Note:** "These are people who have given me real time, real feedback, and real belief. That means something."

### 07: What I'm Thinking About
- **Short Desc:** 3D as infrastructure.
- **Thoughts:**
  - "3D as infrastructure. A way of representing the physical world that AI can reason about. The implications go far beyond design tools — healthcare, manufacturing, simulation, education. Nalana is one application. The underlying idea is much larger."
  - "What it means to build a creative practice that compounds. Every project should make the next one easier, richer, more distinctly yours. I'm early in that but I can feel it starting to happen."
  - "What authentic creation looks like in an era when generation is cheap. If anyone can make anything, the question becomes: what makes something worth making? I write about this in *The Light*. I don't have the answer yet."

### Main Landing Page Opening Statement
"I'm a founder, artist, learner, philosopher — all four, all at once, because that's just who I am. The interesting thing is what happens when you stop trying to pick one lane. The problems and opportunities you find there, nobody else is looking at yet."