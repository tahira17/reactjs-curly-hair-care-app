import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

export default function Footer() {
  return (
    <footer className="border-t border-mauve/30 mt-20 py-12 px-8 bg-cream">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <img src={logo} alt="The Curl Haven" className="h-12 w-auto mb-4" />
          <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
            Your safe space for curly hair knowledge, tools and community.
          </p>
        </div>

        {/* Tools */}
        <div>
          <h4 className="font-heading text-charcoal text-lg mb-4">Tools</h4>
          <div className="flex flex-col gap-2">
            <Link to="/quiz/porosity" className="font-sans text-sm text-charcoal/60 hover:text-purple transition-all">Porosity Quiz</Link>
            <Link to="/quiz/curl-type" className="font-sans text-sm text-charcoal/60 hover:text-purple transition-all">Curl Type Quiz</Link>
            <Link to="/ingredients" className="font-sans text-sm text-charcoal/60 hover:text-purple transition-all">Ingredient Checker</Link>
            {/* <Link to="/chat" className="font-sans text-sm text-charcoal/60 hover:text-purple transition-all">AI Hair Chat</Link> */}
          </div>
        </div>

        {/* Blog */}
        <div>
          <h4 className="font-heading text-charcoal text-lg mb-4">Learn</h4>
          <div className="flex flex-col gap-2">
            <a href="https://thecurlhaven.com/blog" className="font-sans text-sm text-charcoal/60 hover:text-purple transition-all">Blog</a>
            <a href="https://thecurlhaven.com/curly-girl-method" className="font-sans text-sm text-charcoal/60 hover:text-purple transition-all">Curly Girl Method</a>
            <a href="https://thecurlhaven.com/about" className="font-sans text-sm text-charcoal/60 hover:text-purple transition-all">About</a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-4xl mx-auto mt-10 pt-6 border-t border-mauve/20 flex justify-between items-center flex-wrap gap-4">
        <p className="font-sans text-xs text-charcoal/40">
          © 2025 The Curl Haven. All rights reserved.
        </p>
        <p className="font-sans text-xs text-charcoal/40">
          Made with 🌀 for curly girls everywhere
        </p>
      </div>
    </footer>
  )
}