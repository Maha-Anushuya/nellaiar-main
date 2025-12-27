import { motion } from "framer-motion";
import { MapPin, Star, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { categoryColors } from "../data/mockPOIs";

const POICard = ({ poi, variant = "standard" }) => {
  const navigate = useNavigate();
  const categoryStyle =
    categoryColors[poi.category] || categoryColors.temple;

  const sizeClasses = {
    mini: "w-full max-w-[200px]",
    standard: "w-full",
    featured: "w-full",
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${sizeClasses[variant]} h-full flex flex-col glass-card group cursor-pointer relative overflow-hidden`}
      style={{
        border: `1px solid ${categoryStyle.border}20`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        padding: "1.5rem",
      }}
      // 👉 CARD CLICK → POI DETAIL
      onClick={() => navigate(`/poi/${poi.id}`)}
    >
      {/* IMAGE */}
      <div
        className="relative overflow-hidden rounded-lg mb-4"
        style={{ aspectRatio: "16/9" }}
      >
        <motion.img
          src={poi.images[0]}
          alt={poi.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* GRADIENT */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${categoryStyle.bg}40 100%)`,
          }}
        />

        {/* 🔥 AR BADGE – THIS IS THE REAL FIX */}
        <motion.div
          onClick={(e) => {
            e.stopPropagation(); // 🚨 VERY IMPORTANT
            navigate("/ar-view", {
  state: { poiId: poi.id }
});
          }}
          whileHover={{ scale: 1.15 }}
          className="absolute top-3 right-3 glass-card px-3 py-1.5 flex items-center gap-2 cursor-pointer"
          style={{
            border: `1px solid ${categoryStyle.border}`,
            boxShadow: `0 0 20px ${categoryStyle.border}80`,
            background: "rgba(10,10,26,0.85)",
          }}
        >
          <Camera size={14} style={{ color: categoryStyle.border }} />
          <span className="text-xs font-semibold text-white">
            AR
          </span>
        </motion.div>

        {/* CATEGORY */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold glass"
          style={{
            background: `${categoryStyle.bg}60`,
            border: `1px solid ${categoryStyle.border}`,
            color: categoryStyle.border,
          }}
        >
          {poi.category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col space-y-3">
        <h3 className="font-bold text-white text-lg">
          {poi.name}
        </h3>

        {variant !== "mini" && (
          <p className="text-sm text-gray-300 line-clamp-3">
            {poi.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-sm">
            <MapPin size={14} className="text-cyan-400" />
            <span className="text-gray-300">{poi.distance}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white font-semibold">
              {poi.rating}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default POICard;
