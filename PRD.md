# Product Requirements Document (PRD)
## Personalized Link in Bio Website

**Version:** 1.0  
**Date:** 2025-01-27  
**Project:** Smog - Link in Bio Website

---

## 1. Executive Summary

This PRD outlines the requirements for a personalized "Link in Bio" website, similar to Beacons.ai and Linktree, designed for personal use without user accounts or backend infrastructure. The site will display region-specific content cards based on the user's geographic location, with the ability to manually override the region selection.

---

## 2. Objectives

- Create a modern, responsive "Link in Bio" website for personal use
- Display region-specific card content based on user location
- Enable easy content management through a single master JSON file
- Provide a profile header with personal information and social media links
- Ensure GDPR compliance with cookie consent banner for European users
- Maintain a clean, ecommerce-like card layout across all devices

---

## 3. Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Fonts:** Plus Jakarta Sans (body), Zodiak (headings)
- **Hosting:** Static site (no backend required)

---

## 4. Functional Requirements

### 4.1 Profile Header

The profile header appears at the top of the page and includes:

- **Profile Image**
  - Displayed prominently (e.g., circular avatar)
  - Configurable via JSON or environment variables
  
- **Name**
  - Display name/title
  - Styled with Zodiak serif font (h1)
  
- **Description**
  - Short bio/description text (1-2 sentences)
  - Styled with Plus Jakarta Sans
  
- **Social Media Icons**
  - Clickable icon buttons linking to social profiles
  - Supported platforms: Configurable (user will specify)
  - Icons from lucide-react or similar icon library
  - Open in new tab/window

**Content Source:** JSON file or separate profile configuration

### 4.2 Region Selector

- **Location:** Top of the page (above or within profile header)
- **Type:** Dropdown/Select component
- **Options:**
  - USA (default/fallback)
  - Canada
  - UK
  - Germany
  - France

- **Functionality:**
  - Automatically detects region on initial load via server-side IP detection
  - Allows manual override by user selection
  - Selection persists in localStorage
  - When region is changed, cards update to show region-specific content
  - If user's region doesn't match supported regions, default to USA

**Technical Implementation:**
- Server-side region detection using Next.js middleware/headers
- Client-side state management for manual selection
- localStorage persistence for user preference

### 4.3 Cards System

#### 4.3.1 Card Structure

Each card contains:
- **Priority/Order** (number) - controls display order
- **Title** (text)
- **Image** (external URL) - square aspect ratio (1:1)
- **Link** (external URL)

#### 4.3.2 Content Management

- **Master JSON File:** Single source of truth for all card content
- **Structure:** All regions share the same card IDs/keys, but content (title, image, link) varies by region
- **Location:** `/data/cards.json` or similar

**JSON Structure Example:**
```json
{
  "cards": [
    {
      "id": "card-1",
      "priority": 1,
      "regions": {
        "USA": {
          "title": "US Title",
          "image": "https://example.com/us-image.jpg",
          "link": "https://example.com/us-link"
        },
        "Canada": {
          "title": "Canadian Title",
          "image": "https://example.com/ca-image.jpg",
          "link": "https://example.com/ca-link"
        },
        "UK": {
          "title": "UK Title",
          "image": "https://example.com/uk-image.jpg",
          "link": "https://example.com/uk-link"
        },
        "Germany": {
          "title": "German Title",
          "image": "https://example.com/de-image.jpg",
          "link": "https://example.com/de-link"
        },
        "France": {
          "title": "French Title",
          "image": "https://example.com/fr-image.jpg",
          "link": "https://example.com/fr-link"
        }
      }
    }
  ]
}
```

**Card Ordering:**
- Cards are sorted by `priority` field (ascending order)
- Lower priority numbers appear first
- If priority is missing, cards maintain JSON order

#### 4.3.3 Card Layout

- **Responsive Design:**
  - **Desktop (≥1024px):** 4 cards per row
  - **Tablet (768px - 1023px):** 3 cards per row
  - **Mobile (<768px):** 2 cards per row

