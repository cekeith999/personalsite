# Cursor Prompts — Clarence Keith Site
## Status: Next.js scaffolded + project structure created

These prompts start from where the project currently is.
Scaffolding is done. The /app, /components, /data, /styles, /public folders exist.

Always start every session with the SESSION OPENER.

---

## SESSION OPENER (paste this first, every session)

```
Read CURSOR_CONTEXT.md fully before doing anything.
That file is the source of truth — stack, design system, copy, colors, types, build status.
The original working prototype is clarence-keith.html — use it as visual and behavioral reference.
Do not invent colors, fonts, or copy. Use exactly what's in CURSOR_CONTEXT.md.
The project already has Next.js 14, TypeScript, Tailwind, and Framer Motion installed,
and the folder structure already exists.
```

---

## PROMPT 01 — Tailwind Config + Global Styles + Data Layer

Start here. Foundation before any components.

```
Read CURSOR_CONTEXT.md.

The Next.js project is already scaffolded with TypeScript, Tailwind, and Framer Motion.
The folder structure exists. Do not re-scaffold anything.

Task 1 — tailwind.config.ts
Extend the theme with the full color system and font config from CURSOR_CONTEXT.md.
Copy the exact hex values — do not approximate.

Task 2 — globals.css
Add:
- Google Fonts import (Cormorant Garamond + DM Mono, all weights listed in CURSOR_CONTEXT.md)
- html, body { cursor: none; }
- body { background: #F8F4FF; }
- The bgDrift CSS keyframe animation from CURSOR_CONTEXT.md

Task 3 — /data/nodes.ts
Create this file with:
- NodeData TypeScript interface (exact fields from CURSOR_CONTEXT.md)
- Array of all 7 nodes with complete config:
  id, label, num, color, colorSoft, shadow, angle, dist, size, morphPath, bgGrad, pulseDelay
- Use the exact node positions (angle + dist) from CURSOR_CONTEXT.md
- Use the exact node colors from CURSOR_CONTEXT.md
- For morphPath values: extract the 7 SVG path strings from clarence-keith.html
  (look for the morphPath property on each node in the JS)
- For bgGrad: use the node interior background formula from CURSOR_CONTEXT.md
- For pulseDelay: stagger 0.4s per node (0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4)
- Include all content (body copy, stats, people, thoughts) as typed fields
  All copy must match CURSOR_CONTEXT.md exactly

After all three tasks: confirm npm run build passes with no TypeScript errors.
```

---

## PROMPT 02 — Cursor Component

```
Read CURSOR_CONTEXT.md.

Task: Build /components/Cursor.tsx

'use client'

Two elements, both position: fixed, pointer-events: none, z-index: 9999:

1. Dot — 10px circle, background #2D1B6E, transform: translate(-50%, -50%)
   Follows mouse position exactly via useEffect + mousemove listener

2. Ring — 36px circle, border: 1px solid rgba(124,111,224,0.4), no fill, transform: translate(-50%,-50%)
   Follows mouse with lerp delay (factor 0.12) via requestAnimationFrame

Hover state — detect via document-level mouseenter/mouseleave on [data-cursor="hover"] elements:
- Dot shrinks to 6px
- Ring expands to 56px, border-color → rgba(124,111,224,0.8)
- Transitions: dot 0.3s ease, ring 0.5s cubic-bezier(0.16,1,0.3,1)

Add Cursor to layout.tsx so it's always present sitewide.
```

---

## PROMPT 03 — Entry Sequence

