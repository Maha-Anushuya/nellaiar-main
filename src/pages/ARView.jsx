import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Camera } from "lucide-react";

export default function ARView() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get poiId from navigation state
  const poiId = location.state?.poiId || "nellaiappar";

  // ✅ DIRECT FOLDER MAPPING (NO arModels FILE)
  const modelMap = {
    nellaiappar: "/models/nellaiappar/base.glb",
    courtallam: "/models/courtallam/base_basic_pbr.glb",
    papanasam: "/models/papanasam/base_basic_pbr.glb",
    halwa: "/models/halwa/base_basic_pbr.glb",
  };

  const modelSrc = modelMap[poiId] || modelMap.nellaiappar;
console.log("AR location.state:", location.state);
console.log("AR poiId:", poiId);

  useEffect(() => {
    if (!document.querySelector("script[src*='model-viewer']")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-black"
    >
      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between bg-black/70 backdrop-blur">
        <div className="flex items-center gap-3">
          <Camera className="text-cyan-400" />
          <span className="text-white font-semibold capitalize">
            {poiId} AR View
          </span>
        </div>

        <button onClick={() => navigate(-1)}>
          <X className="text-red-400" />
        </button>
      </div>

      {/* MODEL */}
      <model-viewer
        src={modelSrc}
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: "100%", height: "100%" }}
      >
        <button
          slot="ar-button"
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "14px 26px",
            borderRadius: "30px",
            background: "linear-gradient(135deg,#8A2BE2,#00AFFF)",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          📱 Launch AR
        </button>
      </model-viewer>
    </motion.div>
  );
}
