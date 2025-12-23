import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  label?: string;
}

const CustomDatePicker = ({ value, onChange, minDate, label = "Select Date" }: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatDate = (date: string | number | Date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
const isDateDisabled = (date: number | Date) => {
  if (!date) return true;
  if (!minDate) return false;

  const d = new Date(date);
  const min = new Date(minDate);

  min.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  return d < min;
};


  const isToday = (date: Date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!date || !value) return false;
    const selected = new Date(value);
    return date.getDate() === selected.getDate() &&
           date.getMonth() === selected.getMonth() &&
           date.getFullYear() === selected.getFullYear();
  };

const handleDateSelect = (date: number | Date) => {
  const d = new Date(date);

  if (isDateDisabled(d)) return;

  const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  onChange(formatted);
  setIsOpen(false);
};


  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="relative">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="relative group">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
        <input
          type="text"
          value={formatDate(value)}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder="DD/MM/YYYY"
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-gray-900 font-medium cursor-pointer"
        />
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-4 w-80">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="font-bold text-gray-900 text-lg">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const disabled = isDateDisabled(date);
                const today = isToday(date);
                const selected = isSelected(date);

                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    disabled={disabled}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-all
                      ${disabled 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'hover:bg-indigo-50 cursor-pointer'
                      }
                      ${selected 
                        ? 'bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-105' 
                        : 'text-gray-700'
                      }
                      ${today && !selected 
                        ? 'border-2 border-indigo-400' 
                        : ''
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Today Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  const today = new Date();
                  setCurrentMonth(today);
                  handleDateSelect(today);
                }}
                className="w-full py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Select Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CustomDatePicker;