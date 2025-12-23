interface BookingTabsProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const tabs = [
  { label: "Flight Info", icon: "✈️" },
  { label: "Passengers", icon: "👥" },
  { label: "Confirm", icon: "✓" },
  { label: "Hotels", icon: "🏨" },
  { label: "Attractions", icon: "🎡" },
  { label: "Famous Places", icon: "📍" },
  { label: "Restaurants", icon: "🍽️" },
];

const BookingTabs = ({ activeTab, setActiveTab }: BookingTabsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`
              relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap
              ${
                activeTab === index
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-100 hover:scale-102"
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingTabs;