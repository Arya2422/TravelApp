import indigo from "../../assets/logo/indigo.png";
import airindia from '../../assets/logo/air-india.jpeg';
import spicejet from '../../assets/logo/spicejet.jpeg';
import vistara from '../../assets/logo/vistara.jpeg';
import aksa from '../../assets/logo/aksa.png';
import airindiaexpress from '../../assets/logo/air-india-express.png';
import type { Airline } from "@/types/airline";



const AirlineName = () => {
 
const airlines: Airline[] = [
    { name: "IndiGo", logoImg: indigo },
    { name: "Air India", logoImg: airindia,  },
    { name: "SpiceJet", logoImg: spicejet},
    { name: "Vistara", logoImg: vistara  },
    {name:"Aksa",logoImg:aksa},
    {name:"Air India Express",logoImg:airindiaexpress},

  ];

  return (
 <div className="bg-linear-to-r from-blue-50 to-indigo-50 py-8 ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Popular Airlines
        </h2>

  <div className="flex justify-between items-center gap-10 px-10 py-6 rounded-3xl border border-gray-200 bg-white overflow-x-auto scrollbar-hide">
  {airlines.map((airline, index) => (
    <div
      key={index}
      className="flex flex-col items-center min-w-[120px] cursor-pointer group"
    >
      {/* Logo */}
      <div className="h-12 flex items-center justify-center">
        <img
          src={airline.logoImg}
          alt={airline.name}
          className="h-10 object-contain"
        />
      </div>

      {/* Name */}
      <span className="mt-3 text-sm font-semibold text-black group-hover:underline text-center">
        {airline.name}
      </span>
    </div>
  ))}
</div>


      </div>
    </div>
  );
};

export default AirlineName;
