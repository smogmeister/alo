# Product Requirements Document (PRD)
## Design Extractor Web Application

**Version:** 1.0  
**Date:** 2025-01-27  
**Project:** Design Extractor - Web App

---

## 1. Executive Summary

This PRD outlines the requirements for a Next.js web application that allows users to extract and analyze design elements from websites. Users can paste a website URL, and the application will extract global CSS styles, UI components, design tokens, and layout structures. The extracted data is displayed in a comprehensive dashboard where users can filter by component type, design tokens, and source websites. All data is stored locally in the browser for privacy, with no authentication or backend infrastructure required.

---

## 2. Objectives

- Provide a simple interface for users to extract design inspiration from any website
- Extract comprehensive design data including CSS variables, typography, colors, spacing, components, and layout structures
- Display extracted data in an organized, searchable dashboard
- Enable filtering by component type, design tokens, and source websites
- Store all data locally in the browser (no backend required)
- Create a modern, intuitive user experience using Next.js, Tailwind CSS, and shadcn/ui

---

## 3. Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Storage:** Browser localStorage API
- **State Management:** React Context API or Zustand (optional)
- **Icon Library:** Lucide React
- **Hosting:** Static site deployment (Vercel, Netlify, etc.)

---

## 4. Functional Requirements

### 4.1 URL Input Page

#### 4.1.1 Link Bar Component

- **Location:** Main page (`/`)
- **Components:**
  - Large, prominent input field for URL entry
  - "Extract" or "Analyze" button
  - URL validation (must be valid HTTP/HTTPS URL)
  - Loading state during extraction
  - Error handling for invalid URLs or extraction failures

- **Functionality:**
  - User pastes or types website URL
  - Validates URL format before submission
  - Shows loading spinner during extraction process
  - Displays success/error messages
  - Redirects to dashboard or detail view after successful extraction

#### 4.1.2 Extraction Process

- **Method:** Client-side extraction using iframe
- **Flow:**
  1. User submits URL
  2. Application loads target URL in hidden iframe
  3. Once iframe loads, extract design data from iframe content
  4. Parse and structure extracted data
  5. Store in localStorage
  6. Navigate to dashboard or detail view

- **Limitations & Handling:**
  - CORS restrictions may prevent extraction from some sites
  - Display clear error message when extraction fails due to CORS
  - Provide helpful message explaining limitations
  - Optionally suggest alternative methods for restricted sites

### 4.2 Design Data Extraction

#### 4.2.1 CSS Style Extraction

Extract the same comprehensive design data as defined in the Chrome Extension PRD:

- **Global CSS Variables:**
  - All `:root` CSS custom properties
  - Categorized by type (colors, typography, spacing, shadows, etc.)

- **Computed Styles:**
  - Styles from `<html>` and `<body>` elements
  - Default font properties
  - Background colors and gradients
  - Default text colors

- **Media Queries:**
  - All `@media` rules from stylesheets
  - Breakpoint values
  - Responsive design patterns

#### 4.2.2 UI Component Detection

- **Semantic HTML Detection:**
  - Identify components by HTML tags (button, nav, form, article, etc.)
  - Extract component hierarchy and nesting

- **ARIA Role Detection:**
  - Extract elements with ARIA roles
  - Map roles to component types

- **Component Style Extraction:**
  For each detected component, extract:
  - Computed styles (colors, typography, spacing, dimensions, borders, shadows, effects)
  - Layout properties (display, flex, grid, position)
  - Component metadata (tag name, ARIA role, class names, text content, bounding box)

#### 4.2.3 Layout Structure Extraction

- DOM hierarchy and component nesting
- Parent-child relationships
- Detected layout patterns (header, hero, card grids, sidebars, footers, modals)

### 4.3 Data Storage Structure

#### 4.3.1 Capture Schema

Same schema as Chrome Extension PRD:

```typescript
interface DesignCapture {
  id: string; // Unique identifier (timestamp + random)
  timestamp: number; // Unix timestamp
  url: string; // Full URL of captured page
  domain: string; // Extracted domain
  title: string; // Page title
  
  // Global Styles
  globalStyles: {
    cssVariables: Record<string, string>;
    rootStyles: ComputedStyles;
    mediaQueries: MediaQuery[];
  };
  
  // Components
  components: Component[];
  
  // Layout
  layout: {
    structure: ComponentTree;
    patterns: string[];
  };
  
  // Screenshot (optional, base64)
  screenshot?: string;
}
```

#### 4.3.2 localStorage Organization

- **Storage Keys:**
  - `designCaptures`: Array of all DesignCapture objects
  - `captureIndex`: Index for quick lookups by domain, date, component type
  - `settings`: User preferences (theme, default view, etc.)