```
Read CURSOR_CONTEXT.md.

Task: Build /components/EntrySequence.tsx

'use client'

Props: { onComplete: () => void }

Background:
- Full screen fixed overlay, z-index 500
- The exact iridescent gradient CSS from CURSOR_CONTEXT.md
- background-size: 110% 110%, animation: bgDrift 20s ease-in-out infinite

Text — two separate Framer Motion elements:
1. "Build" — Cormorant Garamond, weight 300, font-size clamp(72px,14vw,180px)
   color: #2D1B6E, text-align: center
   initial: { opacity: 0, scale: 0.92 }
   animate: { opacity: 1, scale: 1 }
   transition: { duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.3 }

2. "the World" — same font, italic, opacity peaks at 0.72
   same animation but delay: 0.5 (200ms after "Build")

Hold: both hold for 2.4s after fully in, then dissolve:
   animate out: { opacity: 0, scale: 1.3, filter: 'blur(20px)', y: -30 }
   transition: { duration: 1.2 }
   overlay fades: { opacity: 0 } over 1.4s
   After overlay gone: call onComplete()

Particles (render during hold only):
- 18 particles, each: position absolute, 2–4px circle
- Colors: pick randomly from ['#C084FC','#60A5FA','#E879A0','#A78BFA','#F0C8F0']
- Random x: 10%–90% of viewport width
- Framer Motion: y from '80vh' to '-10vh', opacity [0, 0.4, 0.4, 0], duration 5–9s each, loop
- Start visible immediately once "Build" appears

Use AnimatePresence for clean unmount.
```

---

## PROMPT 04 — Node Canvas

```
Read CURSOR_CONTEXT.md.

Task: Build /components/NodeCanvas.tsx

'use client'

Props: { onNodeOpen: (id: string) => void }

This component renders after entry sequence completes.
Framer Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }}

1. Background — full screen fixed div:
   The exact iridescent gradient from CURSOR_CONTEXT.md
   background-size: 110% 110%, animation: bgDrift 20s ease-in-out infinite
   SVG grain overlay: feTurbulence baseFrequency="0.65" numOctaves="3", opacity 0.03

2. SVG connection lines layer (position absolute, inset 0, pointer-events none, z-index 1):
   For each of the 7 nodes, draw a quadratic bezier from center (W/2, H/2) to node position
   Gradient stroke: center rgba(167,139,250,0.25) → node color at 12% opacity
   animateMotion circle on each path: r=2, fill=node.color, opacity=0.55
   Duration staggered: 3s + (index * 0.7s), begin staggered: index * 0.5s, repeatCount infinite

3. Center element (position absolute, top 50%, left 50%, transform translate(-50%,-50%)):
   Photo ring: 120px circle
   Border: 2px, conic-gradient cycling through irid colors (#C084FC, #60A5FA, #A78BFA, #E879A0)
   Box shadow: 0 0 40px rgba(167,139,250,0.3), 0 0 80px rgba(167,139,250,0.12)
   Pulse animation: box-shadow breathing, 4s ease-in-out infinite
   Inside: circular photo (or placeholder div with DM Mono 8px "Your Photo" text)
   Below ring: "Clarence Keith" DM Mono letter-spacing 0.25em uppercase #3D3050 mt-4
   Below name: "Founder · Artist · Learner · Philosopher" DM Mono 9px #8A7AA0 mt-1

4. Parallax:
   useMotionValue for mouseX, mouseY
   On mousemove: mouseX.set(e.clientX - W/2), mouseY.set(e.clientY - H/2)
   Each node wrapped in Framer Motion motion.div
   useTransform: x = mouseX * (depth / 500), y = mouseY * (depth / 500)
   Center element: depth 2. Nodes: depth values 8, 12, 10, 14, 9, 11, 13 (one per node)

5. Node components: map over nodes array from nodes.ts, render <Node> for each
   Position each node absolutely: left = CX + cos(angle°) * dist, top = CY + sin(angle°) * dist

6. Opening statement (position absolute, bottom 40px, left 50%, transform translateX(-50%)):
   Max-width 680px, text-align center
   Cormorant Garamond italic, 17px, #3D3050, line-height 1.7, px-10
   Framer Motion: opacity 0→1, delay 1.8s
   Text from CURSOR_CONTEXT.md opening statement

7. Top bar:
   Left fixed: "clarencekeith.com" DM Mono 9px #8A7AA0, top 36px left 44px
   Right fixed: email + "The Light ↗" links, same style, top 36px right 44px
   Framer Motion: opacity 0→1, delay 2.2s
   Add data-cursor="hover" to links
```

---

## PROMPT 05 — Node Component

