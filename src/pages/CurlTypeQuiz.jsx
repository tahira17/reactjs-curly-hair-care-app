import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const questions = [
  {
    question: "When your hair air dries completely with no products, what does it look like?",
    options: [
      { text: "Mostly straight with a slight bend at the ends", score: 1 },
      { text: "Loose S-shaped waves", score: 2 },
      { text: "Defined S-shaped waves with more volume", score: 3 },
      { text: "Loose ringlets or spirals", score: 4 },
      { text: "Springy defined curls", score: 5 },
      { text: "Tight corkscrew curls", score: 6 },
      { text: "Very tight coils or zigzag pattern", score: 8 },
    ]
  },
  {
    question: "Compare one of your curls to an object — which is closest in size?",
    options: [
      { text: "Wider than a marker — very loose wave", score: 1 },
      { text: "About the size of a marker", score: 2 },
      { text: "About the size of a large finger", score: 4 },
      { text: "About the size of a pencil", score: 5 },
      { text: "About the size of a straw", score: 6 },
      { text: "Smaller than a straw — very tight", score: 8 },
    ]
  },
  {
    question: "How much does your hair shrink when it dries compared to when wet?",
    options: [
      { text: "Little to no shrinkage", score: 1 },
      { text: "Shrinks about 25%", score: 3 },
      { text: "Shrinks about 50%", score: 5 },
      { text: "Shrinks 75% or more", score: 8 },
    ]
  },
  {
    question: "How does your hair behave when wet?",
    options: [
      { text: "Stays mostly separated, doesn't clump", score: 2 },
      { text: "Forms loose soft clumps", score: 3 },
      { text: "Forms defined clumps naturally", score: 5 },
      { text: "Forms very tight small clumps", score: 8 },
    ]
  },
  {
    question: "Without any products, how does your hair behave?",
    options: [
      { text: "Stays relatively smooth", score: 1 },
      { text: "Gets a little frizzy", score: 3 },
      { text: "Gets very frizzy but still has pattern", score: 5 },
      { text: "Looks more frizzy than curly", score: 8 },
    ]
  },
]

