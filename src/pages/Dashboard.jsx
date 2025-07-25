import { useState } from 'react';
import Card from '../components/Card';
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

const Dashboard = () => {
  const [students] = useLocalStorage('students', []);
  const [teachers] = useLocalStorage('teachers', []);
  const [classes] = useLocalStorage('classes', []);
  const [attendance] = useLocalStorage('attendance', []);
  const [useApiData, setUseApiData] = useState(false);

  // Fetch API data
  const { data: apiStudents, loading: studentsLoading } = useApi('https://jsonplaceholder.typicode.com/users');
  const { data: apiCourses, loading: coursesLoading } = useApi('https://jsonplaceholder.typicode.com/posts');

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Total Teachers',
      value: teachers.length,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Active Classes',
      value: classes.length,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: "Today's Attendance",
      value: attendance.filter(a => {
        const today = new Date().toDateString();
        return new Date(a.date).toDateString() === today;
      }).length,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  const quickActions = [
    { title: 'Add New Student', path: '/students', color: 'bg-blue-500 hover:bg-blue-600' },
    { title: 'Add New Teacher', path: '/teachers', color: 'bg-green-500 hover:bg-green-600' },
    { title: 'Create Class', path: '/classes', color: 'bg-purple-500 hover:bg-purple-600' },
    { title: 'Take Attendance', path: '/attendance', color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your School Management System
        </p>
      </div>

      {/* Data Source Toggle */}
      <Card className="p-6">
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <span className="text-2xl">&nbsp;</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-2`}
              onClick={() => window.location.href = action.path}
            >
              <span className="font-medium">{action.title}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* API Data Grid */}
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            API Students Data
          </h2>
          {studentsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading students...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {apiStudents?.slice(0, 12).map((student) => (
                <div key={student.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {student.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{student.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{student.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <p><span className="font-medium">Phone:</span> {student.phone}</p>
                    <p><span className="font-medium">Website:</span> {student.website}</p>
                    <p><span className="font-medium">Company:</span> {student.company.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Courses Grid */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Courses
          </h2>
          {coursesLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading courses...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {apiCourses?.slice(0, 12).map((course) => (
                <div key={course.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                    {course.body}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    <p><span className="font-medium">Course ID:</span> {course.id}</p>
                    <p><span className="font-medium">Instructor ID:</span> {course.userId}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 