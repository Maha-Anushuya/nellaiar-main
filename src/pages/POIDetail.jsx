import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Calendar, Camera, Heart, Share2, Star } from 'lucide-react';
import { getPOIById, getNearbyPOIs } from '../data/mockPOIs';
import ModelViewer from '../components/ModelViewer';
import POICard from '../components/POICard';

const POIDetail = () => {
  const { id } = useParams();
  const poi = getPOIById(parseInt(id));
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  if (!poi) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">POI Not Found</h2>
          <Link to="/map">
            <button className="btn btn-primary">Back to Map</button>
          </Link>
        </div>
      </div>
    );
  }

  const nearbyPOIs = getNearbyPOIs(poi.id);
  const tabs = ['overview', 'history', 'photos', 'nearby'];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container">
        {/* Back Button */}
        <Link to="/map">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Map</span>
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden mb-6"
            >
              <div className="relative h-96">
                <img
                  src={poi.images[currentImageIndex]}
                  alt={poi.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {poi.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSaved(!isSaved)}
                    className="glass-card p-3 rounded-full"
                  >
                    <Heart
                      size={20}
                      className={isSaved ? 'fill-red-500 text-red-500' : ''}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="glass-card p-3 rounded-full"
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Title and Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card mb-6"
            >
              <h1 className="text-3xl font-bold gradient-text mb-4">{poi.name}</h1>
              
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-gold fill-gold" />
                  <span className="font-semibold">{poi.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin size={18} className="text-teal-400" />
                  <span>{poi.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Clock size={18} className="text-purple-400" />
                  <span>{poi.openingHours}</span>
                </div>
                {poi.entryFee && (
                  <div className="flex items-center gap-2 text-white/70">
                    <DollarSign size={18} className="text-gold" />
                    <span>{poi.entryFee}</span>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-2 border-b border-white/10 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium capitalize transition-all ${
                      activeTab === tab
                        ? 'text-white border-b-2 border-purple-500'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-white/80 leading-relaxed mb-4">
                      {poi.longDescription || poi.description}
                    </p>
                    
                    {poi.activities && (
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Activities</h3>
                        <div className="flex flex-wrap gap-2">
                          {poi.activities.map((activity, index) => (
                            <span
                              key={index}
                              className="glass px-3 py-1 rounded-full text-sm"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'history' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-white/80 leading-relaxed mb-4">
                      {poi.history || 'Historical information coming soon...'}
                    </p>
                    
                    {poi.festivals && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-3 gradient-text">Festivals</h3>
                        <div className="space-y-3">
                          {poi.festivals.map((festival, index) => (
                            <div key={index} className="glass p-4 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-gold" />
                                <div>
                                  <h4 className="font-semibold">{festival.name}</h4>
                                  <p className="text-sm text-white/60">{festival.date}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'photos' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {poi.images.map((image, index) => (
                      <motion.img
                        key={index}
                        src={image}
                        alt={`${poi.name} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </motion.div>
                )}

                {activeTab === 'nearby' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {nearbyPOIs.length > 0 ? (
                      <div className="grid gap-4">
                        {nearbyPOIs.map((nearbyPOI) => (
                          <POICard key={nearbyPOI.id} poi={nearbyPOI} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/60">No nearby locations found.</p>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* 3D Model Viewer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <ModelViewer modelPath={poi.arModel} name={poi.name} />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card space-y-3"
            >
              <Link to="/ar-view">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary w-full animate-radial-pulse"
                >
                  <Camera size={18} />
                  Launch AR View
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-teal w-full"
              >
                <MapPin size={18} />
                Get Directions
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSaved(!isSaved)}
                className="btn btn-outline w-full"
              >
                <Heart size={18} className={isSaved ? 'fill-red-500' : ''} />
                {isSaved ? 'Saved to Trip' : 'Save to Trip'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POIDetail;
