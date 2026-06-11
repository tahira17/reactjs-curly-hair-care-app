import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PorosityQuiz from './pages/PorosityQuiz'
import CurlTypeQuiz from './pages/CurlTypeQuiz'
import Chat from './pages/Chat'
import IngredientChecker from './pages/IngredientChecker'
import Footer from './components/Footer'


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/porosity" element={<PorosityQuiz />} />
          <Route path="/quiz/curl-type" element={<CurlTypeQuiz />} />
          <Route path="/ingredients" element={<IngredientChecker />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}