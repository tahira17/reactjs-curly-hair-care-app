import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const porosityOptions = ['Low', 'Medium', 'High']
const curlOptions = ['Wavy (2A-2C)', 'Curly (3A-3C)', 'Coily (4A-4C)']

const routines = {
  'Low-Wavy (2A-2C)': {
    steps: [
      'Cleanse with a lightweight, sulfate-free shampoo once or twice a week',
      'Apply a liquid leave-in to soaking wet hair — avoid heavy creams',
      'Use a light gel for hold without weighing down waves',
      'Apply heat briefly while diffusing to help open the cuticle',
      'Avoid heavy oils and butters — they will sit on top and look greasy',
    ],
    avoid: ['Heavy butters', 'Thick creams', 'Multiple product layers'],
  },
  'Low-Curly (3A-3C)': {
    steps: [
      'Clarify monthly to prevent product buildup',
      'Use heat when deep conditioning to help products absorb',
      'Apply liquid-based leave-ins rather than thick creams',
      'Seal with a light oil, not a heavy butter',
      'Style on soaking wet hair so product can actually penetrate',
    ],
    avoid: ['Heavy butters', 'Layering too many products', 'Cold water rinses'],
  },
  'Low-Coily (4A-4C)': {
    steps: [
      'Use steam or warm water to help open the cuticle before conditioning',
      'Apply leave-in conditioner in small sections on soaking wet hair',
      'Use a lightweight cream rather than a heavy butter',
      'Seal ends with a light oil like jojoba',
      'Avoid silicone-heavy products that increase buildup risk',
    ],
    avoid: ['Heavy butters', 'Silicone-based products', 'Skipping clarifying washes'],
  },
  'Medium-Wavy (2A-2C)': {
    steps: [
      'Cleanse with a gentle sulfate-free shampoo',
      'Apply a light to medium leave-in conditioner',
      'Use a light gel or mousse for definition',
      'Air dry or diffuse on low heat',
      'Refresh with water and a touch of leave-in on day two',
    ],
    avoid: ['Overly heavy products', 'Too much protein too often'],
  },
  'Medium-Curly (3A-3C)': {
    steps: [
      'Cleanse and deep condition weekly',
      'Apply leave-in and curl cream using the LOC method',
      'Use the squish to condish technique for extra moisture',
      'Plop with a microfiber towel or t-shirt to reduce frizz',
      'Refresh curls with a water and leave-in mix between washes',
    ],
    avoid: ['Skipping conditioner', 'Over-brushing dry hair'],
  },
  'Medium-Coily (4A-4C)': {
    steps: [
      'Deep condition every wash day with gentle heat',
      'Apply products in small sections for even coverage',
      'Use the LOC or LCO method depending on what feels best',
      'Protective style regularly to retain length',
      'Moisturize mid-week with a leave-in and light oil',
    ],
    avoid: ['Excessive manipulation when dry', 'Long gaps between moisture'],
  },
  'High-Wavy (2A-2C)': {
    steps: [
      'Use a moisturizing, sulfate-free shampoo',
      'Apply leave-in conditioner and seal immediately with oil',
      'Use a cream-gel combo for both moisture and hold',
      'Avoid protein-heavy products, which can cause dryness or stiffness',
      'Rinse with cool water to help the cuticle close',
    ],
    avoid: ['Protein overload', 'Skipping the sealing step'],
  },
  'High-Curly (3A-3C)': {
    steps: [
      'Deep condition every single wash day without exception',
      'Apply the full LOC method — liquid, oil, then cream',
      'Use rich, thick creams and butters to seal moisture in',
      'Add a balanced protein treatment every few weeks',
      'Rinse with cool water at the end of your shower',
    ],
    avoid: ['Skipping deep conditioner', 'Using only lightweight products'],
  },
  'High-Coily (4A-4C)': {
    steps: [
      'Deep condition with heat every wash day',
      'Use thick butters and rich creams to seal in moisture',
      'Apply the LOC method generously, focusing on ends',
      'Use protective styles to minimize daily manipulation',
      'Add a protein treatment monthly to strengthen strands',
    ],
    avoid: ['Going too long without moisture', 'Excessive heat styling'],
  },
}

