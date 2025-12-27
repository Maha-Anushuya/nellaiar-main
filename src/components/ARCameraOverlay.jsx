import { motion } from 'framer-motion';
import { Navigation, MapPin, X, Info } from 'lucide-react';
import { useState } from 'react';
import { arBadgeFloat, arDirectionalPulse } from '../utils/animations';

const ARCameraOverlay = ({ pois = [], onClose }) => {
  const [selectedPOI, setSelectedPOI] = useState(null);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Simulated Camera Feed */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 glass-card rounded-none flex items-center justify-between p-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold">AR Mode Active</span>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 glass rounded-full flex items-center justify-center"
          >
            <Navigation size={18} className="text-teal-400" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 glass rounded-full flex items-center justify-center"
          >
            <X size={18} />
          </motion.button>
        </div>
      </div>

      {/* Floating POI Badges */}
      <div className="absolute inset-0 flex items-center justify-center">
        {pois.slice(0, 3).map((poi, index) => {
          const positions = [
            { top: '30%', left: '20%' },
            { top: '45%', left: '60%' },
            { top: '60%', left: '35%' },
          ];
          
          return (
            <motion.div
              key={poi.id}
              {...arBadgeFloat}
              style={{
                position: 'absolute',
                ...positions[index],
              }}
              onClick={() => setSelectedPOI(poi)}
              className="cursor-pointer"
            >
              {/* Directional Arrow */}
              <motion.div
                {...arDirectionalPulse}
                className="absolute -top-12 left-1/2 -translate-x-1/2"
              >
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-purple-500"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.8))' }}
                />
              </motion.div>

              {/* POI Badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="glass-card p-4 min-w-[200px] glow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={poi.images[0]}
                      alt={poi.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{poi.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <MapPin size={12} className="text-teal-400" />
                      <span>{poi.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Distance Indicator */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-white/60">Tap for details</span>
                  <Info size={14} className="text-purple-400" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Info Card */}
      {selectedPOI && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="absolute bottom-0 left-0 right-0 glass-card rounded-t-3xl p-6 max-h-[60vh] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold gradient-text">{selectedPOI.name}</h3>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPOI(null)}
              className="w-8 h-8 glass rounded-full flex items-center justify-center"
            >
              <X size={16} />
            </motion.button>
          </div>

          <div className="mb-4">
            <img
              src={selectedPOI.images[0]}
              alt={selectedPOI.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <p className="text-white/80 mb-4">{selectedPOI.description}</p>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary flex-1"
            >
              Navigate
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline flex-1"
            >
              View Details
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Scan Line Effect */}
      <motion.div
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"
        style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.8)' }}
      />
    </div>
  );
};

export default ARCameraOverlay;
