import { Link } from "react-router-dom";

export default function POICard({ poi }: any) {
  return (
    <Link to={`/poi/${poi.id}`}>
      <div className="border rounded p-2 shadow">
        <img src={poi.images[0]} className="rounded" />
        <h2 className="font-bold">{poi.name}</h2>
      </div>
    </Link>
  );
}