export default function RoutineBuilder() {
  const [porosity, setPorosity] = useState('')
  const [curlType, setCurlType] = useState('')
  const [result, setResult] = useState(null)

  const buildRoutine = () => {
    if (!porosity || !curlType) return
    const key = `${porosity}-${curlType}`
    setResult(routines[key])
  }

  const reset = () => {
    setPorosity('')
    setCurlType('')
    setResult(null)
  }

  return (
    <>
      <Helmet>
        <title>Build Your Curly Hair Routine | The Curl Haven</title>
        <meta name="description" content="Get a personalised curly hair routine based on your porosity and curl type. Free routine builder for wavy, curly and coily hair." />
      </Helmet>

      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">Build Your Routine</h1>
        <p className="text-charcoal/60 font-sans mb-8">
          Select your porosity and curl type to get a personalised routine
        </p>

        {!result ? (
          <div className="border border-mauve/40 rounded-2xl p-6 bg-white">
            <label className="block text-sm font-sans text-charcoal mb-2">What's your porosity?</label>
            <div className="flex gap-2 mb-6">
              {porosityOptions.map((p) => (
                <button
                  key={p}
                  onClick={() => setPorosity(p)}
                  className={`flex-1 border rounded-xl py-2.5 text-sm font-sans transition-all ${porosity === p ? 'border-purple bg-purple/10 text-purple' : 'border-mauve/40 text-charcoal hover:border-purple/50'}`}
                >
                  {p}
                </button>
              ))}
            </div>

            <label className="block text-sm font-sans text-charcoal mb-2">What's your curl type?</label>
            <div className="flex flex-col gap-2 mb-6">
              {curlOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurlType(c)}
                  className={`border rounded-xl py-2.5 text-sm font-sans transition-all ${curlType === c ? 'border-purple bg-purple/10 text-purple' : 'border-mauve/40 text-charcoal hover:border-purple/50'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={buildRoutine}
              disabled={!porosity || !curlType}
              className="w-full bg-purple text-white py-3 rounded-full font-sans text-sm hover:opacity-90 transition-all disabled:opacity-40"
            >
              Build my routine
            </button>

            <p className="text-xs font-sans text-charcoal/40 mt-4 text-center">
              Don't know your type yet?{' '}
              <Link to="/quiz/porosity" className="text-teal hover:underline">Take the porosity quiz</Link>
              {' '}or{' '}
              <Link to="/quiz/curl-type" className="text-teal hover:underline">curl type quiz</Link>
            </p>
          </div>
        ) : (
          <div className="border border-purple/30 bg-purple/5 rounded-2xl p-8" style={{ animation: 'popIn 0.4s ease-out' }}>
            <span className="text-xs font-sans font-semibold px-3 py-1 rounded-full bg-purple/20 text-purple">
              {porosity} Porosity · {curlType}
            </span>
            <h2 className="text-2xl font-heading text-charcoal mt-4 mb-4">Your Personalised Routine</h2>

            <ol className="flex flex-col gap-3 mb-6">
              {result.steps.map((step, i) => (
                <li key={i} className="flex gap-3 font-sans text-sm text-charcoal/80">
                  <span className="font-heading text-purple shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="font-heading text-base text-charcoal mb-2">Try to avoid:</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {result.avoid.map((item, i) => (
                <span key={i} className="text-xs font-sans bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-full">
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={reset}
              className="border border-mauve/60 px-5 py-2 rounded-full font-sans text-sm text-charcoal hover:bg-white transition-all"
            >
              Build another routine
            </button>
          </div>
        )}
      </div>
    </>
  )
}