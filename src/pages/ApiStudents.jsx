import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';

const ApiStudents = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const limit = 10;
  
  const { data, loading, error } = useApi(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
  );

  // Filter data based on search term
  useEffect(() => {
    if (data) {
      const filtered = data.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchTerm(''); // Clear search when changing pages
  };



  const ErrorMessage = () => (
    <Card className="p-6">
      <div className="text-center py-8">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Data
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error || 'Could not load students from the API.'}
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="primary"
        >
          Try Again
        </Button>
      </div>
    </Card>
  );

  const StudentCard = ({ student }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {student.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {student.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{student.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              @{student.username}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            API User
          </span>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <span className="font-medium w-20">Phone:</span>
          <span>{student.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium w-20">Website:</span>
          <a 
            href={`https://${student.website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {student.website}
          </a>
        </div>
        <div className="flex items-start">
          <span className="font-medium w-20">Address:</span>
          <span>
            {student.address.street}, {student.address.city}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Students</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Students fetched from JSONPlaceholder API
        </p>
      </div>

      {/* Search Bar */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Students
            </label>
            <input
              type="text"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredData.length} results
            </div>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {loading && <LoadingSpinner size="lg" color="blue" text="Loading students..." />}

      {/* Error State */}
      {error && <ErrorMessage />}

      {/* Data Display */}
      {!loading && !error && (
        <>
          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {filteredData.map((student, index) => (
              <div 
                key={student.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StudentCard student={student} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of data
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  variant="secondary"
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {page}
                </span>
                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={data && data.length < limit}
                  variant="secondary"
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* No Results */}
      {!loading && !error && filteredData.length === 0 && (
        <Card className="p-6">
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Students Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or browse a different page.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ApiStudents; 