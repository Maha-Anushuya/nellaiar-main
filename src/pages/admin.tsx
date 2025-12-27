import React, { useEffect, useState } from "react";
import { auth, loginWithGoogle, logout } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // form fields
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const t = await u.getIdToken();
        setToken(t);
      }
    });
    return () => unsub();
  }, []);

  async function handleLogin() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  async function handleLogout() {
    await logout();
    setUser(null);
    setToken(null);
  }

  async function createPOI(e: any) {
    e.preventDefault();
    if (!token) return alert("Login required");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/pois`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name,
        lat: Number(lat),
        lng: Number(lng),
        short_description: shortDesc,
        long_description: longDesc,
        images: [],
      }),
    });

    if (res.ok) {
      alert("POI created!");
      setName("");
      setLat("");
      setLng("");
      setShortDesc("");
      setLongDesc("");
    } else {
      const t = await res.text();
      alert("Error: " + t);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel — Add POIs</h2>

      {/* LOGIN BLOCK */}
      <div className="mb-6">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL}
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
            <div>
              <p className="font-semibold">{user.displayName}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-gray-200 rounded ml-auto"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Sign in with Google
          </button>
        )}
      </div>

      {/* FORM */}
      <form onSubmit={createPOI} className="space-y-3">
        <input
          className="w-full border p-2"
          placeholder="POI Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>

        <input
          className="w-full border p-2"
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />

        <textarea
          className="w-full border p-2"
          placeholder="Long Description"
          rows={4}
          value={longDesc}
          onChange={(e) => setLongDesc(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded w-full"
        >
          Create POI
        </button>
      </form>
    </div>
  );
}
