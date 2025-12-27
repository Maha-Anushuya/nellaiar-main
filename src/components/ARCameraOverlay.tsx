import { useEffect, useRef, useState } from "react";

export default function ARCameraOverlay({ pois, onSelect }: any) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
  }, []);

  return (
    <div className="relative w-full h-full">
      <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0">
        {pois.map((p: any) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="absolute bg-white rounded px-2 py-1"
            style={{ top: "50%", left: "50%" }}>
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
