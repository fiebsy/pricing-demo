/**
 * Shared typography constants for pitch deck slides.
 * Ensures consistent title weights and styles across all slide types.
 *
 * Reference slides: 04 (Platform Pain) and 05 (Creator Pain) serve as
 * the "North Star" for typography consistency.
 */

export const slideTypography = {
  // ===================
  // TITLES
  // ===================

  /** Section title - used on most slides (two-column layouts, stats, charts) */
  sectionTitle: 'font-display text-display-lg font-semibold text-primary',

  /** Hero title - used for title slide, closing, and larger emphasis */
  heroTitle: 'font-display text-display-2xl font-semibold text-primary',

  // ===================
  // SUBTITLES
  // ===================

  /** Subtitle label - appears above titles (tracking-wide for label feel) */
  subtitle: 'text-sm font-medium text-tertiary tracking-wide',

  /** Hero subtitle - larger subtitle for title/closing slides */
  heroSubtitle: 'font-display text-display-md font-medium text-secondary',

  // ===================
  // BODY TEXT
  // ===================

  /** Body text - bullet content, descriptions */
  body: 'text-lg text-tertiary leading-relaxed',

  /** Body bold - emphasized portion of body text */
  bodyBold: 'font-medium text-secondary',

  /** Description - slide descriptions (title/closing slides) */
  description: 'text-lg text-secondary',

  // ===================
  // STATS
  // ===================

  /** Stat value - large numbers/metrics (2xl size) */
  statValue: 'font-display text-display-2xl text-primary',

  /** Stat value medium - for stacked layouts (lg size) */
  statValueMd: 'font-display text-display-lg font-semibold text-primary',

  /** Stat label - describes the metric (lg size) */
  statLabel: 'text-lg text-secondary',

  /** Stat label small - for compact stat cards (base size) */
  statLabelSm: 'text-base text-secondary',

  // ===================
  // SUPPORTING/CONTEXT
  // ===================

  /** Supporting text - additional context below content */
  supporting: 'text-sm text-quaternary',

  /** Note text - emphasized context (logo grid notes) */
  note: 'text-base text-secondary',

  // ===================
  // CARDS
  // ===================

  /** Card title - team member names, logo names */
  cardTitle: 'text-xl font-medium text-primary',

  /** Card name - smaller card titles (team members) */
  cardName: 'text-base font-medium text-primary',

  /** Card role - team member roles */
  cardRole: 'text-xs text-tertiary',

  // ===================
  // CHARTS
  // ===================

  /** Chart value - displayed above bars */
  chartValue: 'text-lg font-medium text-primary',

  /** Chart label - x-axis labels below bars */
  chartLabel: 'text-base text-secondary',
}