- **Storage Management:**
  - Implement storage quota checks
  - Provide option to clear old captures
  - Handle storage errors gracefully
  - Optional: Export/import functionality for backup

### 4.4 Dashboard Page

#### 4.4.1 Navigation & Layout

- **Route:** `/dashboard`
- **Header:**
  - App logo/name
  - Global search bar
  - Filter buttons/chips
  - Settings icon
  - Export button
  - Link to input page (`/`)

- **Main Content Area:**
  - Grid/list view toggle
  - Capture cards displaying:
    - Website thumbnail/screenshot (if available)
    - Domain name
    - Capture date/time
    - Preview of extracted color palette
    - Component count
    - Quick actions (view details, export, delete)

#### 4.4.2 Filtering System

- **Filter by Component Type:**
  - Dropdown or multi-select
  - Filter captures that contain specific component types (button, card, nav, form, etc.)
  - Show count of matching captures

- **Filter by Design Tokens:**
  - **Colors:** Filter by color palette (search by hex code or color name)
  - **Typography:** Filter by font families used
  - **Spacing:** Filter by spacing system patterns
  - **Shadows:** Filter by shadow styles

- **Filter by Website:**
  - Dropdown showing all unique domains
  - Filter captures from specific websites
  - Group captures by domain

- **Combined Filters:**
  - Multiple filters can be active simultaneously
  - Clear all filters button
  - Show active filter count

#### 4.4.3 Search Functionality

- **Global Search:**
  - Search across all captures
  - Search by URL, domain, page title
  - Search within component text content
  - Real-time filtering as user types

#### 4.4.4 Capture Detail View

- **Route:** `/dashboard/[captureId]`
- **Tabs/Sections:**

  - **Overview Tab:**
    - Full page screenshot (if available)
    - URL and metadata
    - Color palette visualization (swatches with hex codes)
    - Typography samples (font families, sizes, weights)
    - Spacing system display
    - Design tokens summary

  - **Components Tab:**
    - List/grid of all detected components
    - Filterable by component type
    - Each component shows:
      - Visual preview (styled representation or screenshot)
      - Extracted styles (formatted CSS)
      - HTML structure (code block)
      - Copy CSS button
      - Component dimensions and position

  - **Styles Tab:**
    - CSS variables display (organized by category)
    - Global styles
    - Media queries with breakpoints
    - Exportable CSS code block
    - Copy to clipboard functionality

  - **Layout Tab:**
    - Component tree visualization (collapsible)
    - Layout patterns identified
    - DOM structure tree view
    - Visual hierarchy representation

### 4.5 Export Functionality

- **Export Options:**
  - **JSON Export:** Complete capture data as downloadable JSON file
  - **CSS Export:** Extracted CSS variables and styles as CSS file
  - **Component Library:** Export individual components as reusable CSS/HTML
  - **Design Tokens:** Export as design token format (JSON)

- **Bulk Export:**
  - Select multiple captures from dashboard
  - Export all selected in one operation
  - Option to combine into single file or separate files per capture

---

## 5. Technical Specifications

### 5.1 Next.js App Structure

```
design-extractor/
├── app/
│   ├── layout.tsx (root layout)
│   ├── page.tsx (URL input page)
│   ├── dashboard/
│   │   ├── page.tsx (dashboard list view)
│   │   └── [captureId]/
│   │       └── page.tsx (capture detail view)
│   └── globals.css
├── components/
│   ├── url-input/
│   │   ├── url-input-bar.tsx
│   │   └── extraction-status.tsx
│   ├── dashboard/
│   │   ├── capture-card.tsx
│   │   ├── capture-grid.tsx
│   │   ├── filters.tsx
│   │   ├── search-bar.tsx
│   │   └── filter-chips.tsx
│   ├── capture-detail/
│   │   ├── overview-tab.tsx
│   │   ├── components-tab.tsx
│   │   ├── styles-tab.tsx
│   │   └── layout-tab.tsx
│   └── ui/ (shadcn components)
├── lib/
│   ├── extraction/
│   │   ├── style-extractor.ts
│   │   ├── component-detector.ts
│   │   ├── layout-analyzer.ts
│   │   └── extraction-engine.ts
│   ├── storage/
│   │   ├── storage.ts (localStorage wrapper)
│   │   └── storage-utils.ts
│   ├── export/
│   │   ├── json-export.ts
│   │   ├── css-export.ts
│   │   └── token-export.ts
│   └── utils.ts
├── types/
│   └── capture.ts (TypeScript interfaces)
└── hooks/
    ├── use-extraction.ts
    ├── use-captures.ts
    └── use-filters.ts
```

### 5.2 Extraction Implementation

#### 5.2.1 Iframe-Based Extraction

