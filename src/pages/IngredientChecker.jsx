import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const bannedIngredients = [
  // Sulfates
  { name: 'Sodium Lauryl Sulfate', reason: 'Harsh sulfate — strips natural oils', category: 'Sulfate' },
  { name: 'Sodium Laureth Sulfate', reason: 'Harsh sulfate — strips natural oils', category: 'Sulfate' },
  { name: 'Ammonium Lauryl Sulfate', reason: 'Harsh sulfate — strips natural oils', category: 'Sulfate' },
  { name: 'Sodium Lauryl Sulfoacetate', reason: 'Sulfate — can be drying', category: 'Sulfate' },
  // Silicones
  { name: 'Dimethicone', reason: 'Non water soluble silicone — causes buildup', category: 'Silicone' },
  { name: 'Cyclomethicone', reason: 'Non water soluble silicone — causes buildup', category: 'Silicone' },
  { name: 'Amodimethicone', reason: 'Silicone — causes buildup over time', category: 'Silicone' },
  { name: 'Trimethicone', reason: 'Non water soluble silicone', category: 'Silicone' },
  { name: 'Cyclopentasiloxane', reason: 'Silicone — causes buildup', category: 'Silicone' },
  { name: 'Dimethiconol', reason: 'Silicone derivative — causes buildup', category: 'Silicone' },
  // Drying alcohols
  { name: 'Alcohol Denat', reason: 'Drying alcohol — strips moisture', category: 'Drying Alcohol' },
  { name: 'Isopropyl Alcohol', reason: 'Drying alcohol — strips moisture', category: 'Drying Alcohol' },
  { name: 'Propanol', reason: 'Drying alcohol — strips moisture', category: 'Drying Alcohol' },
  { name: 'Ethanol', reason: 'Drying alcohol — strips moisture', category: 'Drying Alcohol' },
]

const siliconePatterns = ['-cone', '-conol', '-xane', '-silane', 'siloxane']

const goodAlcohols = ['cetyl alcohol', 'stearyl alcohol', 'cetearyl alcohol', 'behenyl alcohol']

const checkIngredients = (input) => {
  const lines = input.split(/,|\n/).map(i => i.trim()).filter(Boolean)
  const flagged = []
  const safe = []

  for (const ingredient of lines) {
    const lower = ingredient.toLowerCase()

    // Skip good alcohols
    if (goodAlcohols.some(g => lower.includes(g))) {
      safe.push({ name: ingredient, reason: 'Moisturising alcohol — CG friendly' })
      continue
    }

    // Check banned list
    const banned = bannedIngredients.find(b => lower.includes(b.name.toLowerCase()))
    if (banned) {
      flagged.push({ name: ingredient, reason: banned.reason, category: banned.category })
      continue
    }

    // Check silicone patterns
    const isSilicone = siliconePatterns.some(p => lower.includes(p))
    if (isSilicone) {
      flagged.push({ name: ingredient, reason: 'Silicone — causes buildup', category: 'Silicone' })
      continue
    }

    safe.push({ name: ingredient, reason: 'No issues found' })
  }

  return { flagged, safe }
}

const categoryColors = {
  Sulfate: 'bg-red-50 border-red-200 text-red-700',
  Silicone: 'bg-orange-50 border-orange-200 text-orange-700',
  'Drying Alcohol': 'bg-yellow-50 border-yellow-200 text-yellow-700',
}

export default function IngredientChecker() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const check = () => {
    if (!input.trim()) return
    const checked = checkIngredients(input)
    setResult(checked)
  }

  const reset = () => {
    setInput('')
    setResult(null)
  }

  return (
    <>
      <Helmet>
        <title>CG Ingredient Checker — Is My Product Curly Girl Approved? | The Curl Haven</title>
        <meta name="description" content="Check if your hair product is Curly Girl approved. Paste the ingredient list and we'll flag any sulfates, silicones or drying alcohols instantly." />
        <meta name="keywords" content="curly girl ingredient checker, CG approved products, silicone free, sulfate free checker" />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">Ingredient Checker</h1>
        <p className="text-charcoal/60 font-sans mb-8">
          Paste your product's ingredient list and we'll check if it's Curly Girl approved
        </p>

        {!result ? (
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste ingredients here... e.g. Water, Cetyl Alcohol, Dimethicone, Sodium Laureth Sulfate..."
              className="w-full h-48 border border-mauve/40 rounded-2xl p-4 font-sans text-sm text-charcoal placeholder-charcoal/30 outline-none focus:border-purple transition-all resize-none bg-cream"
            />
            <p className="text-xs text-charcoal/40 font-sans mt-2 mb-6">
              Tip — separate ingredients with commas or paste directly from the product label
            </p>
            <button
              onClick={check}
              className="bg-purple text-white px-8 py-3 rounded-full font-sans hover:opacity-90 transition-all"
            >
              Check ingredients
            </button>
          </div>

        ) : (
          <div>
            {/* Verdict */}
            <div className={`rounded-2xl p-6 mb-6 border ${result.flagged.length === 0
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'}`}
            >
              <h2 className="text-2xl font-heading mb-1">
                {result.flagged.length === 0 ? '✅ CG Approved!' : '❌ Not CG Approved'}
              </h2>
              <p className="font-sans text-sm text-charcoal/70">
                {result.flagged.length === 0
                  ? 'No banned ingredients found — this product looks good for curly hair!'
                  : `Found ${result.flagged.length} problematic ingredient${result.flagged.length > 1 ? 's' : ''} — this product is not CG friendly.`}
              </p>
            </div>

            {/* Flagged ingredients */}
            {result.flagged.length > 0 && (
              <div className="mb-6">
                <h3 className="font-heading text-lg text-charcoal mb-3">❌ Flagged ingredients</h3>
                <div className="flex flex-col gap-2">
                  {result.flagged.map((f, i) => (
                    <div key={i} className={`border rounded-xl px-4 py-3 ${categoryColors[f.category] || 'bg-red-50 border-red-200 text-red-700'}`}>
                      <div className="flex justify-between items-start">
                        <span className="font-sans text-sm font-medium">{f.name}</span>
                        <span className="text-xs border rounded-full px-2 py-0.5 ml-2 shrink-0 border-current">
                          {f.category}
                        </span>
                      </div>
                      <p className="text-xs mt-1 opacity-80">{f.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safe ingredients */}
            <div className="mb-8">
              <h3 className="font-heading text-lg text-charcoal mb-3">✅ Safe ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {result.safe.map((s, i) => (
                  <span key={i} className="text-xs font-sans bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-full">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="border border-mauve/60 px-5 py-2 rounded-full font-sans text-sm text-charcoal hover:bg-cream transition-all"
              >
                Check another product
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}