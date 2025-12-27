import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation, Star, Search,ArrowRight, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/*
  MapPage.jsx — Upgraded
  - Smart centering (Option C) with RIGHT PANEL width = 420px (W3)
  - Live GPS distance calculation (Haversine)
  - Start Navigation → opens Google Maps directions (uses user location if allowed)
  - Responsive: desktop 3-panel, mobile full-screen details
  - Nearby POIs list inside right panel
*/

/* ---------- CONFIG ---------- */
const RIGHT_PANEL_W = 420; // W3 chosen by user (px)
const LEFT_SIDEBAR_W = 288; // matches previous approx (w-72)

/* ---------- MOCK DATA (replace with real API) ---------- */
const mockPOIs = [
  {
    id: "nellaiappar",
    name: "Nellaiappar Temple",
    category: "temple",
    description:
      "Ancient Shiva temple with stunning Dravidian architecture, musical pillars, and intricate carvings.",
    coordinates: [77.7081, 8.7169],
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f6b6d6a3ea9c4b3fd96a3b3d2d7f1b3",
    ],
    nearbyPOIs: [4],
  },
  {
    id: "courtallam",
    name: "Courtallam Waterfalls",
    category: "nature",
    description:
      "Majestic waterfalls known as the spa of South India, with crystal-clear waters cascading from the Western Ghats.",
    coordinates: [77.325, 8.9329],
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a7d8b9b2f3b9b8b7d9d0e4b1a7e6c37",
    ],
    nearbyPOIs: [3],
  },
  {
    id: "papanasam",
    name: "Papanasam Dam",
    category: "nature",
    description:
      "Scenic dam surrounded by lush forests and hills. Perfect spot for picnics and nature photography.",
    coordinates: [77.4706, 8.73],
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0d7e25f5b6c8d9f6e3b2c1a2b6d7d3a9",
    ],
    nearbyPOIs: [2],
  },
  {
    id: "halwa",
    name: "Tirunelveli Halwa Shops",
    category: "food",
    description: "Famous halwa shops known for their original sweet treats.",
    coordinates: [77.7, 8.725],
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1566826538170-6f0f7b3f4c4d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a5a8b9c6d5e4f3a2b1c0e9d8a7b6c5d",
    ],
    nearbyPOIs: [1],
  },
];

