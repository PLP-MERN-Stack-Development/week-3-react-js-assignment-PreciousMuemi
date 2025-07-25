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
      className={`relative inline-flex h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
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

const Students = () => {
  const [students, setStudents] = useLocalStorage('students', []);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [useApiData, setUseApiData] = useState(false); // toggle for data source

  // Fetch API data
  const { data: apiStudents, loading: apiLoading, error: apiError } = useApi(
    'https://jsonplaceholder.typicode.com/users'
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '',
    age: '',
    phone: '',
    address: ''
  });

  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Transform API data to match local format
  const transformedApiStudents = apiStudents ? apiStudents.map(user => ({
    id: `api-${user.id}`,
    name: user.name,
    email: user.email,
    grade: Math.floor(Math.random() * 12) + 1, // Random grade for demo
    age: Math.floor(Math.random() * 10) + 15, // Random age for demo
    phone: user.phone,
    address: `${user.address.street}, ${user.address.city}`,
    isApiData: true
  })) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingStudent) {
      // Update existing student
      const updatedStudents = students.map(student => 
        student.id === editingStudent.id 
          ? { ...formData, id: student.id }
          : student
      );
      setStudents(updatedStudents);
      setEditingStudent(null);
    } else {
      // Add new student
      const newStudent = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setStudents([...students, newStudent]);
    }
    
    setFormData({
      name: '',
      email: '',
      grade: '',
      age: '',
      phone: '',
      address: ''
    });
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowForm(true);
  };

  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  // Get current data source
  const currentStudents = useApiData ? transformedApiStudents : students;
  const isLoading = useApiData ? apiLoading : false;
  const hasError = useApiData ? apiError : null;

  const filteredStudents = currentStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || student.grade.toString() === filterGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage student records</p>
        </div>
        <Button onClick={() => setShowForm(true)} variant="primary">
          Add New Student
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
              Search Students
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Grade
            </label>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && <LoadingSpinner size="lg" color="blue" text="Loading students..." />}

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
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
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
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
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
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:col-span-2 flex space-x-4">
              <Button type="submit" variant="primary">
                {editingStudent ? 'Update Student' : 'Add Student'}
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingStudent(null);
                  setFormData({
                    name: '',
                    email: '',
                    grade: '',
                    age: '',
                    phone: '',
                    address: ''
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Students Grid */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Students ({filteredStudents.length}) - {useApiData ? 'API Data' : 'Local Data'}
        </h2>
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {student.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{student.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span className="font-medium">Grade:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {student.grade}
                    </span>
                  </div>
                  {student.age && (
                    <div className="flex justify-between">
                      <span className="font-medium">Age:</span>
                      <span>{student.age}</span>
                    </div>
                  )}
                  {student.phone && (
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span className="text-xs">{student.phone}</span>
                    </div>
                  )}
                  {student.address && (
                    <div>
                      <span className="font-medium">Address:</span>
                      <p className="text-xs mt-1">{student.address}</p>
                    </div>
                  )}
                </div>
                
                {!student.isApiData && (
                  <div className="mt-3 flex space-x-2">
                    <Button
                      onClick={() => handleEdit(student)}
                      variant="secondary"
                      size="sm"
                      className="text-xs px-2 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(student.id)}
                      variant="danger"
                      size="sm"
                      className="text-xs px-2 py-1"
                    >
                      Delete
                    </Button>
                  </div>
                )}
                {student.isApiData && (
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
              {currentStudents.length === 0 ? 'No students found.' : 'No students match your search criteria.'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Students; 