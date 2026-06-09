import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <nav className="border-b px-8 py-4 flex justify-between items-center relative">
      <span className="text-xl font-bold">🌀 </span>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-purple-500">Home</Link>

        {/* Quiz Dropdown */}
        <div className="relative">
          <button
            onClick={() => setQuizOpen(!quizOpen)}
            className="hover:text-purple-500 flex items-center gap-1"
          >
            Quizzes ▾
          </button>
          {quizOpen && (
            <div className="absolute top-8 left-0 bg-white border rounded-lg shadow-md w-48 z-10">
              <Link
                to="/quiz/porosity"
                onClick={() => setQuizOpen(false)}
                className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-500"
              >
                Porosity Quiz
              </Link>
              <Link
                to="/quiz/curl-type"
                onClick={() => setQuizOpen(false)}
                className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-500"
              >
                Curl Type Quiz
              </Link>
            </div>
          )}
        </div>

        <Link to="/chat" className="hover:text-purple-500">AI Chat</Link>
      </div>
    </nav>
  )
}