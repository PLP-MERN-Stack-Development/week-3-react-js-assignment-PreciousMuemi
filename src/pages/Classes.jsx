import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useApi } from '../hooks/useApi';

const Classes = () => {
  const [classes, setClasses] = useLocalStorage('classes', []);
  const [teachers] = useLocalStorage('teachers', []);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataSource, setDataSource] = useState('local'); // 'local' or 'api'

  // Fetch API data
  const { data: apiPosts, loading: apiLoading, error: apiError } = useApi(
    'https://jsonplaceholder.typicode.com/posts'
  );

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    teacherId: '',
    grade: '',
    schedule: '',
    room: '',
    capacity: '',
    description: ''
  });

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art',
    'Music', 'Physical Education', 'Literature', 'Economics'
  ];

  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const timeSlots = [
    '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM'
  ];

  // Transform API data to match local format
  const transformedApiClasses = apiPosts ? apiPosts.slice(0, 20).map(post => ({
    id: `api-${post.id}`,
    name: post.title,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    teacherId: `api-teacher-${post.userId}`,
    grade: Math.floor(Math.random() * 12) + 1,
    schedule: timeSlots[Math.floor(Math.random() * timeSlots.length)],
    room: `Room ${Math.floor(Math.random() * 20) + 1}`,
    capacity: Math.floor(Math.random() * 30) + 15,
    description: post.body,
    isApiData: true
  })) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingClass) {
      // Update existing class
      const updatedClasses = classes.map(cls => 
        cls.id === editingClass.id 
          ? { ...formData, id: cls.id }
          : cls
      );
      setClasses(updatedClasses);
      setEditingClass(null);
    } else {
      // Add new class
      const newClass = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setClasses([...classes, newClass]);
    }
    
    setFormData({
      name: '',
      subject: '',
      teacherId: '',
      grade: '',
      schedule: '',
      room: '',
      capacity: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData(cls);
    setShowForm(true);
  };

  const handleDelete = (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== classId));
    }
  };

  // Get current data source
  const currentClasses = dataSource === 'api' ? transformedApiClasses : classes;
  const isLoading = dataSource === 'api' ? apiLoading : false;
  const hasError = dataSource === 'api' ? apiError : null;

  const filteredClasses = currentClasses.filter(cls => {
    return cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getTeacherName = (teacherId) => {
    if (teacherId.startsWith('api-teacher-')) {
      return `API Teacher ${teacherId.split('-')[2]}`;
    }
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Not Assigned';
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Classes</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage class schedules and assignments</p>
        </div>
        <Button onClick={() => setShowForm(true)} variant="primary">
          Create New Class
        </Button>
      </div>

      {/* Data Source Toggle */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Data Source
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose between local data and API data from JSONPlaceholder
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setDataSource('local')}
              variant={dataSource === 'local' ? 'primary' : 'secondary'}
              size="sm"
            >
              Local Data ({classes.length})
            </Button>
            <Button
              onClick={() => setDataSource('api')}
              variant={dataSource === 'api' ? 'primary' : 'secondary'}
              size="sm"
            >
              API Data ({transformedApiClasses.length})
            </Button>
          </div>
        </div>
      </Card>

      {/* Search */}
      <Card className="p-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Classes
          </label>
          <input
            type="text"
            placeholder="Search by class name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && <LoadingSpinner size="lg" color="purple" text="Loading classes..." />}

      {/* Error State */}
      {hasError && (
        <Card className="p-6 mb-6">
          <div className="text-center py-8">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading API Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {hasError}
            </p>
            <Button 
              onClick={() => setDataSource('local')} 
              variant="primary"
            >
              Switch to Local Data
            </Button>
          </div>
        </Card>
      )}

      {/* Add/Edit Form */}
      {showForm && dataSource === 'local' && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {editingClass ? 'Edit Class' : 'Create New Class'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Class Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Teacher *
              </label>
              <select
                required
                value={formData.teacherId}
                onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} - {teacher.subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade *
              </label>
              <select
                required
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Grade</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule *
              </label>
              <select
                required
                value={formData.schedule}
                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Room Number
              </label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:col-span-2 flex space-x-4">
              <Button type="submit" variant="primary">
                {editingClass ? 'Update Class' : 'Create Class'}
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingClass(null);
                  setFormData({
                    name: '',
                    subject: '',
                    teacherId: '',
                    grade: '',
                    schedule: '',
                    room: '',
                    capacity: '',
                    description: ''
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Classes List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Classes ({filteredClasses.length}) - {dataSource === 'api' ? 'API Data' : 'Local Data'}
        </h2>
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {cls.name}
                      {cls.isApiData && (
                        <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          API
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cls.subject}
                    </p>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Grade {cls.grade}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <span className="font-medium">Teacher:</span>
                    <span className="ml-2">{getTeacherName(cls.teacherId)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Schedule:</span>
                    <span className="ml-2">{cls.schedule}</span>
                  </div>
                  {cls.room && (
                    <div className="flex items-center">
                      <span className="font-medium">Room:</span>
                      <span className="ml-2">{cls.room}</span>
                    </div>
                  )}
                  {cls.capacity && (
                    <div className="flex items-center">
                      <span className="font-medium">Capacity:</span>
                      <span className="ml-2">{cls.capacity} students</span>
                    </div>
                  )}
                </div>
                
                {cls.description && (
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {cls.description}
                  </p>
                )}
                
                {!cls.isApiData && (
                  <div className="mt-4 flex space-x-2">
                    <Button
                      onClick={() => handleEdit(cls)}
                      variant="secondary"
                      className="text-xs px-2 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(cls.id)}
                      variant="danger"
                      className="text-xs px-2 py-1"
                    >
                      Delete
                    </Button>
                  </div>
                )}
                {cls.isApiData && (
                  <div className="mt-4">
                    <span className="text-gray-400 text-xs">Read-only</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              {currentClasses.length === 0 ? 'No classes found.' : 'No classes match your search criteria.'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Classes; 