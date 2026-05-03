import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Info, Menu, X, Sun, Moon, Book, CheckSquare, Zap } from 'lucide-react';

import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import GlossaryPage from './pages/GlossaryPage';
import ChecklistPage from './pages/ChecklistPage';
import VoterReadinessQuiz from './pages/VoterReadinessQuiz';
import ChatbotFAB from './components/ChatbotFAB';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navLinks = [
    { to: '/', icon: <Home className="h-4 w-4" aria-hidden="true" />, label: 'Home' },
    { to: '/guide', icon: <Info className="h-4 w-4" aria-hidden="true" />, label: 'Process Guide' },
    { to: '/glossary', icon: <Book className="h-4 w-4" aria-hidden="true" />, label: 'Glossary' },
    { to: '/checklist', icon: <CheckSquare className="h-4 w-4" aria-hidden="true" />, label: 'Checklist' },
    { to: '/quiz', icon: <Zap className="h-4 w-4" aria-hidden="true" />, label: 'Ready Quiz' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 dark:bg-slate-900 dark:text-slate-100">

      {/* Skip to main content link for screen readers */}
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-primary px-4 py-2 rounded z-[100] font-bold"
>
  Skip to main content
</a>

      {/* Navbar */}
      <nav aria-label="Main navigation" className="bg-primary text-surface shadow-md sticky top-0 z-50 dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <Link to="/" aria-label="Election Buddy - Go to homepage" className="flex items-center gap-2">
              <div className="bg-secondary p-2 rounded-full" aria-hidden="true">
                <Info className="h-6 w-6 text-surface" aria-hidden="true" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Election Buddy
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center" role="menubar">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  role="menuitem"
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                  className={`flex items-center gap-1 hover:text-secondary transition-colors font-medium ${location.pathname === link.to ? 'text-secondary' : ''}`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              <button
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-full hover:bg-blue-800 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-full hover:bg-blue-800"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-primary dark:bg-blue-950 border-t border-blue-800">
            <nav aria-label="Mobile navigation">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={location.pathname === link.to ? 'page' : undefined}
                    className={`flex items-center gap-2 px-3 py-3 rounded-md hover:bg-blue-800 ${location.pathname === link.to ? 'bg-blue-800 text-secondary' : ''}`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </nav>

      {/* Pages */}
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/quiz" element={<VoterReadinessQuiz />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 text-center mt-12" role="contentinfo">
        <p>Built with ♥ for voters everywhere</p>
        <p className="text-sm mt-2 opacity-70">
          © {new Date().getFullYear()} Election Buddy
        </p>
      </footer>

      {/* Chatbot */}
      <ChatbotFAB />
    </div>
  );
};

export default App;