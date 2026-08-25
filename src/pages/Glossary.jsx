import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const terms = [
  { term: 'CG Method', definition: 'Short for "Curly Girl Method" — a set of guidelines avoiding sulfates, silicones and drying alcohols to help curls retain moisture and definition.' },
  { term: 'Co-washing', definition: 'Washing hair with conditioner only, skipping shampoo, to cleanse gently without stripping natural oils.' },
  { term: 'Plopping', definition: 'Wrapping wet hair in a t-shirt or microfiber towel to enhance curl definition and reduce frizz while drying.' },
  { term: 'LOC Method', definition: 'Liquid, Oil, Cream — a layering technique used to lock moisture into the hair shaft.' },
  { term: 'LCO Method', definition: 'Liquid, Cream, Oil — a variation of LOC where the oil is applied last to seal everything in, often used by higher porosity hair.' },
  { term: 'Squish to Condish', definition: 'A technique where conditioner is squished into soaking wet hair to encourage curl clumping and definition.' },
  { term: 'Pineapple Method', definition: 'Gathering curls loosely on top of the head before sleeping to preserve curl shape and reduce flattening overnight.' },
  { term: 'Porosity', definition: 'How well hair absorbs and retains moisture, determined by how open or closed the hair cuticle is.' },
  { term: 'Hygral Fatigue', definition: 'Damage caused by repeated swelling and shrinking of the hair shaft from excessive moisture without enough protein balance.' },
  { term: 'Protein Treatment', definition: 'A treatment that adds strength to the hair shaft, often needed for high porosity or chemically treated hair.' },
  { term: 'Clarifying Shampoo', definition: 'A deep cleansing shampoo that removes product buildup, often used before starting the CG method or once a month.' },
  { term: 'Cast', definition: 'The stiff, crunchy feeling gel leaves on curls after drying, which is broken down later by scrunching.' },
  { term: 'Scrunch Out the Crunch (SOTC)', definition: 'Scrunching dried, gel-cast curls to break the cast and reveal softer, more touchable curls.' },
  { term: 'Finger Coiling', definition: 'Wrapping individual sections of curls around a finger while applying product to enhance definition.' },
  { term: 'Shrinkage', definition: 'How much shorter hair appears when dry compared to its actual stretched length, common in curlier and coilier hair types.' },
  { term: 'Second Day Hair', definition: 'Refreshing curls on the second (or later) day after washing using water and a small amount of product instead of a full wash.' },
  { term: 'Low Porosity', definition: 'A hair type where the cuticle lies very flat, making it harder for moisture to enter but easier to retain once absorbed.' },
  { term: 'High Porosity', definition: 'A hair type where the cuticle is raised or damaged, absorbing moisture quickly but losing it just as fast.' },
  { term: 'Denman Brush', definition: 'A brush with rows of flexible bristles commonly used to detangle and define curls on wet, conditioned hair.' },
  { term: 'Curl Cast', definition: 'See "Cast" — the dried gel layer that holds curl definition until broken.' },
]

export default function Glossary() {
  const [search, setSearch] = useState('')

  const filtered = terms
    .filter((t) => t.term.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <>
      <Helmet>
        <title>Curly Hair Glossary — Common Terms Explained | The Curl Haven</title>
        <meta name="description" content="A simple glossary of curly hair terms like LOC method, plopping, porosity, hygral fatigue and more — explained clearly." />
      </Helmet>

      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">Curly Hair Glossary</h1>
        <p className="text-charcoal/60 font-sans mb-6">
          Confusing terms explained simply — search or scroll to browse
        </p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a term..."
          className="w-full border border-mauve/40 rounded-full px-5 py-3 font-sans text-sm text-charcoal placeholder-charcoal/30 outline-none focus:border-purple transition-all mb-8 bg-white"
        />

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <p className="text-center font-sans text-charcoal/40 text-sm py-10">No terms found for "{search}"</p>
          ) : (
            filtered.map((t, i) => (
              <div key={i} className="border border-mauve/40 rounded-xl p-5 bg-white">
                <h3 className="font-heading text-lg text-purple mb-1">{t.term}</h3>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{t.definition}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}