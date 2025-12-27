import { motion } from 'framer-motion';
import { useState } from 'react';
import { RotateCw, Maximize2, Camera } from 'lucide-react';

const ModelViewer = ({ modelPath, name }) => {
  const [isRotating, setIsRotating] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${isExpanded ? 'fixed inset-0 z-50 p-8' : ''}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-card overflow-hidden ${isExpanded ? 'h-full' : 'h-96'}`}
      >
        {/* 3D Model Placeholder */}
        <div className="relative w-full h-full bg-gradient-to-br from-purple-900/20 to-teal-900/20 flex items-center justify-center">
          {/* Hologram Frame Effect */}
          <div className="absolute inset-0">
            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-purple-500 glow" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-purple-500 glow" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-purple-500 glow" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-purple-500 glow" />
          </div>

          {/* Rotating Grid */}
          <motion.div
            animate={isRotating ? { rotateY: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 3D Model Placeholder - In production, use Three.js or model-viewer */}
            <div className="w-64 h-64 relative">
              {/* Wireframe Effect */}
              <div className="absolute inset-0 border-2 border-purple-400/30 rounded-lg" />
              <div className="absolute inset-4 border-2 border-teal-400/30 rounded-lg" />
              <div className="absolute inset-8 border-2 border-gold/30 rounded-lg" />
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl gradient-text"
                >
                  🏛️
                </motion.div>
              </div>

              {/* Orbiting Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10 + i,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute w-2 h-2 bg-purple-400 rounded-full glow"
                    style={{
                      top: '50%',
                      left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scan Lines */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsRotating(!isRotating)}
            className={`glass px-4 py-2 rounded-full flex items-center gap-2 text-sm ${
              isRotating ? 'glow' : ''
            }`}
          >
            <RotateCw size={16} className={isRotating ? 'animate-rotate' : ''} />
            {isRotating ? 'Pause' : 'Rotate'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm"
          >
            <Maximize2 size={16} />
            {isExpanded ? 'Minimize' : 'Fullscreen'}
          </motion.button>
        </div>

        {/* Model Info */}
        <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full">
          <span className="text-sm font-semibold">{name}</span>
        </div>

        {/* AR Activation Button */}
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary animate-radial-pulse"
          >
            <Camera size={18} />
            View in AR
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModelViewer;