- **Card Design:**
  - Ecommerce-store-like layout
  - Hover effects (optional but recommended)
  - Card should be clickable (entire card links to destination)
  - Image on top, title below
  - Images use square aspect ratio (1:1) for consistent layout
  - Clean, modern styling using shadcn/ui Card component

- **Loading States:**
  - Skeleton loaders displayed while images/cards are loading
  - Skeleton loaders match final card dimensions
  - Smooth transition from skeleton to actual content

- **Behavior:**
  - Cards open links in new tab/window
  - Images should have loading states with skeleton placeholders
  - Error handling for broken images
  - Cards should be visually distinct with proper spacing

### 4.4 Footer

Small footer at the bottom of the page containing:

- **Legal Links:**
  - Imprint (placeholder page - `/imprint`)
  - Data Privacy (placeholder page - `/privacy`)
  
- **Styling:** Minimal, small text, unobtrusive

### 4.5 Cookie Consent Banner

- **Purpose:** GDPR compliance for European users
- **Display Logic:**
  - Show to all users initially
  - Respect user's choice (accept/decline)
  - Store consent in localStorage
  - If consent already given, don't show again
  
- **Content:** Standard GDPR cookie consent text
- **Actions:**
  - Accept button
  - Decline button (optional)
  - Link to privacy policy
  
- **Implementation:** Use a cookie consent library or custom component

---

## 5. Technical Specifications

### 5.1 Region Detection

**Server-Side Implementation:**
- Use Next.js middleware or server component to read request headers
- Extract IP address from headers (consider proxies, CDNs)
- Map IP to region (using geolocation logic)
- Pass region as prop or via context to client components

**Region Mapping:**
- USA: Default fallback
- Canada: CA
- UK: GB
- Germany: DE
- France: FR
- All others: Default to USA

### 5.2 Data Management

**Master JSON File:**
- Location: `/data/cards.json` or `/lib/data/cards.json`
- Structure: Hierarchical with region-specific variations
- Loading: Import directly in Next.js (static import for build-time, or fetch at runtime)
- Since no backend, JSON should be included in build

**Profile Configuration:**
- Separate JSON or TypeScript file for profile header content
- Location: `/data/profile.json` or similar

### 5.3 State Management

- **Region Selection:** 
  - React state for current selection
  - localStorage for persistence
  - Sync with server-detected region on initial load

- **Cookie Consent:**
  - localStorage flag
  - React state for banner visibility

### 5.4 Performance Considerations

- Optimize images (use Next.js Image component with external URLs)
- Square aspect ratio (1:1) for all card images for layout consistency
- Skeleton loaders during image loading for better perceived performance
- Lazy loading for card images
- Static generation where possible (ISR or SSG)
- Minimize client-side JavaScript

### 5.5 Accessibility

- Semantic HTML
- Keyboard navigation support
- ARIA labels where needed
- Proper heading hierarchy
- Alt text for images
- Focus states for interactive elements

---

## 6. File Structure

```
alo/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (main landing page)
│   ├── imprint/
│   │   └── page.tsx (placeholder)
│   ├── privacy/
│   │   └── page.tsx (placeholder)
│   └── globals.css
├── components/
│   ├── profile-header.tsx
│   ├── region-selector.tsx
│   ├── card-grid.tsx
│   ├── card.tsx
│   ├── card-skeleton.tsx
│   ├── cookie-banner.tsx
│   └── footer.tsx
├── lib/
│   ├── utils.ts
│   ├── region-detection.ts (server-side region logic)
│   └── cards.ts (card data loading/parsing)
├── data/
│   ├── cards.json (master card content)
│   └── profile.json (profile header content)
└── types/
    └── cards.ts (TypeScript types)
```

---

## 7. Design Specifications

### 7.1 Visual Design

- **Layout:** Clean, centered, single-column layout
- **Colors:** Use existing theme from `globals.css`
- **Typography:** 
  - Headings: Zodiak serif (700 weight)
  - Body: Plus Jakarta Sans
- **Spacing:** Consistent padding/margins using Tailwind spacing scale

