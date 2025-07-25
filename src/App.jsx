import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
          {/* Header */}
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          
          {/* Main Content Area */}
          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Main Content */}
            <main className="flex-1 w-full min-h-0 overflow-auto bg-gray-50 dark:bg-gray-900">
              <div className="p-4 sm:p-6 lg:p-8">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/attendance" element={<Attendance />} />
                  </Routes>
                </ErrorBoundary>
              </div>
            </main>
          </div>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 