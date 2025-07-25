import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useApi } from '../hooks/useApi';

const ToggleSwitch = ({ checked, onChange, leftLabel, rightLabel }) => (
  <div className="flex items-center space-x-2">
    <span className="text-sm text-gray-700 dark:text-gray-300">{leftLabel}</span>
    <button
      type="button"
      className={`relative inline-flex h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
    <span className="text-sm text-gray-700 dark:text-gray-300">{rightLabel}</span>
  </div>
);

const Classes = () => {
  const [classes, setClasses] = useLocalStorage('classes', []);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [useApiData, setUseApiData] = useState(false);

  // Fetch API data
  const { data: apiPosts, loading: apiLoading, error: apiError } = useApi(
    'https://jsonplaceholder.typicode.com/posts'
  );

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    teacher: '',
    schedule: '',
    room: '',
    capacity: '',
    description: ''
  });

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art',
    'Music', 'Physical Education', 'Literature', 'Economics', 'Psychology'
  ];

  // Transform API data to match local format with proper English course names
  const transformedApiClasses = apiPosts ? apiPosts.map((post, index) => {
    const courseNames = [
      'Introduction to Computer Science',
      'Advanced Mathematics',
      'World History',
      'English Literature',
      'Physics Fundamentals',
      'Chemistry Lab',
      'Biology and Ecology',
      'Art and Design',
      'Music Theory',
      'Physical Education',
      'Economics Principles',
      'Psychology Basics',
      'Geography Studies',
      'Creative Writing',
      'Environmental Science',
      'Digital Arts',
      'Statistics and Data',
      'Modern Literature',
      'Chemistry Advanced',
      'Biology Research'
    ];

    const courseDescriptions = [
      'Learn programming fundamentals and computer science principles. This course covers basic algorithms, data structures, and software development practices.',
      'Advanced mathematical concepts including calculus, linear algebra, and mathematical analysis. Perfect for students pursuing STEM fields.',
      'Comprehensive study of world history from ancient civilizations to modern times. Explore major events, cultures, and historical developments.',
      'Study of classic and contemporary literature. Analyze themes, characters, and literary techniques across various genres and time periods.',
      'Introduction to physics concepts including mechanics, thermodynamics, and electromagnetism. Hands-on experiments and problem-solving.',
      'Laboratory-based chemistry course covering chemical reactions, molecular structures, and experimental techniques.',
      'Study of living organisms and their interactions with the environment. Topics include genetics, evolution, and ecosystem dynamics.',
      'Creative expression through various art forms and design principles. Develop artistic skills and aesthetic appreciation.',
      'Fundamentals of music theory, composition, and performance. Learn to read music and understand musical concepts.',
      'Physical fitness and sports education. Develop coordination, strength, and healthy lifestyle habits.',
      'Introduction to economic principles and market dynamics. Study supply, demand, and economic systems.',
      'Basic psychology concepts including human behavior, cognition, and mental processes. Understand the human mind.',
      'Study of Earth\'s physical features, climates, and human geography. Explore different regions and cultures.',
      'Develop writing skills through creative exercises and literary analysis. Express ideas through various writing styles.',
      'Study of environmental systems and sustainability. Learn about ecosystems, climate change, and conservation.',
      'Digital art creation using modern tools and techniques. Explore graphic design, animation, and digital media.',
      'Statistical analysis and data interpretation. Learn to collect, analyze, and present data effectively.',
      'Contemporary literature and modern storytelling techniques. Explore current trends in writing and publishing.',
      'Advanced chemistry concepts and laboratory techniques. Deep dive into chemical processes and reactions.',
      'Research methods in biology and scientific inquiry. Conduct experiments and analyze biological data.'
    ];

    return {
      id: `api-${post.id}`,
      name: courseNames[index % courseNames.length] || `Course ${post.id}`,
      subject: subjects[index % subjects.length] || 'General Studies',
      teacher: `Professor ${post.userId}`,
      schedule: `Mon/Wed/Fri ${9 + (index % 8)}:00 AM`,
      room: `Room ${100 + (index % 50)}`,
      capacity: 25 + (index % 15),
      description: courseDescriptions[index % courseDescriptions.length] || 'A comprehensive course covering essential topics and skills.',
      isApiData: true
    };
  }) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingClass) {
      const updatedClasses = classes.map(cls => 
        cls.id === editingClass.id 
          ? { ...formData, id: cls.id }
          : cls
      );
      setClasses(updatedClasses);
      setEditingClass(null);
    } else {
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
      teacher: '',
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
  const currentClasses = useApiData ? transformedApiClasses : classes;
  const isLoading = useApiData ? apiLoading : false;
  const hasError = useApiData ? apiError : null;

  const filteredClasses = currentClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || cls.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Classes</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage class schedules and information</p>
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
          <ToggleSwitch
            checked={useApiData}
            onChange={setUseApiData}
            leftLabel="Local"
            rightLabel="API"
          />
        </div>
      </Card>

      {/* Search and Filter */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Classes
            </label>
            <input
              type="text"
              placeholder="Search by name, subject, or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Subject
            </label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
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
              onClick={() => setUseApiData(false)} 
              variant="primary"
            >
              Switch to Local Data
            </Button>
          </div>
        </Card>
      )}

      {/* Add/Edit Form */}
      {showForm && !useApiData && (
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
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
              <input
                type="text"
                required
                value={formData.teacher}
                onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                placeholder="e.g., Mon/Wed/Fri 9:00 AM"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Room
              </label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
                placeholder="e.g., Room 101"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
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
                placeholder="e.g., 25"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
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
                placeholder="Enter class description..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
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
                    teacher: '',
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

      {/* Classes Grid */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Classes ({filteredClasses.length}) - {useApiData ? 'API Data' : 'Local Data'}
        </h2>
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">
                      {cls.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                      {cls.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cls.subject}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span className="font-medium">Teacher:</span>
                    <span className="text-xs">{cls.teacher}</span>
                  </div>
                  {cls.schedule && (
                    <div className="flex justify-between">
                      <span className="font-medium">Schedule:</span>
                      <span className="text-xs">{cls.schedule}</span>
                    </div>
                  )}
                  {cls.room && (
                    <div className="flex justify-between">
                      <span className="font-medium">Room:</span>
                      <span className="text-xs">{cls.room}</span>
                    </div>
                  )}
                  {cls.capacity && (
                    <div className="flex justify-between">
                      <span className="font-medium">Capacity:</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {cls.capacity}
                      </span>
                    </div>
                  )}
                  {cls.description && (
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="text-xs mt-1 line-clamp-3">{cls.description}</p>
                    </div>
                  )}
                </div>
                
                {!cls.isApiData && (
                  <div className="mt-3 flex space-x-2">
                    <Button
                      onClick={() => handleEdit(cls)}
                      variant="secondary"
                      size="sm"
                      className="text-xs px-2 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(cls.id)}
                      variant="danger"
                      size="sm"
                      className="text-xs px-2 py-1"
                    >
                      Delete
                    </Button>
                  </div>
                )}
                {cls.isApiData && (
                  <div className="mt-3">
                    <span className="text-gray-400 text-xs">Read-only</span>
                  </div>
                )}
              </div>
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