---
name: Academic Enterprise Surface
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001e2f'
  on-tertiary-container: '#008cc7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  success: '#0f7b5f'
  success-container: '#dcfce7'
  on-success-container: '#065f46'
  warning: '#d97706'
  warning-container: '#fef3c7'
  on-warning-container: '#92400e'
  info: '#0284c7'
  info-container: '#e0f2fe'
  on-info-container: '#075985'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: -0.011em
  body-md:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: -0.006em
  body-sm:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: -0.005em
  label-sm:
    fontFamily: Geist
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
  code-metric:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: -0.02em
rounded:
  DEFAULT: 0.125rem
  lg: 0.25rem
  xl: 0.5rem
  2xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

> **Token contract:** The frontmatter above is mirrored in `tailwind.config.ts`.
> Use the Tailwind theme and this frontmatter as the canonical token set. Prose
> hex values in the following sections are illustrative where they differ.
> The 143 HTML mockups under `design/mockups/` are visual references; they are
> not production code.

## Brand & Style

This design system drives a multi-tenant enterprise operating system engineered for collegiate management, faculty logistics, student lifecycles, and institutional analytics. The interface merges the structural velocity of developer-first tooling with the clarity of institutional infrastructure.

### Design Movement: Modern Precision Enterprise
The aesthetic rejects clunky, legacy academic software in favor of high-density clarity, micro-tactile controls, and information architecture inspired by developer platforms and fintech infrastructure.
- **Tone:** Authoritative, razor-sharp, frictionless, institutional yet effortless.
- **Visual Weight:** Light-cast canvas environments anchored by deep architectural slate elements.
- **Hierarchy Drivers:** Strict numeric alignment, tabular figures, monochromatic structural scaffolding, and focused chromatic status signals.

## Colors

The palette uses deep structural slates for layout clarity, electric indigo for primary intent, and dedicated semantic channels for real-time institutional metrics.

### System Palette Architecture
- **Deep Primary Canvas / Ink (`#0F172A`, `#1E293B`):** Establishes typographic hierarchy, persistent shell headers, and key navigation structures.
- **Accent Brand Indigo (`#4F46E5`, `#6366F1`, `#4338CA`):** Signals active workflow states, selected data points, focused form inputs, and key progression actions.
- **Surfaces & Layout Tiers:**
  - Base Viewport Canvas: `#F8FAFC`
  - Elevated Container / Data Cells: `#FFFFFF`
  - Recessed Workspaces & Table Striations: `#F1F5F9`
  - Structural Borders & Grid Dividers: `#E2E8F0` (Default), `#CBD5E1` (Focused / Interactive)
- **Semantic Indicators:**
  - Success / Active Enrollment / Completed Transactions: Emerald (`#10B981`)
  - Pending Approvals / Warnings: Amber (`#F59E0B`)
  - Institutional Holds / Critical Failures: Rose (`#F43F5E`)
  - Informational / Active Sync / Catalog Updates: Sky (`#0EA5E9`)

## Typography

Geist provides mechanical legibility across large-scale enterprise layouts and information dashboards. 

### Implementation Rules
- **Tabular Figures (`tnum`):** All numerical displays—including tuition amounts, GPAs, credit values, census metrics, and timestamps—must enforce `font-variant-numeric: tabular-nums` to guarantee vertical column alignment across dense views.
- **Letter Spacing Discipline:** Tighten tracking slightly as font size scales up to preserve visual density.
- **Uppercase Labels:** The `label-sm` role serves column headers, status tags, and metadata keys. Render it in uppercase with expanded tracking (`0.04em`) to maintain legibility at smaller scales.

## Layout & Spacing

The layout is structured around an asymmetrical enterprise shell: a collapsible navigation drawer on the left, an optional contextual sub-sidebar, and an expansive data workspace with variable horizontal scaling.

### Grid & Layout Strategy
- **Application Frame:** Dynamic multi-column layout. Sidebar navigation collapses between a 64px icon rail and a 260px expanded hierarchical panel.
- **Main Canvas:** Adapts to a 12-column fluid grid above 1024px. Maintains a minimum horizontal margin of `margin-desktop` (2rem) and column gutters of `gutter-desktop` (1.5rem).
- **Responsive Adaptations:**
  - **Desktop (≥1280px):** Simultaneous visualization of the navigation tree, dense multi-column metric tables, and right-hand contextual inspector panes.
  - **Tablet (768px – 1279px):** Collapses contextual inspector into an overlay sheet; the main navigation moves into a 64px condensed icon rail.
  - **Mobile (<768px):** Navigation tucks entirely into a bottom bar or slide-out sheet. Data grids switch to stacked card-list rows.
