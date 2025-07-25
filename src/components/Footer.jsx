const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">School Management System</span>
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Contact Support
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Help Center
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-right">
              © 2025 School Manager. All rights reserved.
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Built with React, Tailwind CSS, and ❤️ for educational purposes
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 