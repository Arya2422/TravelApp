
import { searchAirport } from "@/api/airport";
import { useState } from "react";


export default function SelectAirport({ label, onSelect }: any) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.length < 2) return;
    const res = await searchAirport(value);
    setResults(res.data);
  };

  return (
    <div className="mb-4">
      <label className="font-semibold">{label}</label>
      <input
        className="w-full border px-3 py-2 rounded"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by city, airport name, or code"
      />

      {results.length > 0 && (
        <div className="border bg-white shadow p-2 mt-1 rounded max-h-40 overflow-y-scroll">
          {results.map((a: any) => (
            <div
              key={a._id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onSelect(a);
                setQuery(`${a.name} (${a.code})`);
                setResults([]);
              }}
            >
              {a.city} – {a.name} ({a.code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
