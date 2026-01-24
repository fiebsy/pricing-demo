'use client'

import { useState } from 'react'
import { QuestionsList } from './components'
import type { Question } from './types'

const INITIAL_QUESTIONS = [
  { text: 'How did you transition into your current role?' },
  { text: 'What technologies are you most excited about?' },
  { text: 'How would you describe your communication style?' },
  { text: 'How do you approach building and leading teams?' },
]

export default function QuestionFlowPlayground() {
  const [questions, setQuestions] = useState<Question[]>([])

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-xl mx-auto px-6 mt-[400px]">
        <QuestionsList
          questionCount={5}
          initialQuestions={INITIAL_QUESTIONS}
          layout={{ triggerWidth: 480, panelWidth: 520 }}
          onChange={setQuestions}
        />
      </div>
    </div>
  )
}
