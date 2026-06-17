import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const STORAGE_KEY = 'curlhaven_wash_log'

const moodOptions = [
  { emoji: '😍', label: 'Loved it' },
  { emoji: '🙂', label: 'Pretty good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😕', label: 'Not great' },
]

export default function WashDayTracker() {
  const [entries, setEntries] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [products, setProducts] = useState('')
  const [mood, setMood] = useState(null)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setEntries(JSON.parse(saved))
    } catch (e) {
      console.error('Could not load wash log', e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0])
    setProducts('')
    setMood(null)
    setNotes('')
    setShowForm(false)
  }

  const addEntry = () => {
    if (!products.trim() || !mood) return
    const newEntry = { id: Date.now(), date, products, mood, notes }
    setEntries([newEntry, ...entries])
    resetForm()
  }

  const deleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id))
  }

  const getStreak = () => {
    if (entries.length === 0) return 0
    const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))
    let streak = 1
    for (let i = 0; i < sorted.length - 1; i++) {
      const diff = (new Date(sorted[i].date) - new Date(sorted[i + 1].date)) / (1000 * 60 * 60 * 24)
      if (diff <= 7) streak++
      else break
    }
    return streak
  }

  return (
    <>
      <Helmet>
        <title>Wash Day Tracker — Log Your Curly Hair Routine | The Curl Haven</title>
        <meta name="description" content="Track your curly hair wash days, log products used and see how your hair responds over time with our free wash day tracker." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">Wash Day Tracker</h1>
        <p className="text-charcoal/60 font-sans mb-2">
          Log your wash days and see what actually works for your hair
        </p>
        <p className="text-xs text-charcoal/40 font-sans mb-8">
          Your entries are saved on this device only. Clearing your browser data will erase them.
        </p>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-cream border border-mauve/40 rounded-2xl p-4 text-center">
            <p className="text-2xl font-heading text-purple">{entries.length}</p>
            <p className="text-xs font-sans text-charcoal/60">Total logs</p>
          </div>
          <div className="flex-1 bg-cream border border-mauve/40 rounded-2xl p-4 text-center">
            <p className="text-2xl font-heading text-teal">{getStreak()}</p>
            <p className="text-xs font-sans text-charcoal/60">Wash day streak</p>
          </div>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-purple text-white py-3 rounded-full font-sans text-sm hover:opacity-90 transition-all mb-8"
          >
            + Log a wash day
          </button>
        ) : (
          <div className="border border-mauve/40 rounded-2xl p-6 mb-8 bg-white">
            <h3 className="font-heading text-lg text-charcoal mb-4">New wash day entry</h3>

            <label className="block text-xs font-sans text-charcoal/60 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-mauve/40 rounded-xl px-4 py-2.5 font-sans text-sm text-charcoal outline-none focus:border-purple transition-all mb-4 bg-cream"
            />

            <label className="block text-xs font-sans text-charcoal/60 mb-1">Products used</label>
            <input
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              placeholder="e.g. CG shampoo, leave-in, curl cream"
              className="w-full border border-mauve/40 rounded-xl px-4 py-2.5 font-sans text-sm text-charcoal placeholder-charcoal/30 outline-none focus:border-purple transition-all mb-4 bg-cream"
            />

            <label className="block text-xs font-sans text-charcoal/60 mb-2">How did your hair feel?</label>
            <div className="flex gap-2 mb-4">
              {moodOptions.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setMood(m.label)}
                  className={`flex-1 border rounded-xl py-3 text-center transition-all ${mood === m.label ? 'border-purple bg-purple/10' : 'border-mauve/40 hover:border-purple/50'}`}
                >
                  <span className="text-2xl block mb-1">{m.emoji}</span>
                  <span className="text-xs font-sans text-charcoal/70">{m.label}</span>
                </button>
              ))}
            </div>

            <label className="block text-xs font-sans text-charcoal/60 mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything you noticed — frizz, definition, dryness..."
              className="w-full h-20 border border-mauve/40 rounded-xl px-4 py-2.5 font-sans text-sm text-charcoal placeholder-charcoal/30 outline-none focus:border-purple transition-all mb-4 resize-none bg-cream"
            />

            <div className="flex gap-3">
              <button
                onClick={addEntry}
                disabled={!products.trim() || !mood}
                className="flex-1 bg-purple text-white py-2.5 rounded-full font-sans text-sm hover:opacity-90 transition-all disabled:opacity-40"
              >
                Save entry
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-full font-sans text-sm border border-mauve/60 text-charcoal hover:bg-cream transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🌀</p>
            <p className="font-sans text-charcoal/50 text-sm">
              No wash days logged yet. Add your first one above!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((entry) => {
              const moodData = moodOptions.find((m) => m.label === entry.mood)
              return (
                <div key={entry.id} className="border border-mauve/40 rounded-2xl p-5 bg-white flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{moodData?.emoji}</span>
                      <p className="font-sans text-sm font-medium text-charcoal">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <span className="text-xs font-sans text-charcoal/40">· {entry.mood}</span>
                    </div>
                    <p className="font-sans text-sm text-charcoal/70 mb-1">{entry.products}</p>
                    {entry.notes && <p className="font-sans text-xs text-charcoal/50 italic">{entry.notes}</p>}
                  </div>
                  <button onClick={() => deleteEntry(entry.id)} className="text-charcoal/30 hover:text-red-400 transition-all text-sm shrink-0">
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}