```
Read CURSOR_CONTEXT.md.

Task: Build /components/Node.tsx

'use client'

Props: { node: NodeData, onOpen: (id: string) => void }

The component renders as a div centered at its canvas position (parent handles absolute position).
transform: translate(-50%, -50%) on the root element.

Layer 1 — Glow div (position absolute, inset: '-25%', borderRadius: '50%', zIndex: -1):
  background: radial-gradient(circle, {node.color}50 0%, transparent 70%)
  filter: blur(24px)
  Framer Motion animate:
    opacity: [0.25, 0.55, 0.25]
    scale: [1, 1.12, 1]
  transition: duration: 3 + (node.pulseDelay * 0.5), ease: 'easeInOut', repeat: Infinity, delay: node.pulseDelay

Layer 2 — SVG blob ({node.size}px × {node.size}px, viewBox "0 0 100 100"):
  <defs>
    <radialGradient id="g{node.id}" cx="35%" cy="30%" r="70%">
      stop 0%: rgba(255,255,255,0.82)
      stop 45%: {node.color} at 20% opacity
      stop 100%: {node.color} at 42% opacity
    </radialGradient>
    <filter id="f{node.id}">
      <feGaussianBlur stdDeviation="0.8"/>
    </filter>
  </defs>
  <path d={node.morphPath} fill="url(#g{node.id})" stroke="rgba(255,255,255,0.72)" strokeWidth="0.8" filter="url(#f{node.id})" />
  <path d={node.morphPath} fill="none" stroke={node.color} strokeWidth="0.4" opacity="0.45" />

Layer 3 — Label (position absolute, bottom: calc(100% + 10px), left: 50%, translateX(-50%)):
  DM Mono 9px, #8A7AA0, letter-spacing 0.14em, uppercase, white-space nowrap
  Framer Motion: opacity 0.5 default → 1 on hover, y: 6 default → 0 on hover

Layer 4 — Number (position absolute, top: calc(100% + 8px), left: 50%, translateX(-50%)):
  DM Mono 8px, #8A7AA0, opacity 0.35

Hover (Framer Motion whileHover):
  SVG blob: scale 1.07, transition duration 0.4s
  Glow: opacity 0.85, scale 1.2

Click: onOpen(node.id)
data-cursor="hover" on root div.
```

---

## PROMPT 06 — Node View

```
Read CURSOR_CONTEXT.md.

Task: Build /components/NodeView.tsx

'use client'

Props: { nodeId: string | null, onClose: () => void }

Use AnimatePresence. When nodeId is not null, render the view.

Container: position fixed, inset 0, z-index 800, overflow-y auto
Framer Motion: initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
transition: duration 0.7, ease [0.25,1,0.5,1]

Background: #F8F4FF + node's bgGrad overlay (from nodes.ts)

Close triggers: ESC key (useEffect), click on backdrop outside content div

Back button (position fixed, top 40px, left 48px):
  DM Mono 9px, #8A7AA0, letter-spacing 0.14em, uppercase, cursor pointer
  Display: flex, align-items center, gap 10px
  Before: 24px × 1px line in currentColor
  Hover: color → node.color
  data-cursor="hover"
  onClick: onClose

Content wrapper: max-width 800px, margin 0 auto, padding 100px 60px 120px

Content stagger: AnimatePresence, each content block:
  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
  transition: stagger 0.08s per block, duration 0.5s

Content layout:
- Section tag: DM Mono 9px, #8A7AA0, letter-spacing 0.2em, uppercase, mb-7
- Title: Cormorant Garamond, clamp(52px,7vw,96px), weight 300, line-height 0.88, mb-12
  em: italic, color = node.color
- Body: 18px, weight 300, line-height 1.85, #3D3050, max-width 620px
  p + p: mt-6
- For node 'made': two-column grid (200px label col + 1fr content col), border-bottom between items
  Label: DM Mono 10px, #8A7AA0. Title: 20px #1A1520. Desc: 14px italic #8A7AA0
- For node 'network': person name (20px #1A1520) + role (DM Mono 10px node color) + desc (15px italic #8A7AA0)
- For node 'thoughts': large italic block paragraphs (19px), then Invitation section with email link
- Stats: flex row, gap 52px, mt-14 pt-10 border-top
  Value: Cormorant Garamond 36px weight 300 #1A1520. Label: DM Mono 9px #8A7AA0

Render content from nodes.ts data — do not hardcode copy in this component.
```

