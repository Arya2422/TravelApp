import {
  Award,
  CheckCircle2,
  CreditCard,
  Headphones,
  Shield,
  TrendingDown,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

const WhyBook = () => {
  const features = [
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Best Price Guarantee",
      description:
        "We compare prices from multiple airlines to ensure you get the best deal available.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description:
        "Your payment information is encrypted and secure with industry-standard protection.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Confirmation",
      description:
        "Receive your booking confirmation and e-ticket instantly via email and SMS.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available round the clock to assist you.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Flexible Payments",
      description:
        "Multiple payment options including credit/debit cards, UPI, and net banking.",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trusted by Millions",
      description:
        "Join millions of satisfied customers who book their flights with us every year.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className=" mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Why Book With Us?
          </h2>
          <p className="text-gray-600 text-lg">
            Experience hassle-free flight booking with unmatched benefits
          </p>
        </div>

        {/* Horizontal Scroll */}
       {/* Border Wrapper */}
<div className="rounded-3xl border border-gray-300 bg-white p-4">
  {/* Horizontal Scroll */}
  <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6">
    {features.map((feature, index) => (
      <Card
        key={index}
        className="min-w-[320px] max-w-[320px] shrink-0 relative overflow-hidden border  hover:shadow-xl transition-all duration-300 hover:border-black group"
      >
        <CardContent className="p-6">
          <div
            className={`w-16 h-16 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center  mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}
          >
            {feature.icon}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {feature.title}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>

          <div className="mt-4 flex items-center text-black font-semibold text-sm">
            Learn more
            <CheckCircle2 className="w-4 h-4 ml-2" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>


      </div>
      </div>
  );
};

export default WhyBook;
