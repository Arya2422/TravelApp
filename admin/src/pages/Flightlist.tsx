
// import { useEffect, useState } from "react";

// export default function FlightList() {
//   const [flights, setFlights] = useState([]);

//   useEffect(() => {
//     loadFlights();
//   }, []);

//   const loadFlights = async () => {
//     const res = await listFlights();
//     setFlights(res.data);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">All Flights</h1>

//       <table className="w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-2 border">Flight</th>
//             <th className="p-2 border">Airline</th>
//             <th className="p-2 border">From</th>
//             <th className="p-2 border">To</th>
//             <th className="p-2 border">Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {flights.map((f: any) => (
//             <tr key={f._id}>
//               <td className="border p-2">{f.flightNumber}</td>
//               <td className="border p-2">{f.airline}</td>
//               <td className="border p-2">{f.from.airport.code}</td>
//               <td className="border p-2">{f.to.airport.code}</td>
//               <td className="border p-2">{f.departureDate.slice(0, 10)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
