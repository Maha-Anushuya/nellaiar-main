import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { getPOIs } from "../lib/api";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export default function MapPage() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.6845, 8.7274],
      zoom: 10
    });

    getPOIs().then((all) => {
      all.forEach((p: any) => {
        new mapboxgl.Marker()
          .setLngLat([p.lng, p.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<b>${p.name}</b>`))
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={ref} className="w-full h-screen"></div>;
}
