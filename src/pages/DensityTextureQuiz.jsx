import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const densityQuestions = [
  {
    question: 'When you gather your hair into a ponytail, how thick is it?',
    options: [
      { text: 'Very thin — barely fills my hand', value: 'Low' },
      { text: 'Medium — a comfortable handful', value: 'Medium' },
      { text: 'Very thick — hard to wrap a hair tie around', value: 'High' },
    ],
  },
  {
    question: 'Can you see your scalp easily without parting your hair?',
    options: [
      { text: 'Yes, very easily', value: 'Low' },
      { text: 'A little, in certain light', value: 'Medium' },
      { text: 'No, not at all', value: 'High' },
    ],
  },
]

const textureQuestions = [
  {
    question: 'Take a single strand and roll it between your fingers. What do you feel?',
    options: [
      { text: 'Barely feel anything, very fine', value: 'Fine' },
      { text: 'A slight texture, not too thin or thick', value: 'Medium' },
      { text: 'Clearly feel a thick, wiry strand', value: 'Coarse' },
    ],
  },
  {
    question: 'How does your hair hold a style?',
    options: [
      { text: 'Loses style/curl quickly', value: 'Fine' },
      { text: 'Holds reasonably well', value: 'Medium' },
      { text: 'Holds style for a long time, even resists styling', value: 'Coarse' },
    ],
  },
]

export default function DensityTextureQuiz() {
  const [step, setStep] = useState(0)
  const [densityAnswers, setDensityAnswers] = useState([])
  const [textureAnswers, setTextureAnswers] = useState([])
  const [done, setDone] = useState(false)

  const allQuestions = [...densityQuestions, ...textureQuestions]
  const isDensityPhase = step < densityQuestions.length

  const answer = (value) => {
    if (isDensityPhase) {
      setDensityAnswers([...densityAnswers, value])
    } else {
      setTextureAnswers([...textureAnswers, value])
    }

    if (step + 1 === allQuestions.length) {
      setDone(true)
    } else {
      setStep(step + 1)
    }
  }

  const mostFrequent = (arr) => {
    const counts = {}
    arr.forEach((v) => (counts[v] = (counts[v] || 0) + 1))
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
  }

  const restart = () => {
    setStep(0)
    setDensityAnswers([])
    setTextureAnswers([])
    setDone(false)
  }

  const density = densityAnswers.length ? mostFrequent(densityAnswers) : null
  const texture = textureAnswers.length ? mostFrequent(textureAnswers) : null

  const tips = {
    'Low': 'Avoid heavy products that can weigh thin density down — focus on lightweight layering.',
    'Medium': 'Most products work well for you — focus on consistency rather than heavy layering.',
    'High': 'You likely need more product than you think — thin layering often leaves hair underserved.',
    'Fine': 'Use lightweight products and avoid heavy proteins, which can make fine strands feel stiff.',
    'Coarse': 'Richer creams and butters work well since coarse strands can handle more weight without buildup.',
  }

  const currentQ = allQuestions[step]

  return (
    <>
      <Helmet>
        <title>Hair Density & Texture Quiz | The Curl Haven</title>
        <meta name="description" content="Find out your hair density and strand texture with this quick quiz, and get tips tailored to both." />
      </Helmet>

      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">Density & Texture Quiz</h1>
        <p className="text-charcoal/60 font-sans mb-8">
          Two more pieces of the puzzle — how much hair you have, and how thick each strand is
        </p>

        {!done ? (
          <div>
            <div className="flex gap-1 mb-8">
              {allQuestions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < step ? 'bg-purple' : i === step ? 'bg-purple/40' : 'bg-mauve/40'}`} />
              ))}
            </div>

            <p className="text-sm text-charcoal/40 font-sans mb-1">
              {isDensityPhase ? 'Density' : 'Texture'} · Question {step + 1} of {allQuestions.length}
            </p>
            <h2 className="text-xl font-heading text-charcoal mb-6">{currentQ.question}</h2>

            <div className="flex flex-col gap-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(opt.value)}
                  className="text-left border border-mauve/40 rounded-xl px-5 py-4 font-sans text-sm text-charcoal hover:border-purple hover:bg-purple/5 transition-all"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="border border-purple/30 bg-purple/5 rounded-2xl p-8" style={{ animation: 'popIn 0.4s ease-out' }}>
            <h2 className="text-2xl font-heading text-charcoal mb-4">Your Results</h2>

            <div className="flex gap-3 mb-6">
              <div className="flex-1 bg-white border border-mauve/40 rounded-xl p-4 text-center">
                <p className="text-xs font-sans text-charcoal/50 mb-1">Density</p>
                <p className="text-lg font-heading text-purple">{density}</p>
              </div>
              <div className="flex-1 bg-white border border-mauve/40 rounded-xl p-4 text-center">
                <p className="text-xs font-sans text-charcoal/50 mb-1">Texture</p>
                <p className="text-lg font-heading text-teal">{texture}</p>
              </div>
            </div>

            <h3 className="font-heading text-base text-charcoal mb-2">Density tip:</h3>
            <p className="font-sans text-sm text-charcoal/70 mb-4">{tips[density]}</p>

            <h3 className="font-heading text-base text-charcoal mb-2">Texture tip:</h3>
            <p className="font-sans text-sm text-charcoal/70 mb-6">{tips[texture]}</p>

            <div className="flex gap-3">
              <button
                onClick={restart}
                className="border border-mauve/60 px-5 py-2 rounded-full font-sans text-sm text-charcoal hover:bg-white transition-all"
              >
                Retake Quiz
              </button>
              <Link
                to="/routine-builder"
                className="bg-purple text-white px-5 py-2 rounded-full font-sans text-sm hover:opacity-90 transition-all"
              >
                Build My Routine →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}