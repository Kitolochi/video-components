# Curvance Brand Assets Manifest

Scraped from: https://www.curvance.com/
Date: 2026-03-17

## Brand Colors

### Primary Colors (from CSS Variables)
```css
:root {
  /* Primary Brand Colors */
  --color-accent: #5740ce;           /* Purple accent - primary brand color */
  --accent: #5740ce;
  --color-primary: #06001a;          /* Near-black text */
  --text-primary: #06001a;
  --color-foreground: #06001a;

  /* Backgrounds */
  --color-background: #fff;          /* White background */
  --background: #fff;
  --color-surface: #f9f9fb;          /* Off-white surface */
  --surface: #f9f9fb;
  --color-secondary: #f6f6f9;        /* Light gray secondary */
  --secondary: #f6f6f9;

  /* Neutrals */
  --color-element: #ebebeb;          /* Light element color */
  --element: #ebebeb;
  --color-border: #f0f0f5;           /* Subtle border */
  --border: #f0f0f5;
  --border-secondary: #f3eeff;       /* Purple-tinted border */
  --color-muted-foreground: #656375; /* Muted text */
  --muted-foreground: #656375;

  /* Absolute values */
  --color-white: #fff;
  --color-black: #000;
}
```

### Computed Colors (RGB)
- `rgb(6, 0, 26)` - Near-black (primary text)
- `rgb(0, 0, 0)` - True black
- `rgb(246, 246, 249)` - Light gray background
- `rgb(240, 240, 245)` - Border gray
- `rgb(249, 249, 251)` - Surface gray
- `rgb(242, 242, 243)` - Element gray
- `rgb(255, 255, 255)` - White
- `rgb(87, 64, 206)` - **Primary purple accent** (brand signature)
- `rgb(101, 99, 117)` - Muted text gray

### Brand Color Palette Summary
```css
/* For use in video projects */
--curvance-purple: #5740ce;
--curvance-dark: #06001a;
--curvance-white: #ffffff;
--curvance-light-gray: #f9f9fb;
--curvance-muted: #656375;
```

## Typography

### Font Family
- **Primary Font:** "Work Sans", sans-serif
- **Mono Font:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace

### Font Imports
No Google Fonts CDN detected (likely using system fonts or self-hosted)

### Font Weights
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Text Sizes (from CSS Variables)
```css
--text-sm: 0.875rem;      /* 14px */
--text-base: 1rem;        /* 16px */
--text-lg: 1.125rem;      /* 18px */
--text-xl: 1.25rem;       /* 20px */
--text-2xl: 1.5rem;       /* 24px */
--text-3xl: 1.875rem;     /* 30px */
--text-4xl: 2.25rem;      /* 36px */
--text-5xl: 3rem;         /* 48px */
--text-6xl: 3.75rem;      /* 60px */
--text-8xl: 6rem;         /* 96px */
```

## Logo Files

### Primary Logo
- **File:** `curvance-logo-black.svg`
- **Location:** https://www.curvance.com/curvance-logo-black.svg
- **Dimensions:** 144×24px
- **Usage:** Main header logo
- **Format:** SVG (vector)

### Icon/Symbol
- **File:** `curvance-icon.svg`
- **Location:** https://www.curvance.com/images/curvance.svg
- **Dimensions:** 44×44px
- **Usage:** Favicon, app icon, small branding
- **Format:** SVG (vector)

### Special Graphics
- **File:** `floppy-disk.png`
- **Location:** https://www.curvance.com/_next/image?url=%2Fimages%2Ffloppy.png
- **Usage:** Footer branding element
- **Format:** PNG

## Feature Icons

All icons are SVG format, 34×34px:

1. **icon-wallet.svg** - Non-custodial wallet feature
2. **icon-comp.svg** - Composability feature
3. **icon-give.svg** - Leverage feature
4. **icon-users.svg** - User/community icon (40×40px)

## Branding / Partner Logos

All security audit partner logos (SVG):

1. **branding-trail-of-bits.svg** - Trail of Bits security audit logo (200×200px)
2. **branding-spearbit.svg** - Spearbit security audit logo (200×200px)
3. **branding-trust-sec.svg** - TrustSec security audit logo (200×200px)

## Social Media Icons

Small SVG icons (24×38px):

1. **social-twitter.svg** - X/Twitter icon
2. **social-discord.svg** - Discord icon
3. **social-telegram.svg** - Telegram icon
4. **social-github.svg** - GitHub icon

## Textures / Decorative Elements

- **noise-grid-white.svg** - Noise texture overlay (19KB SVG)
  - Used for card hover effects
  - Dimensions: 482×408px (repeatable pattern)

## Community / Marketing Images

All images are optimized via Next.js Image (w=3840, q=75):

