import type { SidebarProps } from "@/types/sidebar";
import { motion, AnimatePresence } from "framer-motion";


const Sidebar = ({ 
  isOpen, 
  activeTab, 
  onTabChange, 
  userName, 
  userEmail,
  bookingsCount 
}: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed lg:sticky top-0 left-0 h-screen w-72 bg-white shadow-lg border-r border-gray-200 z-40 overflow-y-auto"
        >
          <div className="p-6">
            {/* User Profile */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center rounded-full font-bold text-2xl shadow-lg">
                {userName[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{userName}</h3>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => onTabChange("personal")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "personal"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Details
              </button>

              <button
                onClick={() => onTabChange("bookings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "bookings"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Bookings
                {bookingsCount > 0 && (
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {bookingsCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;