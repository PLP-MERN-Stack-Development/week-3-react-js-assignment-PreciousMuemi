import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Attendance = () => {
  const [students] = useLocalStorage('students', []);
  const [classes] = useLocalStorage('classes', []);
  const [attendance, setAttendance] = useLocalStorage('attendance', []);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [viewMode, setViewMode] = useState('take'); // 'take' or 'view'

  useEffect(() => {
    if (selectedClass && selectedDate) {
      const existingAttendance = attendance.find(
        a => a.classId === selectedClass && a.date === selectedDate
      );
      
      if (existingAttendance) {
        setAttendanceRecords(existingAttendance.records);
      } else {
        // Initialize attendance records for all students in the class
        const classStudents = students.filter(student => student.grade === classes.find(c => c.id === selectedClass)?.grade);
        const initialRecords = {};
        classStudents.forEach(student => {
          initialRecords[student.id] = { present: false, note: '' };
        });
        setAttendanceRecords(initialRecords);
      }
    }
  }, [selectedClass, selectedDate, students, classes, attendance]);

  const handleAttendanceChange = (studentId, field, value) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const handleSaveAttendance = () => {
    if (!selectedClass || !selectedDate) {
      alert('Please select a class and date');
      return;
    }

    const newAttendanceRecord = {
      id: Date.now().toString(),
      classId: selectedClass,
      date: selectedDate,
      records: attendanceRecords,
      createdAt: new Date().toISOString()
    };

    // Remove existing attendance for this class and date if it exists
    const filteredAttendance = attendance.filter(
      a => !(a.classId === selectedClass && a.date === selectedDate)
    );

    setAttendance([...filteredAttendance, newAttendanceRecord]);
    alert('Attendance saved successfully!');
  };

  const getAttendanceStats = () => {
    const records = Object.values(attendanceRecords);
    const total = records.length;
    const present = records.filter(r => r.present).length;
    const absent = total - present;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, percentage };
  };

  const getClassStudents = () => {
    if (!selectedClass) return [];
    const selectedClassData = classes.find(c => c.id === selectedClass);
    if (!selectedClassData) return [];
    return students.filter(student => student.grade === selectedClassData.grade);
  };

  const stats = getAttendanceStats();
  const classStudents = getClassStudents();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400">Take and view student attendance</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setViewMode('take')} 
            variant={viewMode === 'take' ? 'primary' : 'secondary'}
          >
            Take Attendance
          </Button>
          <Button 
            onClick={() => setViewMode('view')} 
            variant={viewMode === 'view' ? 'primary' : 'secondary'}
          >
            View Records
          </Button>
        </div>
      </div>

      {/* Class and Date Selection */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Choose a class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - Grade {cls.grade}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleSaveAttendance}
              variant="primary"
              disabled={!selectedClass || !selectedDate}
              className="w-full"
            >
              Save Attendance
            </Button>
          </div>
        </div>
      </Card>

      {/* Attendance Statistics */}
      {selectedClass && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Attendance Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Present</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Absent</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.percentage}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</div>
            </div>
          </div>
        </Card>
      )}

      {/* Attendance List */}
      {selectedClass && classStudents.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Student Attendance
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {classStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {student.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={attendanceRecords[student.id]?.present ? 'present' : 'absent'}
                        onChange={(e) => handleAttendanceChange(student.id, 'present', e.target.value === 'present')}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        placeholder="Add note..."
                        value={attendanceRecords[student.id]?.note || ''}
                        onChange={(e) => handleAttendanceChange(student.id, 'note', e.target.value)}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* View Attendance Records */}
      {viewMode === 'view' && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Attendance History
          </h2>
          {attendance.length > 0 ? (
            <div className="space-y-4">
              {attendance.slice(0, 10).map((record) => {
                const classData = classes.find(c => c.id === record.classId);
                const recordStats = Object.values(record.records);
                const total = recordStats.length;
                const present = recordStats.filter(r => r.present).length;
                const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

                return (
                  <div key={record.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {classData?.name || 'Unknown Class'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {present}/{total} ({percentage}%)
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          students present
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No attendance records found.
            </p>
          )}
        </Card>
      )}
    </div>
  );
};

export default Attendance; 