- **Density Control:** Spacing favors vertical compactness (`space-xs` and `space-sm`) inside interactive lists and grids, while using `space-lg` to separate modular cards.

## Elevation & Depth

Visual hierarchy relies on crisp hairline boundaries paired with subtle ambient diffusion. Rather than heavy drop shadows, the system uses layered offsets and low-contrast borders to differentiate overlapping panels.

### Surface Tiers
- **Tier 0 (Viewport Floor):** Rendered in `#F8FAFC`. Houses the global workspace background and structural divider tracks.
- **Tier 1 (Base Cards & Metric Containers):** `#FFFFFF` paired with an inset border of `1px solid #E2E8F0` and an ambient shadow layer: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Tier 2 (Hover States & Detached Panels):** Uses an elevated shadow recipe: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)` with border `#CBD5E1`.
- **Tier 3 (Modals, Command Palettes, Popovers):** High-level overlay tier: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` over a backdrop filter blur of `4px` with `#0F172A` at 15% opacity.

## Shapes

The design uses tight, purposeful curves (`roundedness: 1`) to preserve vertical space and maintain a streamlined, tool-like feel.

### Geometric Rules
- **Base Components (Inputs, Buttons, Badges):** `rounded-lg` is `0.25rem` (4px). Avoids excessive curvature to keep data-dense grids compact.
- **Containers & Panels (`rounded-xl`):** Outer card wrappers, modal frames, and flyouts use `0.5rem` (8px).
- **Segmented Pills & Status Badges:** Fully rounded capsules (`9999px`) are reserved exclusively for contextual status chips and segmented toggle switches.

## Components

### Buttons
- **Primary:** Solid `#4F46E5` fill with white text. Focus state has an exterior 2px ring in `#6366F1` with a 2px offset. Hover moves to `#4338CA`.
- **Secondary:** `#FFFFFF` background, `1px solid #E2E8F0`, `#0F172A` text. Hover uses `#F8FAFC` surface with border `#CBD5E1`.
- **Destructive:** `#F43F5E` text with transparent background; shifts to a soft `#FFF1F2` tint on hover.
- **Dimensions:** Strict 32px height for compact data views and 38px for standard page headers.

### Badges & Semantic Chips
- Low-saturation tinted backgrounds paired with high-contrast text and a centered 6px dot indicator:
  - Active/Paid: Background `#ECFDF5`, text `#065F46`, dot `#10B981`.
  - Pending/Action Required: Background `#FFFBEB`, text `#92400E`, dot `#F59E0B`.
  - Alert/Hold: Background `#FFF1F2`, text `#9F1239`, dot `#F43F5E`.
  - Informational/System: Background `#F0F9FF`, text `#075985`, dot `#0EA5E9`.

### Data Grid & Tables
- **Header:** Background `#F8FAFC`, uppercase `label-sm` text in `#64748B`, bottom border `1px solid #E2E8F0`, fixed height 36px.
- **Rows:** Alternating transparent and `#FFFFFF` rows; 44px dense row height. Hover state triggers `#F8FAFC`. Active multi-select rows highlight in `#EEF2FF`.
- **Dividers:** Subtle `1px solid #F1F5F9` borders between cells to prevent visual noise.

### Segmented Controls & Micro-Tabs
- Contained slate track (`#F1F5F9`) with 2px inner padding. Active selection sits on a white floating pill card backed by a `0 1px 2px rgba(0, 0, 0, 0.06)` shadow. Text transitions smoothly from `#64748B` to `#0F172A`.

### Form Controls
- **Inputs:** Base height 34px, `#FFFFFF` background, border `1px solid #E2E8F0`, typography `body-md`. Focus transitions immediately to border `#6366F1` with an exterior `0 0 0 1px #6366F1` shadow ring.
- **Checkboxes & Radios:** 16px square/circle with a 1px border in `#CBD5E1`. Selected state shows a solid `#4F46E5` background with an inset white micro-check.

### Analytical Cards & Micro Data Viz
- **Sparklines:** Inline vector paths drawn with a 1.5px stroke width. Primary series use `#4F46E5`; comparative historical runs use `#CBD5E1` dashed paths.
- **Horizontal Progress Indicators:** Track height of 4px in `#F1F5F9` with rounded ends. Value fills use solid semantic tones based on target thresholds.