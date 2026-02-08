import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Books from "./pages/Books";
import Shows from "./pages/Shows";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F6F5EE]">

        {/* Navbar */}
        <nav className="bg-white shadow p-4">
          <ul className="flex justify-center gap-8 text-stone-600 font-semibold">
            <li>
              <Link to="/" className="hover:text-[#6B7F3F] transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/recipes" className="hover:text-[#6B7F3F] transition-colors duration-300">Cooking</Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-[#6B7F3F] transition-colors duration-300">Books</Link>
            </li>
            <li>
              <Link to="/shows" className="hover:text-[#6B7F3F] transition-colors duration-300">Shows</Link>
            </li>
          </ul>
        </nav>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/books" element={<Books />} />
            <Route path="/shows" element={<Shows />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-stone-200 py-6 mt-12">
          <div className="max-w-5xl mx-auto text-center text-stone-500 text-sm">
            &copy; {new Date().getFullYear()} Let's savour all our experiences •
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
