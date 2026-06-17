import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
const questions = [
  // Observation questions (weight: 1)
  {
    id: 1,
    type: 'observation',
    question: "How long does your hair take to fully air dry?",
    options: [
      { text: "Very long — 4+ hours", value: 0 },
      { text: "Normal — 2 to 3 hours", value: 1 },
      { text: "Very fast — under 1 hour", value: 2 },
    ],
    weight: 1
  },
  {
    id: 2,
    type: 'observation',
    question: "After applying leave-in or moisturiser, how does your hair feel?",
    options: [
      { text: "Products sit on top, hair feels coated", value: 0 },
      { text: "Absorbs well, feels moisturised", value: 1 },
      { text: "Absorbs instantly but still feels dry", value: 2 },
    ],
    weight: 1
  },
  {
    id: 3,
    type: 'observation',
    question: "Does your hair get frizzy in humid weather?",
    options: [
      { text: "Never — humidity doesn't affect it", value: 0 },
      { text: "Sometimes — depends on the day", value: 1 },
      { text: "Always — humidity destroys my hair", value: 2 },
    ],
    weight: 1
  },
  {
    id: 4,
    type: 'observation',
    question: "How often does your hair feel dry right after moisturising?",
    options: [
      { text: "Rarely — moisture lasts a long time", value: 0 },
      { text: "Sometimes — needs re-moisturising every few days", value: 1 },
      { text: "Always — never feels moisturised enough", value: 2 },
    ],
    weight: 1
  },
  {
    id: 5,
    type: 'observation',
    question: "Has your hair been chemically treated? (colour, bleach, relaxer)",
    options: [
      { text: "Never", value: 0 },
      { text: "Once or twice", value: 1 },
      { text: "Yes, regularly", value: 2 },
    ],
    weight: 1
  },
  // Physical tests (weight: 2)
  {
    id: 6,
    type: 'test',
    instruction: "Take a clean dry strand of hair and drop it into a glass of clean water. Wait 4 minutes then observe.",
    question: "What did the strand do?",
    options: [
      { text: "Floated the whole time", value: 0 },
      { text: "Slowly sank after 2–3 minutes", value: 1 },
      { text: "Sank immediately", value: 2 },
    ],
    weight: 2
  },
  {
    id: 7,
    type: 'test',
    instruction: "Take a single strand of hair. Hold the tip and slide your fingers from tip toward your scalp.",
    question: "What did you feel?",
    options: [
      { text: "Smooth all the way up", value: 0 },
      { text: "Slightly bumpy in some places", value: 1 },
      { text: "Very rough and bumpy", value: 2 },
    ],
    weight: 2
  },
  {
    id: 8,
    type: 'test',
    instruction: "On a dry section of your hair, spray a little water and observe what happens.",
    question: "What happened to the water?",
    options: [
      { text: "Beaded up and sat on top", value: 0 },
      { text: "Absorbed within 30 seconds", value: 1 },
      { text: "Absorbed immediately", value: 2 },
    ],
    weight: 2
  },
]

const getResult = (score) => {
  if (score <= 5) return {
    title: "Low Porosity",
    emoji: "💧",
    confidence: score <= 3 ? "High confidence" : "Moderate confidence",
    description: "Your hair cuticles are tightly closed. Moisture has a hard time getting in but once it does, it stays well.",
    tips: [
      "Use lightweight liquid-based products",
      "Apply heat when deep conditioning to open cuticles",
      "Avoid heavy butters and oils — they cause buildup",
      "Use clarifying shampoo regularly",
    ],
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    tip_color: "bg-blue-100 text-blue-800"
  }
  if (score <= 10) return {
    title: "Medium Porosity",
    emoji: "✨",
    confidence: score >= 7 && score <= 9 ? "High confidence" : "Moderate confidence",
    description: "Your hair cuticles are balanced. Your hair absorbs and retains moisture well — the easiest type to manage!",
    tips: [
      "Maintain with regular deep conditioning",
      "Avoid overusing protein treatments",
      "Most products work well for you",
      "Focus on keeping it healthy — don't over-process",
    ],
    color: "border-green-200 bg-green-50",
    badge: "bg-green-100 text-green-700",
    tip_color: "bg-green-100 text-green-800"
  }
  return {
    title: "High Porosity",
    emoji: "🔥",
    confidence: score >= 13 ? "High confidence" : "Moderate confidence",
    description: "Your hair cuticles are very open. Hair absorbs moisture quickly but loses it just as fast, leading to dryness and frizz.",
    tips: [
      "Use rich creams and heavy butters to seal moisture",
      "Always seal with an oil after moisturising (LOC method)",
      "Protein treatments will help strengthen your hair",
      "Use cold water to rinse — it helps close cuticles",
    ],
    color: "border-purple-200 bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
    tip_color: "bg-purple-100 text-purple-800"
  }
}

