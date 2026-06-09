import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PorosityQuiz from './pages/porosityQuiz'
import CurlTypeQuiz from './pages/curlTypeQuiz'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/porosity" element={<PorosityQuiz />} />
          <Route path="/quiz/curl-type" element={<CurlTypeQuiz />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}