- **Setup:**
  - Create hidden iframe element
  - Set iframe `src` to target URL
  - Wait for iframe `load` event
  - Access iframe content via `contentWindow` and `contentDocument`

- **CORS Handling:**
  - Try to access iframe content
  - Catch CORS errors gracefully
  - Display user-friendly error message
  - Suggest alternative approaches for restricted sites

- **Extraction Script:**
  - Inject extraction script into iframe (if accessible)
  - Or use postMessage API to communicate with iframe
  - Extract styles, components, and layout data
  - Send data back to parent window

#### 5.2.2 Style Extraction Logic

- Use `getComputedStyle()` API on iframe elements
- Parse stylesheets to extract CSS variables
- Extract media queries from stylesheet rules
- Handle cross-origin stylesheet restrictions

#### 5.2.3 Component Detection Logic

- Traverse DOM tree in iframe
- Identify semantic HTML elements
- Extract ARIA roles
- Group related elements
- Extract computed styles for each component

### 5.3 State Management

- **React Context:**
  - `CaptureContext`: Manages all captures
  - `FilterContext`: Manages active filters
  - `ThemeContext`: Manages theme (if dark mode supported)

- **Local State:**
  - Component-level state for UI interactions
  - Form state for URL input
  - Loading states for async operations

### 5.4 Routing

- **Next.js App Router:**
  - `/` - URL input page
  - `/dashboard` - Dashboard list view
  - `/dashboard/[captureId]` - Capture detail view
  - Dynamic routes for capture details

### 5.5 Performance Considerations

- **Lazy Loading:**
  - Code-split dashboard and detail views
  - Lazy load capture cards
  - Virtual scrolling for large capture lists

- **Optimization:**
  - Debounce search input
  - Memoize filtered results
  - Cache extracted data in localStorage
  - Optimize re-renders with React.memo

- **Storage Management:**
  - Limit number of stored captures (configurable)
  - Auto-delete oldest captures when limit reached
  - Compress large data (screenshots) if stored

---

## 6. User Experience Flow

### 6.1 First-Time User Flow

1. User visits application
2. Sees URL input page with link bar
3. Pastes or types website URL
4. Clicks "Extract" button
5. Sees loading state
6. Extraction completes (or fails with error)
7. Redirected to dashboard showing new capture
8. Can view details, filter, or extract more sites

### 6.2 Returning User Flow

1. User visits application
2. Sees URL input page
3. Can immediately extract new URL or navigate to dashboard
4. Dashboard shows all previous captures
5. Can filter, search, or view details of any capture

### 6.3 Extraction Flow

1. User submits URL
2. Application validates URL
3. Creates hidden iframe with target URL
4. Waits for iframe to load
5. Attempts to extract data from iframe
6. If successful: structures data and stores in localStorage
7. If failed (CORS): displays error message with explanation
8. Navigates to dashboard or detail view

### 6.4 Dashboard Interaction Flow

1. User views dashboard with all captures
2. Can use search bar to find specific captures
3. Can apply filters (component type, tokens, website)
4. Can click on capture card to view details
5. In detail view, can browse tabs (Overview, Components, Styles, Layout)
6. Can export data in various formats
7. Can delete captures
8. Can return to dashboard or extract new URL

---

## 7. Design Specifications

### 7.1 URL Input Page Design

- **Layout:**
  - Centered, single-column layout
  - Large, prominent URL input field
  - Clear call-to-action button
  - Minimal, focused design
  - Optional: Recent captures or examples below input

- **Components:**
  - Use shadcn Input component for URL field
  - Use shadcn Button for extract action
  - Loading spinner during extraction
  - Error/success toast notifications

### 7.2 Dashboard Design

- **Layout:**
  - Header with search and filters
  - Main content area with grid/list of captures
  - Responsive grid (1-4 columns based on screen size)
  - Sidebar optional for filters (desktop)

- **Capture Cards:**
  - Card component from shadcn/ui
  - Thumbnail/screenshot preview
  - Domain name and date
  - Color palette preview (small swatches)
  - Component count badge
  - Hover effects
  - Quick action buttons

- **Filters:**
  - Dropdown menus or multi-select components
  - Filter chips showing active filters
  - Clear filters button
  - Filter count indicator

### 7.3 Detail View Design

- **Layout:**
  - Tabs for different views (Overview, Components, Styles, Layout)
  - Full-width content area
  - Back button to dashboard
  - Export button in header

- **Component Display:**
  - Grid or list of components
  - Visual previews
  - Expandable sections for styles
  - Code blocks with syntax highlighting
  - Copy buttons for code snippets

### 7.4 Color Scheme & Typography

- Use Tailwind CSS default color palette
- Support light/dark mode (optional)
- Consistent spacing using Tailwind spacing scale
- Clear typography hierarchy
- Accessible color contrasts

