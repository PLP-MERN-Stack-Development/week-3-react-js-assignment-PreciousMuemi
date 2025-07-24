import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Dashboard = () => {
  const [students] = useLocalStorage('students', []);
  const [teachers] = useLocalStorage('teachers', []);
  const [classes] = useLocalStorage('classes', []);
  const [attendance] = useLocalStorage('attendance', []);

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
      title: 'Today\'s Attendance',
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
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
                <span className="text-2xl">{stat.icon}</span>
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

      {/* Recent Activity */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Students
          </h2>
          {students.slice(0, 5).length > 0 ? (
            <div className="space-y-3">
              {students.slice(0, 5).map((student, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Grade {student.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No students added yet.</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Teachers
          </h2>
          {teachers.slice(0, 5).length > 0 ? (
            <div className="space-y-3">
              {teachers.slice(0, 5).map((teacher, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {teacher.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{teacher.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No teachers added yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 