### 7.2 Responsive Breakpoints

- **Mobile:** < 768px (2 cards/row)
- **Tablet:** 768px - 1023px (3 cards/row)
- **Desktop:** ≥ 1024px (4 cards/row)

### 7.3 Component Styling

- Use shadcn/ui components as base
- Consistent border radius (0.7rem from theme)
- Card shadows from existing theme
- Hover states with subtle transitions

---

## 8. User Experience Flow

1. **Initial Load:**
   - Server detects user region from IP
   - Page loads with region-specific cards
   - Cookie banner appears (if not previously consented)

2. **Region Change:**
   - User selects different region from dropdown
   - Cards update immediately to show new region's content
   - Selection saved to localStorage

3. **Return Visit:**
   - Check localStorage for saved region preference
   - If saved preference exists, use it (unless server detects different region - could prompt user)
   - Otherwise, detect from IP as on initial load

4. **Cookie Consent:**
   - User accepts/declines cookies
   - Preference saved to localStorage
   - Banner dismissed and doesn't reappear

---

## 9. Content Requirements

### 9.1 Required Content

- **Profile Information:**
  - Name
  - Description
  - Profile image URL
  - Social media links (platforms TBD)

- **Card Content:**
  - Minimum 1 card per region
  - All regions must have same card structure (same IDs)
  - Title, image URL, and link URL for each card per region

- **Legal Pages:**
  - Imprint page (placeholder content)
  - Privacy page (placeholder content)

### 9.2 Content Maintenance

- Update JSON file to modify content
- No CMS or admin interface needed
- Direct file editing or version control

---

## 10. Compliance & Legal

### 10.1 GDPR Compliance

- Cookie consent banner (required for EU users)
- Privacy policy page
- Data handling transparency (IP detection is server-side, no storage of personal data beyond localStorage)

### 10.2 Required Pages

- **Imprint:** Legal information (placeholder)
- **Privacy Policy:** Data handling information (placeholder)

---

## 11. Out of Scope

- User authentication/accounts
- Backend/server infrastructure
- Database
- Admin dashboard/CMS
- Analytics/tracking (unless basic and GDPR compliant)
- Multi-language support (only region-specific content, not full translation)
- Image upload/management UI

---

## 12. Success Criteria

- [ ] Site loads with region-appropriate content
- [ ] Region selector functions correctly and persists selection
- [ ] Cards display correctly across all breakpoints (4/3/2 per row)
- [ ] Profile header displays all required elements
- [ ] Cookie banner appears and functions correctly
- [ ] Footer links work to placeholder legal pages
- [ ] All content manageable via JSON file
- [ ] Site is fast, accessible, and responsive
- [ ] No backend dependencies

---

## 13. Future Considerations (Optional Enhancements)

- Analytics integration (GDPR compliant)
- Dark mode toggle (theme already supports it)
- Card ordering/sorting
- Multiple card categories/sections
- Animation/transitions
- SEO optimization
- Social sharing meta tags

---

## 14. Questions & Assumptions

### Assumptions Made:

1. All regions will have the same number of cards (same card IDs)
2. Region detection uses Next.js server-side capabilities
3. Images are hosted externally (URLs in JSON)
4. Social media platforms will be specified later
5. Legal pages are placeholders to be filled in later

### Clarifications Received:

1. **Card Ordering:** Cards use priority field for ordering (lower numbers first)
2. **Loading States:** Skeleton loaders for better UX
3. **Image Aspect Ratio:** Square (1:1) for all card images

### Remaining Open Questions:

1. What social media platforms should be included?
    Answer: YouTube, Instagram, TikTok, Pinterest
2. Should the site support dark mode by default or have a toggle?
    Answer: Have a 3 way toggle. System,, Light, Dark. By default use system

---

## 15. Dependencies

### External Dependencies:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- lucide-react (icons)

### Potential Additional Dependencies:

- Cookie consent library (optional, can be custom)
- Image optimization utilities (Next.js Image component handles this)

---

**End of PRD**