---

## PROMPT 07 — Wire page.tsx

```
Read CURSOR_CONTEXT.md.

Task: Wire all components together in app/page.tsx

'use client'

State:
  const [entryComplete, setEntryComplete] = useState(false)
  const [openNodeId, setOpenNodeId] = useState<string | null>(null)

Render:
  <main>
    <AnimatePresence mode="wait">
      {!entryComplete && (
        <EntrySequence key="entry" onComplete={() => setEntryComplete(true)} />
      )}
    </AnimatePresence>

    <AnimatePresence>
      {entryComplete && (
        <NodeCanvas key="canvas" onNodeOpen={(id) => setOpenNodeId(id)} />
      )}
    </AnimatePresence>

    <AnimatePresence>
      {openNodeId && (
        <NodeView key="nodeview" nodeId={openNodeId} onClose={() => setOpenNodeId(null)} />
      )}
    </AnimatePresence>
  </main>

NodeCanvas stays mounted behind NodeView (NodeView is a fixed overlay on top).
Cursor is in layout.tsx — do not add it here.

Confirm: npm run dev opens correctly, entry plays, nodes are visible, clicking a node opens its content.
```

---

## PROMPT 08 — Mobile Layout

```
Read CURSOR_CONTEXT.md.

Task: Make the site fully usable on mobile (below Tailwind md = 768px).

The desktop spatial canvas doesn't work on mobile. Add responsive handling.

In NodeCanvas.tsx, detect mobile with a hook:
  const isMobile = useMediaQuery('(max-width: 768px)')
  Or use a simple window.innerWidth check with useEffect + useState.

Mobile layout (below 768px):
1. Entry sequence: unchanged — works fine as-is
2. After entry, mobile renders a scrollable vertical page (overflow-y auto, min-h screen):
   - Opening statement: Cormorant Garamond italic, 20px, px-8 pt-16 pb-8, text-center
   - Photo ring: 80px, centered, mt-4
   - Name + tag: same as desktop, mt-3
   - Node cards: mt-10, flex flex-col gap-3, px-6, max-width 400px, mx auto

3. Node cards (mobile only):
   - rounded-2xl, bg white/60, backdrop-blur-sm
   - 3px left border in node.color
   - very soft node-color background tint (node color at 6% opacity)
   - padding: 16px 20px
   - Layout: flex row, gap 14px
   - Left: 40px × 40px SVG blob (node.morphPath scaled down), node.color fill 30% opacity
   - Right: node.num (DM Mono 9px #8A7AA0) + node.label (18px Cormorant #1A1520) + short desc (13px italic #8A7AA0)
   - Tap → onNodeOpen(node.id)
   - data-cursor="hover"

4. Hide on mobile:
   - SVG connection lines
   - Parallax (no-op on touch)
   - Top bar
   - Instead: show email link centered at bottom of page, DM Mono 9px, #8A7AA0, py-8

5. NodeView on mobile:
   - padding: 60px 24px 80px
   - All content same, just tighter
   - Back button: top 20px left 20px

6. Custom cursor: hidden on touch devices (pointer: coarse media query)

Desktop layout above 768px: completely unchanged.
```

---

## PROMPT 09 — Iridescent Treatment for "How I Think"

```
Read CURSOR_CONTEXT.md.

Task: Special visual environment for node id 'thinking' expanded view only.

When NodeView renders the 'thinking' node, apply a different background treatment.

1. Background: animated gradient cycling through iridescent colors
   Colors: #C084FC → #F472B6 → #FB923C → #60A5FA → #C084FC
   8s cycle, ease linear, infinite
   Use: background-size 300% 300%, animate background-position
   Over it: rgba(255,255,255,0.62) semi-white overlay for text legibility
   Effect: feels like silk or oil-on-water, slow and hypnotic

2. Section heading gradient text:
   Same iridescent color sequence, background-clip: text, -webkit-text-fill-color: transparent
   4s animation cycle on background-position

3. Body text color: #F5F0FF (near white, slightly lavender) instead of default #3D3050

4. Implementation: check if node.id === 'thinking' in NodeView.tsx
   Apply conditional className or inline styles for this node only
   Or create a ThinkingBackground.tsx sub-component

Keep all other nodes at their default treatment.
```