/* ---------- helper: haversine distance (km) ---------- */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapPage() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [userLoc, setUserLoc] = useState(null); // [lng, lat]
  const [distanceKm, setDistanceKm] = useState(null);

  const categories = [
    { id: "all", label: "All", icon: "🗺️" },
    { id: "temple", label: "Temples", icon: "🏛️" },
    { id: "nature", label: "Nature", icon: "💧" },
    { id: "food", label: "Food", icon: "🍜" },
  ];

  const filteredPOIs = mockPOIs.filter((p) => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchQuery =
      query.trim() === "" ||
      p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      p.description.toLowerCase().includes(query.trim().toLowerCase());
    return matchCategory && matchQuery;
  });

  /* ---------- responsive detection ---------- */
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
        setIsSidebarOpen(true);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------- init map ---------- */
  useEffect(() => {
    if (mapRef.current) return;
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [77.7081, 8.7169],
      zoom: 11,
      pitch: 0,
      antialias: true,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    mapRef.current.on("click", () => {
      setSelectedPOI(null);
    });
  }, []);

  /* ---------- fit to POIs ---------- */
  useEffect(() => {
    if (!mapRef.current || mockPOIs.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    mockPOIs.forEach((poi) => bounds.extend(poi.coordinates));
    try {
      mapRef.current.fitBounds(bounds, { padding: 120, maxZoom: 13 });
    } catch (e) {
      mapRef.current.setCenter([77.7081, 8.7169]);
      mapRef.current.setZoom(11);
    }
  }, []);

  /* ---------- markers ---------- */
  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredPOIs.forEach((poi) => {
      if (!poi.coordinates) return;

      const color = poi.category === "temple" ? "#FFD166" : poi.category === "nature" ? "#00C2FF" : "#FF6B9A";

      const root = document.createElement("div");
      root.style.width = "44px";
      root.style.height = "44px";
      root.style.borderRadius = "9999px";
      root.style.background = "rgba(5,6,12,0.75)";
      root.style.boxShadow = `0 0 18px ${color}66`;
      root.style.border = `2px solid ${color}`;
      root.style.display = "grid";
      root.style.placeItems = "center";
      root.style.cursor = "pointer";
      root.style.fontSize = "20px";
      root.textContent = poi.category === "temple" ? "🏛️" : poi.category === "nature" ? "💧" : "🍜";

      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.width = "54px";
      container.style.height = "54px";
      container.style.display = "grid";
      container.style.placeItems = "center";

      const pulse = document.createElement("div");
      pulse.style.position = "absolute";
      pulse.style.width = "54px";
      pulse.style.height = "54px";
      pulse.style.borderRadius = "9999px";
      pulse.style.zIndex = "-1";
      pulse.style.boxShadow = `0 0 18px ${color}66`;
      pulse.style.opacity = "0.35";
      pulse.style.border = `2px solid ${color}22`;
      pulse.style.animation = "pulse 2.5s infinite";

      container.appendChild(pulse);
      container.appendChild(root);

      container.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectPOI(poi);
      });

      const marker = new maplibregl.Marker({ element: container, anchor: "center" })
        .setLngLat(poi.coordinates)
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });
  }, [filteredPOIs]);

  /* ---------- get user location (once) ---------- */
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLoc([longitude, latitude]);
      },
      (err) => {
        // user denied or unavailable - that's ok
        console.warn("geolocation failed", err);
      },
      { enableHighAccuracy: true, maximumAge: 1000 * 60 * 5 }
    );
  }, []);

  /* ---------- selection + smart centering (Option C) ---------- */
  const onSelectPOI = (poi) => {
    // Mobile → open bottom drawer instead of desktop panel
if (isMobile) {
  setIsDrawerOpen(true);
  setSelectedPOI(poi);
  return;
}

// Desktop → open right panel normally
setSelectedPOI(poi);


    // calculate distance if we have user location
    if (userLoc && poi.coordinates) {
      const km = haversineKm(userLoc[1], userLoc[0], poi.coordinates[1], poi.coordinates[0]);
      setDistanceKm(km.toFixed(1));
    } else {
      setDistanceKm(null);
    }

    // Smart centering: shift map center so POI appears in the visible middle area
    requestAnimationFrame(() => {
      const map = mapRef.current;
      if (!map || !poi.coordinates) return;

      const container = map.getContainer();
      const containerRect = container.getBoundingClientRect();
      const fullW = containerRect.width;

      const leftW = isSidebarOpen ? LEFT_SIDEBAR_W : 0;
      const rightW = RIGHT_PANEL_W; // W3

      const middleWidth = fullW - leftW - rightW;
      // desired x (pixels) relative to map container: position the POI at middle of middleWidth
      const desiredX = leftW + middleWidth / 2;
      const offsetX = desiredX - fullW / 2; // positive => move center to right

      // fly with pixel offset
      try {
        map.flyTo({ center: poi.coordinates, zoom: 13.25, speed: 0.9, offset: [offsetX, 0] });
      } catch (e) {
        // fallback
        map.flyTo({ center: poi.coordinates, zoom: 13.25, speed: 0.9 });
      }
    });
  };

  /* ---------- open Google Maps navigation ---------- */
  const openNavigation = (poi) => {
    // If we have user location, use origin param; otherwise only destination
    const dest = `${poi.coordinates[1]},${poi.coordinates[0]}`; // lat,lng
    if (userLoc) {
      const origin = `${userLoc[1]},${userLoc[0]}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(dest)}&travelmode=driving`;
      window.open(url, "_blank");
    } else {
      // open directions with destination only
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}&travelmode=driving`;
      window.open(url, "_blank");
    }
  };

  /* ---------- Helpers ---------- */
  const getNearby = (poi) => {
    if (!poi?.nearbyPOIs) return [];
    return poi.nearbyPOIs.map((id) => mockPOIs.find((p) => p.id === id)).filter(Boolean);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0A0A1A] to-[#0B0620] text-white">
      <div className="h-20" />

      <div className="flex gap-6 h-[calc(100vh-5rem)] px-6">
        {/* LEFT */}
        <div className={`${isSidebarOpen ? "block" : "hidden lg:block"} w-72 z-40 relative`}>

          <div className="glass-card h-full rounded-2xl border border-white/8 p-4 shadow-2xl backdrop-blur-md flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Locations</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md hover:bg-white/5"><X size={18} /></button>
            </div>

            <div className="mb-3">
              <div className="relative">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search places, e.g. temples" className="w-full bg-[#0B0B12] border border-white/5 rounded-lg px-10 py-2 text-sm placeholder:text-white/40" />
                <div className="absolute left-3 top-2.5 text-white/60"><Search size={18} /></div>
              </div>
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto whitespace-nowrap no-scrollbar">

              {categories.map((c) => (
                <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${selectedCategory === c.id ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow" : "text-white/70 bg-white/2 hover:bg-white/5"}`}>
                  <span className="text-lg">{c.icon}</span>
                  <span className="hidden lg:hidden">{c.label}</span>   
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
              {filteredPOIs.map((p) => (
                <motion.div key={p.id} whileHover={{ scale: 1.02 }} onClick={() => onSelectPOI(p)} className="pointer-events-auto flex gap-3 p-3 rounded-xl bg-gradient-to-b from-white/2 to-transparent border border-white/5 cursor-pointer">
                  <img src={p.images?.[0]} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold truncate">{p.name}</h4>
                      <div className="text-xs px-2 py-1 rounded-md bg-[#FFD166]/10 text-[#FFD166]">{p.rating}</div>
                    </div>
                    <p className="text-xs text-white/60 mt-1">{p.distance ? p.distance : "--"}</p>
                    <p className="text-xs text-white/50 mt-2 line-clamp-2">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 text-xs text-white/50">Tip: Click a marker on the map to open details.</div>
          </div>
        </div>

        {/* CENTER MAP */}
        <div className="flex-1 rounded-2xl overflow-hidden relative">
          <div ref={mapContainerRef} className="absolute inset-0 z-0" />

          <div className="absolute inset-0 pointer-events-none" style={{backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />

          {!selectedPOI && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="text-white/30 text-sm">Explore the map — click a marker or pick a location.</div>
            </div>
          )}
        </div>

        {/* RIGHT DETAILS (W3 = 420px) */}
        {/* ------------------- MOBILE DRAWER ------------------- */}
<AnimatePresence>
  {isDrawerOpen && selectedPOI && isMobile && (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 130, damping: 22 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A1A]/95 backdrop-blur-2xl rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto shadow-2xl"
    >
      {/* Close */}
      <button
        onClick={() => setIsDrawerOpen(false)}
        className="absolute top-4 right-4 p-2 bg-white/10 rounded-full"
      >
        <X size={20} />
      </button>

      {/* Image */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
        <img src={selectedPOI.images[0]} className="w-full h-full object-cover" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-1">{selectedPOI.name}</h2>
      <div className="flex items-center gap-2 text-yellow-400 mb-3">
        <Star size={16} /> {selectedPOI.rating}
      </div>

      <p className="text-white/70 text-sm mb-4">{selectedPOI.description}</p>

      {/* CTA */}
      <Link to={`/poi/${selectedPOI.id}`}>
        <button className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md mb-3">
          View Full Details →
        </button>
      </Link>

      <div className="flex gap-3">
        <button
          onClick={() => openNavigation(selectedPOI)}
          className="flex-1 py-3 rounded-xl border border-white/10 text-white/80"
        >
          Navigate
        </button>

        <button
  onClick={() =>
    navigate("/ar-view", {
      state: { poiId: selectedPOI.id },
    })
  }
  className="flex-1 py-3 rounded-xl border border-white/10 text-white/80"
>
  AR View
</button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        
      </div>

      {/* Mobile drawer & fullscreen handled similarly as before */}

      <style>{`
        @keyframes pulse { 0% { transform: scale(0.9); opacity: 0.5; } 50% { transform: scale(1.5); opacity: 0.15; } 100% { transform: scale(0.9); opacity: 0.5; } }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 999px; }
        .glass-card { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); }
        .shadow-glow { box-shadow: 0 8px 30px rgba(124,58,237,0.14); }
        .gradient-text { background: linear-gradient(90deg,#a78bfa,#60a5fa); -webkit-background-clip:text; background-clip:text; color:transparent; }
      `}</style>
    </div>
  );
}
