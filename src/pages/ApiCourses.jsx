import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';

const ApiCourses = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const limit = 12;
  
  const { data, loading, error } = useApi(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );

  // Filter data based on search term
  useEffect(() => {
    if (data) {
      const filtered = data.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
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
          {error || 'Could not load courses from the API.'}
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

  const CourseCard = ({ course }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Course ID: {course.id}
          </p>
        </div>
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 ml-2">
          API Course
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
        {course.body}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-500">
          User ID: {course.userId}
        </div>
        <Button variant="secondary" size="sm">
          View Details
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Courses</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Courses fetched from JSONPlaceholder API (Posts endpoint)
        </p>
      </div>

      {/* Search Bar */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Courses
            </label>
            <input
              type="text"
              placeholder="Search by course title or description..."
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
      {loading && <LoadingSpinner size="lg" color="purple" text="Loading courses..." />}

      {/* Error State */}
      {error && <ErrorMessage />}

      {/* Data Display */}
      {!loading && !error && (
        <>
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {filteredData.map((course, index) => (
              <div 
                key={course.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard course={course} />
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
              No Courses Found
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

export default ApiCourses; 