export default function PorosityQuiz() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const q = questions[current]

  const startTest = () => setWaiting(false)

  const answer = (value) => {
    const weighted = value * q.weight
    const newScore = score + weighted
  
    if (current + 1 === questions.length) {
      setScore(newScore)
      setDone(true)
      setTimeout(() => setShowResult(true), 4000)
    } else {
      setScore(newScore)
      setCurrent(current + 1)
      if (questions[current + 1].type === 'test') setWaiting(true)
    }
  }

  const restart = () => {
    setCurrent(0)
    setScore(0)
    setDone(false)
    setWaiting(false)
    setShowResult(false)
  }

  const result = getResult(score)

  return (
    <>
    <Helmet>
  <title>Hair Porosity Quiz — Find Your Porosity Type | The Curl Haven</title>
  <meta name="description" content="Take our free hair porosity quiz. Answer 8 questions including real physical tests to find out if you have low, medium or high porosity hair." />
  <meta name="keywords" content="hair porosity quiz, low porosity hair, high porosity hair, curly hair porosity test" />
</Helmet>
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-1">Porosity Quiz</h1>
      <p className="text-gray-500 mb-8">Discover how your hair absorbs and retains moisture</p>
  
      {!done ? (
        <div>
          {/* Progress bar */}
          <div className="flex gap-1 mb-8">
            {questions.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < current ? 'bg-purple-500' : i === current ? 'bg-purple-300' : 'bg-gray-200'}`} />
            ))}
          </div>
  
          {waiting ? (
            <div className="border rounded-xl p-6 bg-amber-50 border-amber-200">
              <p className="text-amber-700 font-semibold text-sm mb-2">⏱ Do this test first</p>
              <p className="text-gray-700 leading-relaxed mb-6">{q.instruction}</p>
              <button
                onClick={startTest}
                className="bg-amber-500 text-white px-6 py-2.5 rounded-lg hover:bg-amber-600 transition-all font-medium"
              >
                I'm ready — show the question
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-1">
                  Question {current + 1} of {questions.length} · {q.type === 'test' ? '⚡ Physical test' : '👁 Observation'}
                </p>
                <h2 className="text-xl font-semibold">{q.question}</h2>
              </div>
  
              <div className="flex flex-col gap-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => answer(opt.value)}
                    className="text-left border rounded-xl px-5 py-4 hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
  
      ) : done && !showResult ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-2xl">🌀</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Analysing your hair...</p>
            <p className="text-sm text-gray-400 mt-1">Calculating your porosity type</p>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
  
      ) : (
        <div
          className={`border rounded-xl p-8 ${result.color}`}
          style={{ animation: 'popIn 0.4s ease-out' }}
        >
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${result.badge}`}>
            {result.confidence}
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">{result.emoji} {result.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{result.description}</p>
  
          <h3 className="font-semibold mb-3">Your tips:</h3>
          <ul className="flex flex-col gap-2 mb-6">
            {result.tips.map((tip, i) => (
              <li key={i} className={`text-sm px-4 py-2 rounded-lg ${result.tip_color}`}>
                ✓ {tip}
              </li>
            ))}
          </ul>
  
          <p className="text-sm text-gray-500 mb-4">
            Still unsure? Chat with our AI for a more personalised answer.
          </p>
  
          <div className="flex gap-3">
            <button
              onClick={restart}
              className="border px-5 py-2 rounded-lg hover:bg-white transition-all font-medium text-sm"
            >
              Retake Quiz
            </button>
            {/* <Link
              to="/chat"
              className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all font-medium text-sm"
            >
              Ask AI →
            </Link> */}
          </div>
        </div>
      )}
    </div>
</>

  )
}