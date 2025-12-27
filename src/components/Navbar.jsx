import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/map' },
    { name: 'Plan Trip', path: '/trip-planner' },
    { name: 'AI Guide', path: '/chat' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong py-3' : 'glass py-4'
      }`}
      style={{
        borderBottom: isScrolled 
          ? '1px solid rgba(138, 43, 226, 0.3)' 
          : '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4)'
              }}
            >
              <Sparkles size={20} className="text-gray-900" />
            </motion.div>
            <span 
              className="text-2xl font-bold gradient-text-gold hidden sm:block"
              style={{
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
              }}
            >
              NellaiAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span className={`text-base font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'gradient-text-purple'
                    : 'text-white hover:text-white'
                }`}>
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #8A2BE2 0%, #00AFFF 100%)',
                      boxShadow: '0 0 10px rgba(138, 43, 226, 0.8)'
                    }}
                  />
                )}
                {location.pathname !== link.path && (
                  <div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #8A2BE2 0%, #00AFFF 100%)',
                      boxShadow: '0 0 10px rgba(138, 43, 226, 0.6)'
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Launch AR Button */}
          <Link to="/ar-view" className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #8A2BE2 0%, #00AFFF 100%)',
                boxShadow: '0 0 20px rgba(138, 43, 226, 0.6), 0 0 40px rgba(0, 175, 255, 0.4)',
                border: '1px solid rgba(138, 43, 226, 0.5)'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={18} className="animate-pulse" />
                Launch AR
              </span>
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-card"
            style={{
              border: '1px solid rgba(138, 43, 226, 0.3)'
            }}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass-strong rounded-lg overflow-hidden"
            style={{
              border: '1px solid rgba(138, 43, 226, 0.3)'
            }}
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'glass-card'
                        : 'hover:glass'
                    }`}
                    style={{
                      border: location.pathname === link.path 
                        ? '1px solid rgba(138, 43, 226, 0.5)' 
                        : '1px solid transparent',
                      boxShadow: location.pathname === link.path
                        ? '0 0 20px rgba(138, 43, 226, 0.3)'
                        : 'none'
                    }}
                  >
                    <span className={location.pathname === link.path ? 'gradient-text-purple font-semibold' : 'text-white'}>
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <Link to="/ar-view" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="btn btn-primary w-full"
                  style={{
                    background: 'linear-gradient(135deg, #8A2BE2 0%, #00AFFF 100%)',
                    boxShadow: '0 0 20px rgba(138, 43, 226, 0.6)',
                    border: '1px solid rgba(138, 43, 226, 0.5)'
                  }}
                >
                  <Sparkles size={18} className="animate-pulse" />
                  Launch AR
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
