import { useEffect, useState } from "react";
import { auth, loginWithGoogle, logout } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [shortDesc, setShort] = useState("");
  const [longDesc, setLong] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        setToken(await u.getIdToken());
      } else setUser(null);
    });
  }, []);

  async function createPOI(e: any) {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/pois`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        name,
        lat: Number(lat),
        lng: Number(lng),
        short_description: shortDesc,
        long_description: longDesc,
        images: []
      })
    });

    if (res.ok) alert("Created!");
    else alert(await res.text());
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Admin</h1>

      {!user ? (
        <button onClick={loginWithGoogle} className="bg-blue-500 text-white p-2 rounded">
          Sign in with Google
        </button>
      ) : (
        <div className="mb-4">
          <p>{user.email}</p>
          <button className="bg-gray-300 p-1 rounded" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      <form onSubmit={createPOI} className="space-y-2">
        <input placeholder="Name" className="border p-1 w-full" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Latitude" className="border p-1 w-full" onChange={(e) => setLat(e.target.value)} />
        <input placeholder="Longitude" className="border p-1 w-full" onChange={(e) => setLng(e.target.value)} />
        <input placeholder="Short Description" className="border p-1 w-full" onChange={(e) => setShort(e.target.value)} />
        <textarea placeholder="Long Description" className="border p-1 w-full" onChange={(e) => setLong(e.target.value)} />
        <button className="bg-green-600 text-white p-2 rounded">Save POI</button>
      </form>
    </div>
  );
}