---

## PROMPT 10 — SEO + Vercel Deploy

```
Read CURSOR_CONTEXT.md.

Task: Production readiness.

Step 1 — Metadata in app/layout.tsx (Next.js Metadata API — not raw head tags):
export const metadata: Metadata = {
  title: 'Clarence Keith — Founder, Artist, Builder',
  description: 'Designer, founder, and builder working at the intersection of AI, design, and culture. Creator of Nalana, the voice-controlled 3D design tool.',
  openGraph: {
    title: 'Clarence Keith',
    description: 'Designer, founder, and builder at the intersection of AI, design, and culture.',
    url: 'https://clarencekeith.com',
    siteName: 'Clarence Keith',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clarence Keith',
    description: 'Designer, founder, and builder at the intersection of AI, design, and culture.',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
}

Step 2 — /public/images/og-image.jpg
Leave a clearly marked comment: // TODO: add real OG image (1200×630px)
Iridescent gradient background + "Clarence Keith" in large Cormorant Garamond

Step 3 — vercel.json in project root:
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}

Step 4 — README.md:
# Clarence Keith — Personal Site
Next.js 14 · TypeScript · Tailwind · Framer Motion

npm install
npm run dev

Deploy: vercel --prod

Step 5 — npm run build passes. Zero TypeScript errors. Zero console warnings.
```

---

## PROMPT 11 — Nalana Demo Embed

```
Read CURSOR_CONTEXT.md.

Task: Add video/demo section to node 'building' content.

In nodes.ts, add a demo video section to node id 'building'.
Location: after the last body paragraph, before the stats row.

In NodeView.tsx, render it when node.id === 'building':

Structure:
- aspect-video container (16:9), rounded-xl, overflow hidden, my-10
- background: #0e0e0b
- border: 1px solid rgba(124,111,224,0.22)
- Placeholder state: flex center, SVG play icon (40px, #7C6FE0) + "Demo Coming Soon" DM Mono 10px #8A7AA0 mt-3
- When DEMO_URL env var or nodes.ts videoUrl field is set: render iframe embed
- Caption below: DM Mono 9px #8A7AA0 mt-3 — "Nalana — voice to production-ready 3D"

Add to NodeData interface: videoUrl?: string
Add to node 'building' in nodes.ts: videoUrl: undefined  // TODO: add real demo URL
```

---

## GENERAL RULES — paste into Cursor Rules for AI settings

```
Project: Clarence Keith personal site.
ALWAYS read CURSOR_CONTEXT.md before any task.
Prototype reference: clarence-keith.html (visual + behavioral reference only).

Status: Next.js 14 scaffolded, TypeScript + Tailwind + Framer Motion installed, folder structure exists.
Do not re-scaffold. Pick up from where the project is.

Stack rules:
- Next.js 14 App Router — server-first by default
- Every component with mouse events, Framer Motion, or browser APIs needs 'use client' at top
- All copy and content lives in /data/nodes.ts only — never hardcode in components

Design rules:
- Color system: iridescent light — white bloom center, pink/purple/blue periphery
  Exact hex values in CURSOR_CONTEXT.md. Do not invent new colors.
- Background gradient: always the exact iridescent mesh CSS from CURSOR_CONTEXT.md
- Fonts: Cormorant Garamond (display/body), DM Mono (labels/mono). No other fonts ever.
- All surfaces have depth and material quality — no flat fills
- Motion: 600–900ms eases, organic, no bounce, no spring physics

Copy rules:
- Never use "actual," "actually," or "genuinely"
- Never write "Not X but Y" — just write Y
- Voice: direct, confident, slightly philosophical

Code rules:
- Never modify content copy inside components — edit nodes.ts only
- Preserve custom cursor at all times
- Preserve parallax behavior
- Comment all TODO items clearly
- Confirm npm run build passes after each prompt
```