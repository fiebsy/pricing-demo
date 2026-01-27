/**
 * Shared spacing constants for pitch deck slides.
 * Ensures consistent gaps, padding, and margins across all slide types.
 *
 * Reference slides: 04 (Platform Pain) and 05 (Creator Pain) serve as
 * the "North Star" for spacing consistency.
 */

export const slideSpacing = {
  // ===================
  // LAYOUT GAPS
  // ===================

  layout: {
    /** Two-column layout gap (title | content) */
    twoColumn: 'gap-16',
    /** Stacked/centered layout gap */
    stacked: 'gap-8',
  },

  // ===================
  // CARD GAPS
  // ===================

  cards: {
    /** Horizontal card row gap */
    horizontal: 'gap-6',
    /** Stacked card column gap */
    stacked: 'gap-4',
    /** Grid layout gap */
    grid: 'gap-6',
  },

  // ===================
  // CARD DIMENSIONS
  // ===================

  cardWidth: {
    /** Team card fixed width (fits longest name on one line) */
    team: 'w-[240px]',
  },

  // ===================
  // CARD PADDING
  // ===================

  cardPadding: {
    /** Default card padding */
    default: 'px-8 py-6',
    /** Team card padding (reduced x) */
    team: 'px-4 py-6',
    /** Stat card padding (horizontal layout) */
    stat: 'px-8 py-8',
    /** Compact stat card padding (stacked layout) */
    statCompact: 'px-6 py-5',
    /** Chart card padding */
    chart: 'px-12 pt-14 pb-6',
    /** Logo card padding */
    logo: 'px-6 py-10',
    /** Large centered card padding (single stat) */
    large: 'px-12 py-10',
  },

  // ===================
  // MARGINS
  // ===================

  margin: {
    /** Supporting text top margin - increased for better separation */
    supportingTop: 'mt-20',
    /** Chart context text margin */
    chartContext: 'mt-4',
    /** CTA top margin (closing slide) */
    ctaTop: 'mt-12',
  },
}
