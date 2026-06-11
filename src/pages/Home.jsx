import { Link } from 'react-router-dom'

const features = [
  {
    emoji: "💧",
    title: "Porosity Quiz",
    description: "Discover how your hair absorbs moisture and get a personalised routine.",
    link: "/quiz/porosity",
    cta: "Take the quiz"
  },
  {
    emoji: "🌀",
    title: "Curl Type Quiz",
    description: "Find out your curl pattern and learn how to work with it.",
    link: "/quiz/curl-type",
    cta: "Find my curl type"
  },
  // {
  //   emoji: "🤖",
  //   title: "AI Hair Chat",
  //   description: "Ask anything about your curly hair and get personalised advice instantly.",
  //   link: "/chat",
  //   cta: "Ask the AI"
  // },
  {
    emoji: "📓",
    title: "Wash Day Tracker",
    description: "Log your wash days, track products and see what works for your hair.",
    link: "/tracker",
    cta: "Coming soon"
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-20 px-4">
        <p className="text-teal uppercase tracking-widest text-sm font-sans mb-4">
          Welcome to The Curl Haven
        </p>
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-6 leading-tight">
          Your curly hair journey <br /> starts here
        </h1>
        <p className="text-charcoal/60 font-sans text-lg max-w-md mx-auto mb-10">
          Discover your hair type, build your routine and get personalised advice — all in one place.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/quiz/porosity"
            className="bg-purple text-white px-8 py-3 rounded-full font-sans hover:opacity-90 transition-all"
          >
            Take the quiz
          </Link>
          {/* <Link
            to="/chat"
            className="border border-teal text-teal px-8 py-3 rounded-full font-sans hover:bg-teal hover:text-white transition-all"
          >
            Ask the AI
          </Link> */}
        </div>
      </section>

      {/* Divider */}
      <div className="w-16 h-0.5 bg-mauve mx-auto mb-16" />

      {/* Features */}
      <section className="px-4">
        <h2 className="font-heading text-3xl text-center text-charcoal mb-10">
          Everything your curls need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="bg-cream border border-mauve/40 rounded-2xl p-6 hover:shadow-md transition-all">
              <span className="text-3xl mb-4 block">{f.emoji}</span>
              <h3 className="font-heading text-xl text-charcoal mb-2">{f.title}</h3>
              <p className="font-sans text-charcoal/60 text-sm mb-4">{f.description}</p>
              {f.cta === "Coming soon" ? (
                <span className="text-xs font-sans text-mauve border border-mauve/40 px-3 py-1 rounded-full">
                  Coming soon
                </span>
              ) : (
                <Link
                  to={f.link}
                  className="text-teal font-sans text-sm hover:underline"
                >
                  {f.cta} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-20 px-4">
        <div className="bg-cream border border-mauve/40 rounded-3xl p-12 max-w-xl mx-auto">
          <h2 className="font-heading text-3xl text-charcoal mb-4">
            Not sure where to start?
          </h2>
          <p className="font-sans text-charcoal/60 text-sm mb-6">
            Take our porosity quiz — it takes 2 minutes and gives you a full routine recommendation.
          </p>
          <Link
            to="/quiz/porosity"
            className="bg-teal text-white px-8 py-3 rounded-full font-sans hover:opacity-90 transition-all"
          >
            Start here →
          </Link>
        </div>
      </section>
    </div>
  )
}