import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/students', label: 'Students' },
    { path: '/teachers', label: 'Teachers' },
    { path: '/classes', label: 'Classes' },
    { path: '/attendance', label: 'Attendance' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button
              onClick={onMenuClick}
              variant="secondary"
              className="lg:hidden mr-3 p-2"
            >
              Menu
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                School Manager
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="secondary"
              className="p-2"
            >
              {isDark ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 