import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPOI } from "../lib/api";
import ModelViewer from "../components/ModelViewer";

export default function POIPage() {
  const { id } = useParams();
  const [poi, setPoi] = useState<any>(null);

  useEffect(() => {
    if (id) getPOI(id).then(setPoi);
  }, [id]);

  if (!poi) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl">{poi.name}</h1>

      {poi.ar_asset_url ? (
        <ModelViewer src={poi.ar_asset_url} />
      ) : (
        <img src={poi.images[0]} className="rounded" />
      )}

      <p className="mt-4">{poi.long_description}</p>
    </div>
  );
}