---

## 8. Error Handling

### 8.1 Extraction Errors

- **Invalid URL:**
  - Validate before submission
  - Show inline error message
  - Suggest URL format

- **CORS Restrictions:**
  - Clear error message explaining limitation
  - Suggest alternative methods
  - Option to try again

- **Network Errors:**
  - Handle timeout errors
  - Handle connection failures
  - Retry option

- **Extraction Failures:**
  - Graceful degradation
  - Partial data extraction if possible
  - Clear error messaging

### 8.2 Storage Errors

- **Quota Exceeded:**
  - Detect storage quota limits
  - Prompt user to clear old captures
  - Suggest export before clearing

- **Storage Unavailable:**
  - Handle localStorage disabled scenarios
  - Provide alternative (session storage warning)
  - Clear error messaging

---

## 9. Success Criteria

- [ ] Users can successfully paste URLs and extract design data
- [ ] Extraction works for websites that allow iframe access (CORS permitting)
- [ ] All design elements are extracted accurately (CSS, components, layout)
- [ ] Dashboard displays all captures in organized, searchable format
- [ ] Filtering works correctly for components, tokens, and websites
- [ ] Detail view shows comprehensive capture information
- [ ] Export functionality works for all supported formats
- [ ] Data persists in localStorage across sessions
- [ ] Application is responsive and works on mobile devices
- [ ] Error handling provides clear, helpful messages
- [ ] UI is intuitive and follows modern design patterns

---

## 10. Limitations & Known Issues

### 10.1 CORS Restrictions

- **Issue:** Many websites block iframe embedding and cross-origin access
- **Impact:** Extraction will fail for sites with strict CORS policies
- **Mitigation:**
  - Clear error messaging
  - Document limitations in UI
  - Future: Consider server-side proxy option

### 10.2 Client-Side Only

- **Issue:** No backend means no server-side processing
- **Impact:** Limited by browser capabilities and CORS
- **Mitigation:**
  - Leverage browser APIs effectively
  - Provide clear user guidance

### 10.3 Storage Limitations

- **Issue:** localStorage has size limits (~5-10MB typically)
- **Impact:** Limited number of captures with screenshots
- **Mitigation:**
  - Optional screenshot storage
  - Compression for large data
  - Export/clear functionality

---

## 11. Out of Scope (v1.0)

- User authentication and accounts
- Cloud sync or backup
- Server-side extraction/proxy
- Real-time collaboration
- Sharing captures with others
- AI-powered design analysis
- Component code generation
- Integration with design tools
- Browser extension integration
- Mobile app version

---

## 12. Future Enhancements

- **Server-Side Extraction:**
  - Next.js API routes with Puppeteer/Playwright
  - Proxy service for CORS bypass
  - More reliable extraction for all sites

- **Enhanced Features:**
  - Screenshot capture and storage
  - Design system detection
  - Pattern recognition
  - Comparison tool (side-by-side)
  - Collections/folders for organizing captures
  - Tags and annotations
  - Version history (track changes to same URL)

- **User Experience:**
  - Dark mode toggle
  - Customizable dashboard layout
  - Keyboard shortcuts
  - Bulk operations
  - Import/export all data

- **Integration:**
  - Browser extension companion
  - Design tool plugins
  - API for programmatic access

---

## 13. Dependencies

### External Dependencies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lucide React (icons)

### Potential Additional Dependencies

- Zustand or Jotai (state management, if needed)
- React Hook Form (form handling, if needed)
- date-fns (date formatting)
- Prism.js or similar (syntax highlighting for code blocks)
- React Virtual (virtual scrolling for large lists)

---

## 14. Questions & Assumptions

### Assumptions Made

1. Users understand that CORS restrictions may limit extraction on some sites
2. LocalStorage is sufficient for data storage (no cloud sync needed)
3. Iframe approach is acceptable despite CORS limitations
4. Users will primarily use on desktop/laptop (mobile support is nice-to-have)
5. No authentication means data is device-specific

### Clarifications Received

1. **Extraction Method:** Client-side using iframe approach
2. **Authentication:** No authentication required
3. **Storage:** Browser localStorage only
4. **App Structure:** Multi-page application
5. **Technical Stack:** Next.js, Tailwind CSS v4, shadcn/ui

### Remaining Open Questions

1. Should the app attempt to capture screenshots of the pages? (May increase storage usage significantly)
2. What should happen when localStorage quota is exceeded? (Auto-delete oldest, prompt user, or prevent new captures?)
3. Should there be a limit on number of captures stored? (If yes, what's the default limit?)
4. Do you want to support dark mode in v1.0?
5. Should the iframe be visible to the user during extraction, or completely hidden?
6. What should be the default view on dashboard - grid or list?

---

**End of PRD**

