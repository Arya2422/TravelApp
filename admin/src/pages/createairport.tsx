import { useState } from "react";
import { createAirport } from "@/api/airport";

export default function CreateAirport() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createAirport(form);
      setMessage("Airport created successfully!");
      setForm({ name: "", city: "", code: "", country: "" });
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Airport</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "city", "code", "country"].map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key.toUpperCase()}
            className="border p-2 w-full rounded"
            value={(form as any)[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            required
          />
        ))}

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Create Airport
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
