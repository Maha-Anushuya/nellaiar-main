import { motion } from 'framer-motion';
import { Search, MapPin, Camera, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import POICard from '../components/POICard';
import { mockPOIs } from '../data/mockPOIs';
import { staggerContainer, staggerItem, floatAnimation } from '../utils/animations';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === 1. DATA FIXER (Important!) ===
  // This converts your data format (name/images) to UI format (title/image)
  const allPOIs = mockPOIs.map(poi => ({
    ...poi,
    // If 'title' is missing, use 'name'
    title: poi.title || poi.name,
    // If 'image' (singular) is missing, take the first one from 'images' array
    image: poi.image || (poi.images && poi.images.length > 0 ? poi.images[0] : null),
    // Ensure ID is present
    id: poi.id
  }));






  

  // 2. Logic to filter cards based on what you type
  const filteredPOIs = allPOIs.filter((poi) => {
    const term = searchQuery.toLowerCase();
    return (
      (poi.name && poi.name.toLowerCase().includes(term)) || // Checks Name
      (poi.title && poi.title.toLowerCase().includes(term)) || // Checks Title
      (poi.description && poi.description.toLowerCase().includes(term)) || // Checks Desc
      (poi.category && poi.category.toLowerCase().includes(term)) // Checks Category
    );
  });

  // 3. If searching -> Show Filtered. If NOT searching -> Show Top 3.
  const displayPOIs = searchQuery ? filteredPOIs : mockPOIs.slice(0, 3);






  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Depth */}
        <div className="absolute inset-0">
          <motion.div
            style={{
              y: scrollY * 0.5,
              background: 'linear-gradient(180deg, #0A0A1A 0%, #1a0a2e 50%, #16213e 100%)'
            }}
            className="absolute inset-0"
          />
          
          {/* Holographic Mist Particles - 50+ */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut'
              }}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 3 === 0 
                  ? 'linear-gradient(135deg, #8A2BE2 0%, #00AFFF 100%)'
                  : i % 3 === 1
                  ? '#00FFF5'
                  : '#FF00FF',
                boxShadow: i % 3 === 0
                  ? '0 0 10px rgba(138, 43, 226, 0.8)'
                  : i % 3 === 1
                  ? '0 0 10px rgba(0, 255, 245, 0.8)'
                  : '0 0 10px rgba(255, 0, 255, 0.8)',
              }}
            />
          ))}

          {/* Larger Glowing Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              animate={{
                y: [0, -60, 0],
                x: [0, 40, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute rounded-full blur-xl"
              style={{
                left: `${20 + i * 20}%`,
                top: `${20 + i * 15}%`,
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                background: i % 2 === 0
                  ? 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(0, 175, 255, 0.3) 0%, transparent 70%)',
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full mb-8"
              style={{
                border: '1px solid rgba(138, 43, 226, 0.4)',
                boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)'
              }}
            >
              <Sparkles size={18} className="text-gold animate-pulse" style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }} />
              <span className="text-sm font-semibold gradient-text-gold">AI + AR Powered Tourism</span>
            </motion.div>

            {/* Main Heading - Reduced glow for sharpness */}
            <h1 className="mb-6 text-center">
              <span className="block gradient-text-gold" style={{ textShadow: '0 0 15px rgba(255, 215, 0, 0.2)' }}>
                Discover Tirunelveli
              </span>
              <span className="block" style={{
                background: 'linear-gradient(135deg, #8A2BE2 0%, #00AFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 20px rgba(138, 43, 226, 0.25)'
              }}>
                Through AR Magic
              </span>
            </h1>

            {/* Description - Better spacing */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed text-center"
            >
              Experience ancient temples, majestic waterfalls, and rich culture with 
              immersive augmented reality and AI-powered trip planning.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <Search 
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-neon-aqua" 
                  size={22}
                  style={{ filter: 'drop-shadow(0 0 6px #00AFFF)' }}
                />
                <input
                  type="text"
                  placeholder="Search temples, waterfalls, food spots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-14 pr-6 py-5 text-lg w-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(138, 43, 226, 0.3)',
                    boxShadow: '0 0 30px rgba(138, 43, 226, 0.2), inset 0 0 20px rgba(0, 175, 255, 0.05)',
                    backdropFilter: 'blur(20px)'
                  }}
                />
              </div>
            </motion.div>

            {/* CTA Buttons - Fixed spacing and reduced glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 justify-center items-center"
            >
              <Link to="/ar-view">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn text-base md:text-lg px-6 md:px-8 py-3 md:py-4 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #8A2BE2 0%, #00AFFF 100%)',
                    boxShadow: '0 0 12px rgba(138, 43, 226, 0.5), 0 0 24px rgba(0, 175, 255, 0.3)',
                    border: '1px solid rgba(138, 43, 226, 0.5)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Camera size={20} />
                    <span className="whitespace-nowrap">Start AR Experience</span>
                  </span>
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.button>
              </Link>

              <Link to="/map">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                  style={{
                    border: '2px solid rgba(0, 175, 255, 0.6)',
                    boxShadow: 'inset 0 0 12px rgba(0, 175, 255, 0.1), 0 0 12px rgba(0, 175, 255, 0.3)'
                  }}
                >
                  <MapPin size={20} />
                  <span className="whitespace-nowrap">Explore Map</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating POI Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {['🏛️', '💧', '🍜', '🌄'].map((emoji, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                className="absolute text-6xl opacity-20"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 30}%`,
                  filter: 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.5))',
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div 
            className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
            style={{
              borderColor: 'rgba(138, 43, 226, 0.5)',
              boxShadow: '0 0 10px rgba(138, 43, 226, 0.3)'
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #8A2BE2 0%, #00AFFF 100%)',
                boxShadow: '0 0 6px rgba(138, 43, 226, 0.8)'
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured POIs Section - Increased spacing */}
      <section className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            

            <h2 className="gradient-text mb-6 text-white" style={{ textShadow: '0 0 15px rgba(138, 43, 226, 0.2)' }}>
  {/* If searching, show dynamic title. Else, show default. */}
  {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Destinations'}
</h2>




<p className="text-gray-300 text-lg max-w-2xl mx-auto">
  {searchQuery 
    ? `${displayPOIs.length} locations found` 
    : 'Explore the most visited and loved places in Tirunelveli'}
</p>

          </motion.div>

          {/* Equal Height Grid for Cards */}
          <motion.div 
  variants={staggerContainer}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
>
  {/* Logic: Check if we have results */}
  {displayPOIs.length > 0 ? (
    displayPOIs.map((poi) => (
      <motion.div key={poi.id} variants={staggerItem}>
        <POICard poi={poi} />
      </motion.div>
    ))
  ) : (
    // Fallback if search returns nothing
    <div className="col-span-full text-center py-10 text-gray-500 text-lg">
      No destinations found matching "{searchQuery}"
    </div>
  )}
</motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/map">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-teal"
              >
                View All Destinations
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Fixed: 3 Cards Per Row + Smaller Size */}
      <section className="py-20 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="gradient-text mb-4 text-3xl font-bold">Why Choose NellaiAR?</h2>
            <p className="text-gray-300 text-base max-w-2xl mx-auto">
              Experience tourism like never before with cutting-edge technology
            </p>
          </motion.div>

          {/* GRID FIX: 1 column on Mobile, 3 columns on Laptop */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '🎯',
                title: 'AR Navigation',
                description: 'Point your camera and see POIs in real-time with directional guidance',
              },
              {
                icon: '🤖',
                title: 'AI Trip Planner',
                description: 'Get personalized itineraries based on your preferences and time',
              },
              {
                icon: '🗺️',
                title: 'Interactive Maps',
                description: 'Explore Tirunelveli with beautiful, detailed interactive maps',
              },
              {
                icon: '📸',
                title: '3D Models',
                description: 'View monuments and landmarks in stunning 3D before you visit',
              },
              {
                icon: '💬',
                title: 'AI Guide',
                description: 'Chat with our AI assistant for instant answers and recommendations',
              },
              {
                icon: '⭐',
                title: 'Local Insights',
                description: 'Discover hidden gems and authentic experiences from locals',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="glass-card text-center p-6 flex flex-col items-center" 
              >
                {/* p-6 makes it 'Kutty' (smaller) compared to p-12 */}
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card text-center p-12 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-teal-500/10 to-gold/10" />
            
            <div className="relative z-10">
              <h2 className="gradient-text mb-4">Ready to Explore?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Start your journey through Tirunelveli's rich heritage and natural beauty
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/trip-planner">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-gold text-lg px-8 py-4"
                  >
                    <Sparkles size={20} />
                    Plan My Trip
                  </motion.button>
                </Link>

                <Link to="/chat">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline text-lg px-8 py-4"
                  >
                    Talk to AI Guide
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
