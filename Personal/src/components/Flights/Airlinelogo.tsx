import { Plane } from "lucide-react";
import AirIndia from "../../assets/logo/air-india.jpeg";
import Indigo from "../../assets/logo/indigo.png";
import Vistara from "../../assets/logo/vistara.jpeg";
import Akasa from "../../assets/logo/aksa.png";
import SpiceJet from "../../assets/logo/spicejet.jpeg";
import type { AirlineLogoProps } from "@/types/airline";

const airlineLogos: Record<string, string> = {
  "Air India": AirIndia,
  "IndiGo": Indigo,
  "Vistara": Vistara,
  "Akasa Air": Akasa,
  "SpiceJet": SpiceJet,
};

const AirlineLogo = ({ airline }: AirlineLogoProps) => {
  const logo = airlineLogos[airline];

  return (
    <div className="w-16 h-16 bg-white flex items-center justify-center  group-hover:scale-110 transition-transform">
      {logo ? (
        <img
          src={logo}
          alt={airline}
          className="w-12 h-12 object-contain"
        />
      ) : (
        <Plane className="w-8 h-8 text-blue-600" />
      )}
    </div>
  );
};

export default AirlineLogo;
