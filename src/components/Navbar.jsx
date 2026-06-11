import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/logo.jpeg'

export default function Navbar() {
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <nav className="border-b border-mauve/30 px-8 py-3 flex justify-between items-center relative bg-white">
      <Link to="/">
        <img src={logo} alt="The Curl Haven" className="h-14 w-auto" />
      </Link>

      <div className="flex gap-6 items-center font-sans text-sm text-charcoal">
        <Link to="/" className="hover:text-purple transition-all">Home</Link>

        <div className="relative">
          <button
            onClick={() => setQuizOpen(!quizOpen)}
            className="hover:text-purple transition-all flex items-center gap-1"
          >
            Quizzes ▾
          </button>
          {quizOpen && (
            <div className="absolute top-8 left-0 bg-white border border-mauve/30 rounded-xl shadow-md w-52 z-10">
              <Link
                to="/quiz/porosity"
                onClick={() => setQuizOpen(false)}
                className="block px-4 py-3 hover:bg-purple/5 hover:text-purple transition-all text-charcoal"
              >
                💧 Porosity Quiz
              </Link>
              <Link
                to="/quiz/curl-type"
                onClick={() => setQuizOpen(false)}
                className="block px-4 py-3 hover:bg-purple/5 hover:text-purple transition-all text-charcoal"
              >
                🌀 Curl Type Quiz
              </Link>
            </div>
          )}
        </div>

        <Link to="/ingredients" className="hover:text-purple transition-all">Ingredient Checker</Link>
        {/* <Link to="/chat" className="hover:text-purple transition-all">AI Chat</Link> */}
      </div>
    </nav>
  )
}