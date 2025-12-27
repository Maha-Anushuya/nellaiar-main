import { useEffect, useState } from "react";
import { getPOIs } from "../lib/api";
import POICard from "../components/POICard";
import { Link } from "react-router-dom";

export default function Home() {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    getPOIs().then(setPois);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">NellaiAR</h1>

      <nav className="flex gap-4 my-3">
        <Link to="/map">Map</Link>
        <Link to="/ar">AR View</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pois.map((p: any) => (
          <POICard poi={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
