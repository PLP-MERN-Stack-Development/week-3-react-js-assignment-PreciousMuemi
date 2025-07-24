import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Sidebar = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/students', label: 'Students' },
    { path: '/teachers', label: 'Teachers' },
    { path: '/classes', label: 'Classes' },
    { path: '/attendance', label: 'Attendance' },
  ];

  const quickStats = [
    { label: 'Total Students', value: '150+', color: 'text-blue-600' },
    { label: 'Active Teachers', value: '25+', color: 'text-green-600' },
    { label: 'Classes Running', value: '12', color: 'text-purple-600' },
    { label: 'Attendance Rate', value: '95%', color: 'text-orange-600' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              School Manager
            </h2>
            <Button
              onClick={onClose}
              variant="secondary"
              className="lg:hidden p-1"
            >
              ✕
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                    <div className={`text-lg font-semibold ${stat.color}`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Settings
              </h3>
              <Button
                onClick={toggleTheme}
                variant="secondary"
                className="w-full justify-center"
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>School Management System</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 