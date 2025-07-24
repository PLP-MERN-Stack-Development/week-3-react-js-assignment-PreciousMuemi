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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 lg:ml-64">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/attendance" element={<Attendance />} />
                </Routes>
              </ErrorBoundary>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 