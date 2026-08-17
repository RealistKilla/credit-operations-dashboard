---
name: Lula Credit Operations Design System
colors:
  primary: '#0F253B'
  primary-container: '#1A3A54'
  on-primary: '#FFFFFF'
  accent: '#FF6D63'
  accent-hover: '#E85B51'
  accent-subtle: '#FFF0EE'
  sky-blue: '#61B8D8'
  sky-blue-light: '#EAF6FB'
  blue-action: '#268FB6'
  surface: '#F2F9FC'
  surface-card: '#FFFFFF'
  surface-card-hover: '#F8FCFE'
  on-surface: '#0F253B'
  on-surface-variant: '#324754'
  muted: '#5A6B76'
  subtle: '#839098'
  border: '#CFD8DD'
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
    fontFamily: Termina, Montserrat, sans-serif
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Termina, Montserrat, sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Termina, Montserrat, sans-serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: DM Sans, Montserrat, sans-serif
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  title-md:
    fontFamily: DM Sans, Montserrat, sans-serif
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: DM Sans, Montserrat, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: DM Sans, Montserrat, sans-serif
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: DM Sans, Montserrat, sans-serif
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: DM Sans, Montserrat, sans-serif
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: DM Sans, Montserrat, sans-serif
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

## 1. Brand & Aesthetic Direction
The Credit Operations Dashboard is designed for the credit underwriting and risk operations team at **Lula** (South Africa's digital SME funding platform). The design system adheres to Lula's official brand identity:

- **Midnight Navy (`#0F253B`)**: Represents authority, security, and stability. Used for primary navigation, top headers, strong typography, and primary metric emphasis.
- **Coral Orange Accent (`#FF6D63`)**: Strategic brand action color. Used for primary action buttons, priority attention alerts, and key interactive focal points.
- **Sky Blue (`#61B8D8`) & Blue (`#268FB6`)**: Secondary brand highlights used for score gauges, selected states, progress meters, and data visualizations.
- **Light Blue/Grey Canvas (`#F2F9FC`)**: Reduces eye fatigue for analysts reviewing financial figures all day, providing contrast against crisp white containers.
- **Elevated White Cards (`#FFFFFF`)**: Clean, rounded containers (`16px` radius) with soft ambient shadows (`0 4px 12px rgba(15, 37, 59, 0.06)`).

---

## 2. Layout & Information Architecture

### A. Top Header
- **Lula Credit Ops Brand Badge & Logo**
- **Search Bar**: Quick search across businesses, registration numbers, and assessment IDs.
- **Analyst Status & Context**: "Credit Operations Team | Live Environment"
- **Top Actions**: Quick filter toggle, notification alert counter for high-risk / attention-required files, and analyst avatar.

### B. Left-Hand Navigation Panel (260px fixed)
1. **Overview**:
   - Executive portfolio snapshot
   - Quick KPI cards (Total businesses assessed, qualified count, high-risk flags, pending queue, total volume analysed)
   - Actionable attention banner highlighting businesses requiring immediate credit decisions
2. **Businesses (Dropdown Menu)**:
   - Expandable company list:
     - Acme Traders (Retail)
     - Bright Construction (Construction)
     - Cape Foods Distributors (Food & Beverage)
     - Delta Logistics (Transport)
     - Echo Tech Solutions (Technology)
   - Clicking a business selects it and pulls up the complete credit profile, bank statements, and category score breakdown.
3. **Assessments & Ranking**:
   - Dynamic ranking view ordering companies by Credit Score, Risk Tier (Low / Medium / High / Pending), and Qualification Status.
   - Filtering options (e.g. Qualified vs Review Needed vs Thin File vs Pending).

### C. Main Content Views
1. **Summary Metrics Row**:
   - **Total Assessed**: 5 businesses
   - **Low Risk / Qualified**: 1 (`Cape Foods Distributors` - 741)
   - **Medium Risk / In Review**: 2 (`Acme Traders` - 612, `Delta Logistics` - 558)
   - **High Risk / Attention**: 1 (`Bright Construction` - 384, Thin File)
   - **Pending Assessments**: 1 (`Echo Tech Solutions`)
   - **Total Turnover Analysed**: R2.48M in bank statement credits

2. **Attention / Priority Alert Banner**:
   - Prominently warns the analyst about high risk & thin file statuses (e.g., Bright Construction) and pending data ingestion (Echo Tech Solutions).

3. **Business Detail & Financial Deep Dive**:
   - **Credit Score Gauge & Risk Band Tag**: Numerical score out of 850 with color-coded risk band badge (Low: Green, Medium: Amber, High: Red, Pending: Gray).
   - **Category Score Breakdown**:
     - Payment History
     - Credit Utilisation
     - Business Age
     - Cash Flow
     - Visual horizontal progress meters comparing individual category score against benchmark.
   - **Bank Statement Financial Analysis**:
     - Total Credits (Revenue Inflow)
     - Total Debits (Expenses/Outflow)
     - Net Cash Flow calculation (`Credits - Debits`)
     - Cash Flow Margin & Monthly Average
     - Months Analysed badge (3 months vs 6 months)

4. **Interactive Ranked Assessments Table**:
   - Columns: Rank, Business Name & Reg No, Industry, Assessment Date, Credit Score (visual bar), Risk Band Pill, Bank Turnover, Status, Actions.
   - Instant filtering and sorting by score or risk band.

---

## 3. Component Specifications

### Buttons
- **Primary**: Pill shaped (`border-radius: 100px`), `#FF6D63`, white bold text, slight lift on hover (`#E85B51`).
- **Secondary**: Navy outline (`#0F253B`) or Sky Blue ghost (`#61B8D8`).
- **Small Action Buttons**: Rounded `8px`, subtle hover background.

### Status Badges & Pills
- **Low Risk / Approved**: `#1AAE4E` text on `#E8F8EE` background.
- **Medium Risk / Review**: `#FCB900` / `#D97706` text on `#FFF8E6` background.
- **High Risk / Attention**: `#FF274B` text on `#FFEAEF` background.
- **Pending**: `#5A6B76` text on `#F0F2F3` background.
- **Thin File Badge**: Purple / Indigo accent (`#9982FF` or `#7A00DF` subtle pill).

### Visual Hierarchy & Polish
- Avoid cluttered tables; use generous padding (`16px` on table rows).
- Ensure numeric values use South African Rand currency formatting (`R 1,240,000.00`).
- Category scores rendered with clear percentages and visual meter bars.
