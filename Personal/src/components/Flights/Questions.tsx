import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";


// Questions Component
const Questions = () => {
  const faqs = [
    {
      question: "How can I book a flight online?",
      answer: "Booking a flight is simple! Just enter your departure and destination cities, select your travel dates, choose your preferred class, and click 'Search Flights'. Browse through available options, compare prices, and click 'Book Now' on your preferred flight. Follow the payment process to complete your booking."
    },
    {
      question: "What documents do I need for domestic flights?",
      answer: "For domestic flights within India, you need a valid government-issued photo ID such as Aadhaar Card, Voter ID, Driving License, or Passport. Make sure to carry both a digital and physical copy of your ID and boarding pass."
    },
    {
      question: "Can I cancel or modify my flight booking?",
      answer: "Yes, you can cancel or modify your booking depending on the airline's policy and fare type. Log in to your account, go to 'My Bookings', select the flight you want to modify, and follow the instructions. Cancellation charges may apply based on the fare rules."
    },
    {
      question: "What is the baggage allowance for flights?",
      answer: "Baggage allowance varies by airline and class. Typically, Economy class allows 15kg check-in baggage and 7kg cabin baggage. Business and First class offer higher limits. Always check your airline's specific policy on your booking confirmation."
    },
    {
      question: "How early should I arrive at the airport?",
      answer: "For domestic flights, arrive at least 2 hours before departure. For international flights, arrive 3-4 hours early. This allows time for check-in, security screening, and reaching your gate comfortably."
    },
    {
      question: "Are meals included in flight tickets?",
      answer: "Meal inclusion depends on the airline and flight duration. Many airlines offer complimentary snacks and beverages on flights over 2 hours. Premium cabins typically include full meals. Budget airlines may charge for food and drinks."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50"> 
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-lg">Everything you need to know about booking flights</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-2 border-gray-200 rounded-xl px-6 hover:border-blue-300 transition-all">
            <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
    </div>
  );
};


export default Questions
