import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 py-12 pb-8 glass-strong border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
                }}
              >
                <span className="text-xl">✨</span>
              </div>
              <span className="text-2xl font-bold gradient-text">NellaiAR</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience Tirunelveli's rich heritage through cutting-edge AR technology and AI-powered travel planning.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              {/* Map Pin SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Tirunelveli, Tamil Nadu</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-gray-300 hover:text-[#00AFFF] transition-colors text-sm">About Us</Link>
              <Link to="/contact" className="text-gray-300 hover:text-[#00AFFF] transition-colors text-sm">Contact</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-[#00AFFF] transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-300 hover:text-[#00AFFF] transition-colors text-sm">Terms of Service</Link>
            </nav>
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                {/* Phone SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+911234567890" className="hover:text-[#00AFFF] transition-colors">+91 123 456 7890</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                {/* Mail SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <a href="mailto:hello@nellaiar.com" className="hover:text-[#00AFFF] transition-colors">hello@nellaiar.com</a>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter & Socials */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-300">Get updates on new features and destinations</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 text-sm rounded-lg glass border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#00AFFF] transition-colors h-[42px]"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm h-[42px] text-white"
                  style={{
                    background: 'linear-gradient(135deg, #8A2BE2 0%, #00AFFF 100%)',
                    boxShadow: '0 0 20px rgba(138, 43, 226, 0.4)'
                  }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            {/* DIRECT SVG ICONS - Fixed: Removed 'glass-card' to fix padding issue */}
            <div className="pt-4">
              <p className="text-sm text-gray-300 mb-3">Follow us</p>
              <div className="flex gap-3">
                
                {/* Facebook Icon */}
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all hover:-translate-y-1 hover:bg-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter (X) Icon */}
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all hover:-translate-y-1 hover:bg-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram Icon */}
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all hover:-translate-y-1 hover:bg-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© {currentYear} NellaiAR. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-[#00AFFF] transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-[#00AFFF] transition-colors">Terms</Link>
              <Link to="/sitemap" className="hover:text-[#00AFFF] transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;