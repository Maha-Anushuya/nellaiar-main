import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPOIs } from '../lib/api';
import POICard from '../components/POICard';

export default function Home() {
  const [pois, setPois] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPOIs();
        setPois(data.slice(0, 12));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">NellaiAR — Explore Tirunelveli</h1>
        <nav className="space-x-3">
          <Link to="/map" className="underline">Map</Link>
          <Link to="/ar" className="underline">AR View</Link>
          <Link to="/admin" className="underline">Admin</Link>
        </nav>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Popular spots</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pois.map(p => (
              <POICard key={p.id} poi={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
