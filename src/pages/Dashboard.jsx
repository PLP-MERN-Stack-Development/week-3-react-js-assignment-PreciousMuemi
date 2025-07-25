import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useApi } from '../hooks/useApi';

const Dashboard = () => {
  const [students] = useLocalStorage('students', []);
  const [teachers] = useLocalStorage('teachers', []);
  const [classes] = useLocalStorage('classes', []);
  const [attendance] = useLocalStorage('attendance', []);

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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your School Management System
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      <div className="mt-8">
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
      </div>

      {/* Courses Grid */}
      <div className="mt-6">
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