const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-xl">🏫</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              School Management System
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Contact Support
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Help Center
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} School Manager. All rights reserved.
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
          Built with React, Tailwind CSS, and ❤️ for educational purposes
        </div>
      </div>
    </footer>
  );
};

export default Footer; 