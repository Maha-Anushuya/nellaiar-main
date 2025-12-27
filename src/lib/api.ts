const API = import.meta.env.VITE_API_URL;

export async function getPOIs() {
  const r = await fetch(`${API}/pois`);
  return r.json();
}

export async function getPOI(id: string) {
  const r = await fetch(`${API}/pois/${id}`);
  return r.json();
}