const getResult = (avg) => {
  if (avg <= 1.5) return {
    type: "2A",
    title: "Type 2A — Barely There Waves",
    emoji: "🌊",
    description: "Your hair has a subtle S-shape that lies fairly flat. It's the finest and most easily weighed down of the wavy types. Lucky you — it's low maintenance!",
    tips: [
      "Use lightweight mousses or gels — avoid heavy creams",
      "Scrunch don't rub when drying",
      "Avoid brushing when dry — it kills the wave",
      "Try diffusing on low heat to enhance waves",
    ],
    color: "border-teal/40 bg-teal/10",
    badge: "bg-teal/20 text-teal",
    tip_color: "bg-teal/10 text-charcoal",
  }
  if (avg <= 2.5) return {
    type: "2B",
    title: "Type 2B — Defined Waves",
    emoji: "🌊",
    description: "Your waves are more defined S-shapes that start from the mid-length. You probably deal with some frizz and your hair can get flat at the roots.",
    tips: [
      "Apply products on soaking wet hair",
      "Use a microfibre towel to scrunch out excess water",
      "Root clipping while drying adds volume",
      "Light hold gels work best for you",
    ],
    color: "border-teal/40 bg-teal/10",
    badge: "bg-teal/20 text-teal",
    tip_color: "bg-teal/10 text-charcoal",
  }
  if (avg <= 3.5) return {
    type: "2C",
    title: "Type 2C — Strong Waves",
    emoji: "🌊",
    description: "Your waves are thick and start right from the root. Your hair sits between wavy and curly — on good days it looks curly, on humid days it's a frizz situation.",
    tips: [
      "Use a curl cream to enhance definition",
      "Try the squish to condish method",
      "Diffuse instead of air drying to reduce frizz",
      "Pineapple at night to preserve waves",
    ],
    color: "border-teal/40 bg-teal/10",
    badge: "bg-teal/20 text-teal",
    tip_color: "bg-teal/10 text-charcoal",
  }
  if (avg <= 4.5) return {
    type: "3A",
    title: "Type 3A — Loose Curls",
    emoji: "🌀",
    description: "You have large loose springy curls about the size of a large finger or marker. Your hair has lots of body and movement but is prone to frizz.",
    tips: [
      "Use a wide tooth comb only when wet and conditioned",
      "Apply curl cream mid-shaft to ends",
      "Plop your hair after washing to enhance curls",
      "Refresh with water and a little conditioner on day 2",
    ],
    color: "border-purple/40 bg-purple/10",
    badge: "bg-purple/20 text-purple",
    tip_color: "bg-purple/10 text-charcoal",
  }
  if (avg <= 5.5) return {
    type: "3B",
    title: "Type 3B — Springy Curls",
    emoji: "🌀",
    description: "Your curls are springy and well defined, about pencil size. You have a lot of volume and your hair shrinks noticeably when dry.",
    tips: [
      "Deep condition every wash day — moisture is key",
      "Use the LOC method (liquid, oil, cream)",
      "Detangle only with fingers or wide tooth comb",
      "Satin pillowcase or bonnet at night is a must",
    ],
    color: "border-purple/40 bg-purple/10",
    badge: "bg-purple/20 text-purple",
    tip_color: "bg-purple/10 text-charcoal",
  }
  if (avg <= 6.5) return {
    type: "3C",
    title: "Type 3C — Tight Curls",
    emoji: "🌀",
    description: "Your curls are tight and voluminous, about straw size or smaller. You have significant shrinkage and your hair is dense with lots of texture.",
    tips: [
      "Moisturise daily — your hair needs it",
      "Protective styles help retain length",
      "Use a denman brush on wet hair for definition",
      "Avoid heat as much as possible",
    ],
    color: "border-purple/40 bg-purple/10",
    badge: "bg-purple/20 text-purple",
    tip_color: "bg-purple/10 text-charcoal",
  }
  if (avg <= 7.5) return {
    type: "4A",
    title: "Type 4A — Soft Coils",
    emoji: "✨",
    description: "Your coils are tight S-shaped patterns, very defined when wet. You have high shrinkage and your hair thrives with lots of moisture.",
    tips: [
      "Co-wash between shampoo days to retain moisture",
      "Shingling with a curl cream defines your coils beautifully",
      "Always detangle on wet conditioned hair",
      "Protective styles are your best friend for length retention",
    ],
    color: "border-mauve/60 bg-mauve/20",
    badge: "bg-mauve/40 text-charcoal",
    tip_color: "bg-mauve/20 text-charcoal",
  }
  if (avg <= 8.5) return {
    type: "4B",
    title: "Type 4B — Z-Pattern Coils",
    emoji: "✨",
    description: "Your hair has a Z-shaped or sharp angle pattern rather than a defined curl. It's very dense, shrinks up to 70% and is the most fragile type.",
    tips: [
      "Moisture moisture moisture — your hair is thirsty",
      "Finger detangle only — tools cause too much breakage",
      "Twist outs and braid outs are perfect for your type",
      "Seal every wash day with a heavy butter or oil",
    ],
    color: "border-mauve/60 bg-mauve/20",
    badge: "bg-mauve/40 text-charcoal",
    tip_color: "bg-mauve/20 text-charcoal",
  }
  return {
    type: "4C",
    title: "Type 4C — Tight Coils",
    emoji: "✨",
    description: "Your hair has the tightest coil pattern with the most shrinkage — up to 75% or more. It's incredibly versatile and strong but needs the most moisture and gentle handling.",
    tips: [
      "Never manipulate your hair when dry",
      "Deep condition every single wash day",
      "Stretch your hair with braids or twists to reduce breakage",
      "The greenhouse effect method helps with moisture retention",
    ],
    color: "border-mauve/60 bg-mauve/20",
    badge: "bg-mauve/40 text-charcoal",
    tip_color: "bg-mauve/20 text-charcoal",
  }
}

