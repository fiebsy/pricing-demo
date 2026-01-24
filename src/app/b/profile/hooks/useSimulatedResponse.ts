/**
 * useSimulatedResponse Hook
 *
 * Simulates LLM streaming responses for the chat interface.
 * Provides a "thinking" delay and character-by-character streaming.
 *
 * @module b/profile/hooks
 */

'use client'

import { useState, useCallback, useRef, useMemo } from 'react'

// =============================================================================
// TYPES
// =============================================================================

export interface UseSimulatedResponseReturn {
  isTyping: boolean
  simulateResponse: (
    userMessage: string,
    onChunk: (content: string) => void,
    onComplete: (confidence: number) => void
  ) => Promise<void>
  cancelResponse: () => void
}

// =============================================================================
// RESPONSE BANK
// =============================================================================

const RESPONSES: Record<string, string[]> = {
  profile: [
    "Based on your profile data, I can see you have strong experience in your field. Your skill matrix shows particular strengths in technical areas, with opportunities to enhance your presentation and networking scores.",
    "Looking at your profile, you've built solid foundations across all three sections. To boost your overall score, I'd recommend focusing on the 'Voice' section - adding more personality to your responses could increase engagement by 15-20%.",
    "Your profile is well-rounded! The Mind section shows deep expertise, while your Appearance scores indicate strong visual presentation. Consider adding more context to your career narrative for maximum impact.",
  ],
  // Low confidence responses - for uncertain/unknown answers
  uncertain: [
    "I'm not entirely sure about this based on your current profile data. This topic may require additional information or context that isn't available in your profile yet.",
    "I don't have enough confidence in this answer. The data points I have access to don't provide a clear picture for this specific question.",
    "This is outside the scope of what I can confidently answer based on your profile. Consider adding more relevant information to improve my understanding.",
  ],
  skills: [
    "Your skill profile indicates expertise in multiple areas. The AI analysis suggests you could benefit from highlighting transferable skills that bridge your technical and interpersonal abilities.",
    "I've analyzed your skill distribution. Your technical competencies score highly, but there's room to showcase soft skills more prominently. This could improve your overall match rate with opportunities.",
    "Great skill diversity! I notice some skills have lower confidence scores - these may benefit from additional supporting evidence or updated certifications.",
  ],
  experience: [
    "Your experience timeline shows consistent growth. The pattern of increasing responsibility aligns well with industry expectations. Consider quantifying achievements where possible.",
    "I can see you've had diverse experiences across different contexts. This breadth is valuable - make sure your profile highlights how these connect to your current goals.",
    "Your experience section demonstrates strong progression. Adding specific outcomes and metrics would strengthen the perceived impact of each role.",
  ],
  general: [
    "That's a great question! Based on my analysis of your profile data, I can provide some insights. Your overall confidence score reflects a well-developed professional presence with specific areas ripe for enhancement.",
    "I understand what you're asking. Looking at the data, there are several factors to consider. Your profile shows strong fundamentals - let me suggest some targeted improvements.",
    "Interesting question! Let me analyze that for you. Your profile metrics suggest you're performing above the network average in several key areas, with specific opportunities in others.",
    "Good point. Based on the profile analysis, I can see patterns that might be relevant. Consider how your unique combination of skills and experience positions you differently.",
    "I've processed your query against your profile data. The results indicate several actionable insights that could help optimize your professional presentation.",
  ],
}

// =============================================================================
// UTILITIES
// =============================================================================

interface ResponseResult {
  text: string
  isLowConfidence: boolean
}

function getContextualResponse(userMessage: string): ResponseResult {
  const lowerMessage = userMessage.toLowerCase()

  // Check for low confidence trigger keywords
  const lowConfidenceTriggers = [
    'uncertain',
    'unsure',
    'don\'t know',
    "don't know",
    'unknown',
    'unclear',
    'confused',
    'test low',
    'low confidence',
  ]

  const isLowConfidenceTrigger = lowConfidenceTriggers.some(trigger =>
    lowerMessage.includes(trigger)
  )

  if (isLowConfidenceTrigger) {
    const responses = RESPONSES.uncertain
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      isLowConfidence: true,
    }
  }

  // Determine context from user message
  let category: keyof typeof RESPONSES = 'general'

  if (
    lowerMessage.includes('profile') ||
    lowerMessage.includes('score') ||
    lowerMessage.includes('confidence')
  ) {
    category = 'profile'
  } else if (
    lowerMessage.includes('skill') ||
    lowerMessage.includes('ability') ||
    lowerMessage.includes('competenc')
  ) {
    category = 'skills'
  } else if (
    lowerMessage.includes('experience') ||
    lowerMessage.includes('career') ||
    lowerMessage.includes('work') ||
    lowerMessage.includes('job')
  ) {
    category = 'experience'
  }

  const responses = RESPONSES[category]
  return {
    text: responses[Math.floor(Math.random() * responses.length)],
    isLowConfidence: false,
  }
}

function getRandomConfidence(isLowConfidence: boolean = false): number {
  if (isLowConfidence) {
    // Returns 0.0-0.25 randomly for low confidence
    return Math.random() * 0.25
  }
  // Returns 0.75-0.95 randomly for normal confidence
  return 0.75 + Math.random() * 0.2
}

// =============================================================================
// HOOK
// =============================================================================

export function useSimulatedResponse(): UseSimulatedResponseReturn {
  const [isTyping, setIsTyping] = useState(false)
  const abortRef = useRef(false)

  const cancelResponse = useCallback(() => {
    abortRef.current = true
  }, [])

  const simulateResponse = useCallback(
    async (
      userMessage: string,
      onChunk: (content: string) => void,
      onComplete: (confidence: number) => void
    ): Promise<void> => {
      abortRef.current = false
      setIsTyping(true)

      // "Thinking" delay (50-100ms)
      const thinkingDelay = 50 + Math.random() * 50
      await new Promise((resolve) => setTimeout(resolve, thinkingDelay))

      if (abortRef.current) {
        setIsTyping(false)
        return
      }

      // Get response text and confidence state
      const { text: responseText, isLowConfidence } = getContextualResponse(userMessage)
      let currentContent = ''

      // Stream character by character (~30ms intervals)
      for (let i = 0; i < responseText.length; i++) {
        if (abortRef.current) {
          setIsTyping(false)
          return
        }

        currentContent += responseText[i]
        onChunk(currentContent)

        // Variable delay for natural feel (5-10ms)
        const charDelay = 5 + Math.random() * 5
        await new Promise((resolve) => setTimeout(resolve, charDelay))
      }

      setIsTyping(false)
      onComplete(getRandomConfidence(isLowConfidence))
    },
    []
  )

  return useMemo(
    () => ({
      isTyping,
      simulateResponse,
      cancelResponse,
    }),
    [isTyping, simulateResponse, cancelResponse]
  )
}
