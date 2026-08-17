---
name: Lula Credit Operations Design System
colors:
  primary: '#0F253B'
  primary-container: '#1A3A54'
  primary-light: '#1A3A54'
  on-primary: '#FFFFFF'
  accent: '#FF6D63'
  accent-hover: '#E85B51'
  accent-subtle: '#FFF0EE'
  sky-blue: '#61B8D8'
  sky-blue-light: '#EAF6FB'
  blue-action: '#268FB6'
  surface: '#F5F7F9'
  surface-card: '#FFFFFF'
  surface-card-hover: '#F8FCFE'
  on-surface: '#0F253B'
  on-surface-variant: '#1A1A1A'
  text-primary: '#1A1A1A'
  text-muted: 'rgba(0, 0, 0, 0.5)'
  muted: '#5A6B76'
  subtle: '#839098'
  border: 'rgba(0, 0, 0, 0.1)'
  border-subtle: '#CFD8DD'
  border-light: '#E2EAF0'
  outline: 'rgba(207, 216, 221, 0.7)'
  success: '#1AAE4E'
  success-bg: '#E8F8EE'
  warning: '#FCB900'
  warning-bg: '#FFF8E6'
  danger: '#FF274B'
  danger-bg: '#FFEAEF'
typography:
  display-lg:
    fontFamily: Termina, Montserrat, Proxima Nova, sans-serif
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Termina, Montserrat, Proxima Nova, sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Termina, Montserrat, Proxima Nova, sans-serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Proxima Nova, Montserrat, DM Sans, sans-serif
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  title-md:
    fontFamily: Proxima Nova, Montserrat, DM Sans, sans-serif
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Proxima Nova, Montserrat, DM Sans, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Proxima Nova, Montserrat, DM Sans, sans-serif
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Proxima Nova, Montserrat, DM Sans, sans-serif
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Proxima Nova, Montserrat, DM Sans, sans-serif
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Proxima Nova, Montserrat, DM Sans, sans-serif
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  card: 16px
  pill: 100px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  header-height: 70px
  sidebar-width: 260px
---

# Lula Credit Operations Dashboard — Design Specification

## 1. Brand Tokens & brand.css Specification

The design adheres directly to Lula's official `brand.css` guidelines and design language:

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');

/* Brand font is Proxima Nova. Montserrat is the closest available substitute. */
:root {
  --color-primary: #0F253B;
  --color-primary-light: #1A3A54;
  --color-surface: #F5F7F9;
  --color-surface-white: #FFFFFF;
  --color-text: #1A1A1A;
  --color-text-muted: rgba(0, 0, 0, 0.5);
  --color-border: rgba(0, 0, 0, 0.1);
  --font-sans: 'Proxima Nova', 'Montserrat', system-ui, sans-serif;
  
  /* Lula Accent & Data Visualization Tokens */
  --color-accent: #FF6D63;
  --color-accent-hover: #E85B51;
  --color-sky-blue: #61B8D8;
  --color-blue: #268FB6;
  --color-risk-low: #1AAE4E;
  --color-risk-med: #D97706;
  --color-risk-high: #FF274B;
  --color-risk-pending: #64748B;
}
```

### Color Palette Summary:
- **`--color-primary` (`#0F253B`)**: Lula Midnight Navy — represents stability, authority, and trust. Used for headers, primary badges, navigation, and key headings.
- **`--color-primary-light` (`#1A3A54`)**: Dark card sub-surfaces, hover states on primary navigation.
- **`--color-accent` (`#FF6D63`)**: Vibrant Coral Orange — primary call-to-action color, attention alerts, and focal points.
- **`--color-surface` (`#F5F7F9`)**: Canvas background, soft neutral tone preventing eye fatigue during lengthy credit assessment reviews.
- **`--color-surface-white` (`#FFFFFF`)**: Card surfaces and elevated containers.
- **`--color-text` (`#1A1A1A`)**: High-contrast body text for maximum readability.
- **`--color-text-muted` (`rgba(0, 0, 0, 0.5)`)**: Subtext, labels, timestamps, and secondary metadata.
- **`--color-border` (`rgba(0, 0, 0, 0.1)`)**: Crisp, subtle container boundaries.

---

## 2. Layout & Navigation Hierarchy

### A. Fixed Top Header
- Lula Credit Operations logo & brand mark.
- Global Search bar (searches company name, registration number, or assessment ID).
- Environment status ("Live Ops") & Analyst profile.

### B. Left-Hand Panel (260px fixed width)
1. **Overview**: Executive portfolio snapshot, active metrics, urgency alerts.
2. **Businesses (Dropdown)**: Expandable selector listing all 5 companies:
   - *Acme Traders* (Retail)
   - *Bright Construction* (Construction)
   - *Cape Foods Distributors* (Food & Beverage)
   - *Delta Logistics* (Transport)
   - *Echo Tech Solutions* (Technology)
3. **Assessments & Qualification Ranking**: Multi-filter ranking table for underwriting qualification.

### C. Main Content Views
1. **Executive Metrics Row**: Total Assessed (5), Low Risk / Qualified (1), Medium Risk / Under Review (2), High Risk (1), Pending (1), Analyzed Volume (R2.48M).
2. **Attention Banner**: Immediate warning for *Bright Construction* (Score: 384, High Risk, Thin File) and *Echo Tech Solutions* (Pending Assessment).
3. **Business Detail Panel**:
   - Credit score gauge (300–850) with risk band tags.
   - Bank statement turnover metrics: Total Credits, Total Debits, Net Cash Flow, Months Analysed.
   - Granular category score progress bars: Payment History, Credit Utilisation, Business Age, Cash Flow.
4. **Ranked Assessments Table**:
   - Qualification pills (Approved, In Review, Attention Needed, Pending).
   - Multi-parameter filters (Date range, Credit score slider, Risk band checkboxes, Thin file toggle).
