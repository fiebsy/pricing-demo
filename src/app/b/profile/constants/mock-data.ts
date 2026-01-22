/**
 * Mock Data
 *
 * Sample profile data and scores for the video game profile editor.
 * Uses the 3-tier hierarchy: Sections > Categories > SubScores
 *
 * @module b/profile/constants
 */

import type { ProfileData, UpdatesIslandData } from '../types'

// =============================================================================
// MOCK PROFILE DATA
// =============================================================================

export const MOCK_PROFILE: ProfileData = {
  id: 'profile-1',
  name: 'Squirtle Kid',
  avatarUrl: '/skwircle-kid.png',
  bio: `Welcome to my profile! I'm a design engineer passionate about creating
delightful user experiences through thoughtful UI design and clean code.
I believe in the power of iteration and user feedback to craft products
that truly resonate with people. When I'm not coding, you'll find me
exploring new design trends, playing video games, or mentoring
aspiring developers.`,
  questions: [
    {
      id: 'q1',
      text: 'What drives your passion for design engineering?',
      linkedCategory: 'growth',
      linkedSection: 'mind',
    },
    {
      id: 'q2',
      text: 'How did you transition into your current role?',
      linkedCategory: 'career',
      linkedSection: 'mind',
    },
    {
      id: 'q3',
      text: 'What technologies are you most excited about?',
      linkedCategory: 'skills',
      linkedSection: 'mind',
    },
    {
      id: 'q4',
      text: 'How would you describe your communication style?',
      linkedCategory: 'tone',
      linkedSection: 'voice',
    },
    {
      id: 'q5',
      text: 'What advice would you give to junior developers?',
      linkedCategory: 'skills',
      linkedSection: 'mind',
    },
  ],
  scores: {
    overall: {
      current: 73,
      networkAverage: 68,
    },
    sections: [
      // =======================================================================
      // MIND SECTION
      // =======================================================================
      {
        sectionId: 'mind',
        label: 'Mind',
        icon: 'Brain01Icon',
        aggregate: { current: 74, networkAverage: 69 },
        categories: [
          {
            categoryId: 'career',
            label: 'Career',
            icon: 'Briefcase01Icon',
            aggregate: { current: 68, networkAverage: 65 },
            subScores: [
              { id: 'experience', label: 'Experience', score: { current: 72, networkAverage: 70 } },
              { id: 'role', label: 'Role', score: { current: 65, networkAverage: 62 } },
              { id: 'achievements', label: 'Achievements', score: { current: 58, networkAverage: 60 } },
              { id: 'skills', label: 'Skills', score: { current: 77, networkAverage: 68 } },
            ],
          },
          {
            categoryId: 'growth',
            label: 'Growth',
            icon: 'PlantIcon',
            aggregate: { current: 76, networkAverage: 68 },
            subScores: [
              { id: 'habits', label: 'Habits', score: { current: 80, networkAverage: 70 } },
              { id: 'mindset', label: 'Mindset', score: { current: 78, networkAverage: 68 } },
              { id: 'goals', label: 'Goals', score: { current: 72, networkAverage: 66 } },
              { id: 'reflection', label: 'Reflection', score: { current: 74, networkAverage: 68 } },
            ],
          },
          {
            categoryId: 'skills',
            label: 'Skills',
            icon: 'Wrench01Icon',
            aggregate: { current: 82, networkAverage: 72 },
            subScores: [
              { id: 'technical', label: 'Technical', score: { current: 88, networkAverage: 75 } },
              { id: 'tools', label: 'Tools', score: { current: 85, networkAverage: 72 } },
              { id: 'methods', label: 'Methods', score: { current: 78, networkAverage: 70 } },
              { id: 'projects', label: 'Projects', score: { current: 77, networkAverage: 71 } },
            ],
          },
          {
            categoryId: 'business',
            label: 'Business',
            icon: 'ChartLineData01Icon',
            aggregate: { current: 70, networkAverage: 71 },
            subScores: [
              { id: 'strategy', label: 'Strategy', score: { current: 68, networkAverage: 72 } },
              { id: 'teams', label: 'Teams', score: { current: 75, networkAverage: 70 } },
              { id: 'funding', label: 'Funding', score: { current: 62, networkAverage: 68 } },
              { id: 'operations', label: 'Operations', score: { current: 75, networkAverage: 74 } },
            ],
          },
        ],
      },
      // =======================================================================
      // VOICE SECTION
      // =======================================================================
      {
        sectionId: 'voice',
        label: 'Voice',
        icon: 'Mic01Icon',
        aggregate: { current: 71, networkAverage: 65 },
        categories: [
          {
            categoryId: 'tone',
            label: 'Tone',
            icon: 'Mic01Icon',
            aggregate: { current: 75, networkAverage: 68 },
            subScores: [
              { id: 'warmth', label: 'Warmth', score: { current: 82, networkAverage: 70 } },
              { id: 'formality', label: 'Formality', score: { current: 70, networkAverage: 65 } },
              { id: 'confidence', label: 'Confidence', score: { current: 78, networkAverage: 68 } },
              { id: 'empathy', label: 'Empathy', score: { current: 70, networkAverage: 69 } },
            ],
          },
          {
            categoryId: 'style',
            label: 'Style',
            icon: 'Pen01Icon',
            aggregate: { current: 82, networkAverage: 64 },
            subScores: [
              { id: 'vocabulary', label: 'Vocabulary', score: { current: 85, networkAverage: 66 } },
              { id: 'structure', label: 'Structure', score: { current: 80, networkAverage: 64 } },
              { id: 'pacing', label: 'Pacing', score: { current: 82, networkAverage: 62 } },
              { id: 'examples', label: 'Examples', score: { current: 81, networkAverage: 64 } },
            ],
          },
          {
            categoryId: 'personality',
            label: 'Personality',
            icon: 'SmileIcon',
            aggregate: { current: 68, networkAverage: 65 },
            subScores: [
              { id: 'humor', label: 'Humor', score: { current: 65, networkAverage: 60 } },
              { id: 'authenticity', label: 'Authenticity', score: { current: 78, networkAverage: 68 } },
              { id: 'curiosity', label: 'Curiosity', score: { current: 70, networkAverage: 66 } },
              { id: 'passion', label: 'Passion', score: { current: 59, networkAverage: 66 } },
            ],
          },
          {
            categoryId: 'responses',
            label: 'Responses',
            icon: 'Comment01Icon',
            aggregate: { current: 59, networkAverage: 63 },
            subScores: [
              { id: 'depth', label: 'Depth', score: { current: 62, networkAverage: 65 } },
              { id: 'relevance', label: 'Relevance', score: { current: 58, networkAverage: 64 } },
              { id: 'clarity', label: 'Clarity', score: { current: 60, networkAverage: 62 } },
              { id: 'engagement', label: 'Engagement', score: { current: 56, networkAverage: 61 } },
            ],
          },
        ],
      },
      // =======================================================================
      // APPEARANCE SECTION
      // =======================================================================
      {
        sectionId: 'appearance',
        label: 'Appearance',
        icon: 'User03Icon',
        aggregate: { current: 74, networkAverage: 70 },
        categories: [
          {
            categoryId: 'visual',
            label: 'Visual',
            icon: 'Image01Icon',
            aggregate: { current: 85, networkAverage: 72 },
            subScores: [
              { id: 'headshot', label: 'Headshot', score: { current: 90, networkAverage: 75 } },
              { id: 'gallery', label: 'Gallery', score: { current: 82, networkAverage: 70 } },
              { id: 'quality', label: 'Quality', score: { current: 88, networkAverage: 72 } },
              { id: 'consistency', label: 'Consistency', score: { current: 80, networkAverage: 71 } },
            ],
          },
          {
            categoryId: 'branding',
            label: 'Branding',
            icon: 'PaintBrush01Icon',
            aggregate: { current: 72, networkAverage: 68 },
            subScores: [
              { id: 'colors', label: 'Colors', score: { current: 78, networkAverage: 70 } },
              { id: 'typography', label: 'Typography', score: { current: 70, networkAverage: 66 } },
              { id: 'logo', label: 'Logo', score: { current: 68, networkAverage: 68 } },
              { id: 'tagline', label: 'Tagline', score: { current: 72, networkAverage: 68 } },
            ],
          },
          {
            categoryId: 'presentation',
            label: 'Presentation',
            icon: 'Presentation01Icon',
            aggregate: { current: 70, networkAverage: 70 },
            subScores: [
              { id: 'bio', label: 'Bio', score: { current: 75, networkAverage: 72 } },
              { id: 'highlights', label: 'Highlights', score: { current: 68, networkAverage: 68 } },
              { id: 'links', label: 'Links', score: { current: 72, networkAverage: 70 } },
              { id: 'contact', label: 'Contact', score: { current: 65, networkAverage: 70 } },
            ],
          },
          {
            categoryId: 'media',
            label: 'Media',
            icon: 'Video01Icon',
            aggregate: { current: 69, networkAverage: 70 },
            subScores: [
              { id: 'intro-video', label: 'Intro Video', score: { current: 72, networkAverage: 72 } },
              { id: 'samples', label: 'Samples', score: { current: 70, networkAverage: 70 } },
              { id: 'interviews', label: 'Interviews', score: { current: 65, networkAverage: 68 } },
              { id: 'podcasts', label: 'Podcasts', score: { current: 69, networkAverage: 70 } },
            ],
          },
        ],
      },
    ],
  },
}

// =============================================================================
// MOCK UPDATES DATA
// =============================================================================

export const MOCK_UPDATES: UpdatesIslandData = {
  pendingFiles: 0,
  pendingUpdates: 2,
}