export default function CurlTypeQuiz() {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState([])
  const [done, setDone] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const q = questions[current]

  const answer = (score) => {
    const newScores = [...scores, score]

    if (current + 1 === questions.length) {
      const avg = newScores.reduce((a, b) => a + b, 0) / newScores.length
      setScores(newScores)
      setDone(true)
      setTimeout(() => setShowResult(true), 4000)
    } else {
      setScores(newScores)
      setCurrent(current + 1)
    }
  }

  const restart = () => {
    setCurrent(0)
    setScores([])
    setDone(false)
    setShowResult(false)
  }

  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const result = getResult(avg)

  return (
    <>
      <Helmet>
        <title>Curl Type Quiz — Find Your Curl Pattern | The Curl Haven</title>
        <meta name="description" content="Take our free curl type quiz to find out if you have wavy, curly or coily hair and get personalised tips for your curl pattern." />
        <meta name="keywords" content="curl type quiz, wavy hair, curly hair type, coily hair, 2a 2b 3a 3b 4c hair quiz" />
      </Helmet>

      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">Curl Type Quiz</h1>
        <p className="text-charcoal/60 font-sans mb-8">Find your curl pattern and learn how to work with it</p>

        {!done ? (
          <div>
            {/* Progress bar */}
            <div className="flex gap-1 mb-8">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < current ? 'bg-purple' : i === current ? 'bg-purple/40' : 'bg-mauve/40'}`} />
              ))}
            </div>

            <div className="mb-6">
              <p className="text-sm text-charcoal/40 font-sans mb-1">
                Question {current + 1} of {questions.length}
              </p>
              <h2 className="text-xl font-heading text-charcoal">{q.question}</h2>
            </div>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(opt.score)}
                  className="text-left border border-mauve/40 rounded-xl px-5 py-4 font-sans text-charcoal hover:border-purple hover:bg-purple/5 transition-all"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

        ) : done && !showResult ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-mauve"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple border-t-transparent animate-spin"></div>
              <span className="absolute inset-0 flex items-center justify-center text-2xl">🌀</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-heading text-charcoal">Analysing your curl pattern...</p>
              <p className="text-sm text-charcoal/40 font-sans mt-1">Finding your perfect curl type</p>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-purple animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-purple animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>

        ) : (
          <div
            className={`border rounded-2xl p-8 ${result.color}`}
            style={{ animation: 'popIn 0.4s ease-out' }}
          >
            <span className={`text-xs font-sans font-semibold px-3 py-1 rounded-full ${result.badge}`}>
              {result.type}
            </span>
            <h2 className="text-3xl font-heading text-charcoal mt-4 mb-2">
              {result.emoji} {result.title}
            </h2>
            <p className="font-sans text-charcoal/70 leading-relaxed mb-6">
              {result.description}
            </p>

            <h3 className="font-heading text-lg text-charcoal mb-3">Your tips:</h3>
            <ul className="flex flex-col gap-2 mb-6">
              {result.tips.map((tip, i) => (
                <li key={i} className={`text-sm font-sans px-4 py-2 rounded-lg ${result.tip_color}`}>
                  ✓ {tip}
                </li>
              ))}
            </ul>

            <p className="text-sm font-sans text-charcoal/50 mb-4">
              Want a personalised routine based on your curl type? Ask our AI.
            </p>

            <div className="flex gap-3">
              <button
                onClick={restart}
                className="border border-mauve/60 px-5 py-2 rounded-full font-sans text-sm text-charcoal hover:bg-white transition-all"
              >
                Retake Quiz
              </button>
              <Link
                to="/chat"
                className="bg-purple text-white px-5 py-2 rounded-full font-sans text-sm hover:opacity-90 transition-all"
              >
                Ask AI →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}