1. **community-1.png** - Community collage image (66KB PNG)
2. **community-2.jpeg** - Community event photo (560KB JPEG)
3. **community-3.jpeg** - Community gathering (170KB JPEG)
4. **community-4.jpg** - Team/community photo (71KB JPEG)
5. **community-5.jpeg** - Community event (288KB JPEG)
6. **community-6.jpeg** - Community photo (227KB JPEG)
7. **community-7.jpeg** - Community gathering (670KB JPEG)
8. **community-8.png** - Digital/abstract community visual (2.4MB PNG - large file)
9. **community-9.jpeg** - Community event (101KB JPEG)

**Usage Notes:**
- These images show community, events, and team culture
- Used in the "Curvance starts with you" section
- Mix of photos and abstract digital art
- community-8.png is unusually large (2.4MB) - consider optimization

## Product Screenshots

### Full App Screenshots
1. **app-dashboard-screenshot.png** - Full deposit dashboard view
   - Shows: Total Deposits ($60.4M), Active Loans ($22.3M)
   - Features: Deposit tab active, list of collateral/loan pairs
   - Primary purple CTA buttons visible

2. **app-borrow-screenshot.png** - Full borrow dashboard view
   - Shows: Borrow tab active, eligible/ineligible positions
   - "Connect wallet" state visible
   - Same header and stats as deposit view

3. **curvance-homepage-full.png** - Full marketing homepage
   - Hero: "Click less, earn more."
   - Features section, security audits, community stats
   - Complete landing page capture for reference

**Usage Recommendations:**
- Use these for product demo sections
- Crop specific UI elements (cards, buttons, stats) for feature highlights
- Reference for color palette in actual use
- Shows the app in production state

## File Organization

```
curvance-assets/
├── MANIFEST.md (this file)
├── curvance-logo-black.svg (primary logo)
├── curvance-icon.svg (favicon/icon)
├── floppy-disk.png (footer graphic)
├── icon-wallet.svg
├── icon-comp.svg
├── icon-give.svg
├── icon-users.svg
├── branding-trail-of-bits.svg
├── branding-spearbit.svg
├── branding-trust-sec.svg
├── noise-grid-white.svg (texture)
├── social-twitter.svg
├── social-discord.svg
├── social-telegram.svg
├── social-github.svg
├── community-1.png
├── community-2.jpeg
├── community-3.jpeg
├── community-4.jpg
├── community-5.jpeg
├── community-6.jpeg
├── community-7.jpeg
├── community-8.png (2.4MB - consider optimization)
├── community-9.jpeg
├── app-dashboard-screenshot.png
├── app-borrow-screenshot.png
└── curvance-homepage-full.png
```

## Design System Summary

### Visual Language
- **Aesthetic:** Clean, modern, purple-accented
- **Style:** Minimalist with subtle gradients and noise textures
- **Mood:** Professional, trustworthy, tech-forward

### Key Design Tokens
```css
/* Typography */
font-family: 'Work Sans', sans-serif;
font-weight-semibold: 600;
font-weight-bold: 700;
tracking-tight: -0.025em;

/* Spacing */
--spacing: 0.25rem; /* 4px base unit */

/* Radius */
--radius-md: 0.375rem;
--radius-lg: 0.5rem;
--radius-xl: 0.75rem;
--radius-2xl: 1rem;
--radius-3xl: 1.5rem;
--radius-4xl: 2rem;

/* Transitions */
--default-transition-duration: 0.15s;
--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

## Recommended Video Usage

### Color Scheme for Video
1. **Primary:** `#5740ce` (purple) for CTAs, highlights, accents
2. **Background:** `#06001a` (near-black) for dark sections
3. **Text:** `#ffffff` (white) on dark, `#06001a` on light
4. **Surfaces:** `#f9f9fb` (off-white) for light sections
5. **Accents/Borders:** `#656375` (muted gray) for subtle elements

### Typography for Video
- **Headings:** Work Sans Bold (700), purple or white
- **Body:** Work Sans Medium (500-600), white or muted gray
- **Hero Size:** 48-96px (--text-5xl to --text-8xl)
- **Feature Text:** 24-36px (--text-2xl to --text-4xl)
- **Body Copy:** 16-20px (--text-base to --text-xl)

### Logo Usage
- Use `curvance-logo-black.svg` on light backgrounds
- For dark backgrounds, may need to create white version or use icon
- Icon (`curvance-icon.svg`) works well as animated element

### Product Screenshots
- Use `app-dashboard-screenshot.png` for "earn yield" messaging
- Use `app-borrow-screenshot.png` for "leverage" messaging
- Crop specific cards/stats for feature highlights
- Apply subtle zoom/pan animations

### Community Section
- `community-*.jpeg` files work for "user testimonial" or "community" scenes
- Mix of people and abstract visuals
- **Warning:** community-8.png is 2.4MB - optimize before use in video

## Brand Voice (inferred from copy)

- **Tone:** Direct, confident, accessible
- **Key Messages:**
  - "Click less, earn more"
  - "Tap into instant liquidity"
  - "Everything you need in one place"
  - "Maintain full control" (non-custodial)
- **Value Props:** Simplicity, composability, security, yield optimization
