import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const symptoms = [
  {
    label: 'Frizzy all over, no definition',
    causes: ['Low moisture in the hair', 'Not enough product for your porosity', 'Touching or brushing hair while dry'],
    fixes: [
      'Apply products to soaking wet hair, not just damp',
      'Increase leave-in conditioner and seal with oil or cream',
      'Avoid touching curls until fully dry',
    ],
  },
  {
    label: 'Flat at the roots, frizzy at the ends',
    causes: ['Product weighing down roots', 'Fine hair texture', 'Not enough volume technique used'],
    fixes: [
      'Apply root-lifting techniques like clipping while drying',
      'Use lighter products near the roots, richer ones on ends',
      'Try diffusing upside down for extra root volume',
    ],
  },
  {
    label: 'Dry and frizzy no matter what I use',
    causes: ['High porosity losing moisture fast', 'Not sealing properly after moisturizing', 'Heat damage'],
    fixes: [
      'Use the full LOC method — liquid, oil, then cream',
      'Add a weekly deep conditioning treatment',
      'Reduce heat styling and use heat protectant when needed',
    ],
  },
  {
    label: 'Frizzy specifically in humid weather',
    causes: ['High porosity reacting to moisture in the air', 'Lack of a strong sealant', 'No anti-humidity product used'],
    fixes: [
      'Seal hair well with a butter or heavier cream on humid days',
      'Use an anti-humidity spray or gel as a final step',
      'Avoid lightweight products on days with high humidity',
    ],
  },
  {
    label: 'Looks greasy and frizzy at the same time',
    causes: ['Product buildup from silicones', 'Overusing heavy products on low porosity hair', 'Not clarifying often enough'],
    fixes: [
      'Clarify with a sulfate-free clarifying shampoo every 2-4 weeks',
      'Reduce product amount, especially heavy creams and oils',
      'Check your products for non-soluble silicones',
    ],
  },
  {
    label: 'Frizzy after sleeping, fine before bed',
    causes: ['Cotton pillowcase absorbing moisture and creating friction', 'Hair not protected overnight', 'Tossing and turning disrupting curl pattern'],
    fixes: [
      'Switch to a satin or silk pillowcase',
      'Try the pineapple method to preserve curl shape overnight',
      'Consider a silk or satin bonnet for extra protection',
    ],
  },
]

export default function FrizzTroubleshooter() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Helmet>
        <title>Frizz Troubleshooter — Why Is My Hair Frizzy? | The Curl Haven</title>
        <meta name="description" content="Find out exactly why your curly hair is frizzy and get real fixes based on your specific symptom. Free frizz troubleshooting tool." />
      </Helmet>

      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">Frizz Troubleshooter</h1>
        <p className="text-charcoal/60 font-sans mb-8">
          Select what's happening with your curls and get real fixes
        </p>

        {!selected ? (
          <div className="flex flex-col gap-3">
            {symptoms.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelected(s)}
                className="text-left border border-mauve/40 rounded-xl px-5 py-4 font-sans text-sm text-charcoal hover:border-purple hover:bg-purple/5 transition-all"
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="border border-purple/30 bg-purple/5 rounded-2xl p-8" style={{ animation: 'popIn 0.4s ease-out' }}>
            <h2 className="text-xl font-heading text-charcoal mb-4">{selected.label}</h2>

            <h3 className="font-heading text-base text-charcoal mb-2">Likely causes:</h3>
            <ul className="flex flex-col gap-1.5 mb-6">
              {selected.causes.map((c, i) => (
                <li key={i} className="font-sans text-sm text-charcoal/70">• {c}</li>
              ))}
            </ul>

            <h3 className="font-heading text-base text-charcoal mb-2">What to try:</h3>
            <ul className="flex flex-col gap-2 mb-6">
              {selected.fixes.map((f, i) => (
                <li key={i} className="text-sm font-sans bg-teal/10 text-charcoal px-4 py-2 rounded-lg">
                  ✓ {f}
                </li>
              ))}
            </ul>

            <p className="text-xs font-sans text-charcoal/50 mb-4">
              Want a deeper answer? Knowing your exact porosity helps a lot.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setSelected(null)}
                className="border border-mauve/60 px-5 py-2 rounded-full font-sans text-sm text-charcoal hover:bg-white transition-all"
              >
                Try another symptom
              </button>
              <Link
                to="/quiz/porosity"
                className="bg-purple text-white px-5 py-2 rounded-full font-sans text-sm hover:opacity-90 transition-all"
              >
                Take Porosity Quiz →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}