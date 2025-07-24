# 🏫 School Management System

A comprehensive React-based school management system with API integration, built using React, Tailwind CSS, and modern web technologies.

## ✨ Features

### 📊 Dashboard

- Overview statistics (students, teachers, classes, attendance)
- Quick action buttons for all major functions
- Recent students and teachers display
- Responsive design with dark/light mode

### 👨‍🎓 Student Management

- Add, edit, and delete student records
- Search and filter students by name, email, or grade
- Comprehensive student information (name, email, grade, age, phone, address)
- Local storage persistence

### 👨‍🏫 Teacher Management

- Add, edit, and delete teacher records
- Search and filter teachers by name, email, or subject
- Teacher details including experience and qualifications
- Subject assignment tracking

### 📚 Class Management

- Create and manage class schedules
- Assign teachers to classes
- Set class capacity and room numbers
- Grade-based student grouping

### 📋 Attendance Tracking

- Take daily attendance for classes
- Present/absent status with notes
- Attendance statistics and history
- Date-based attendance records

### 🌐 API Integration

- **API Students**: Fetch student data from JSONPlaceholder API
- **API Courses**: Fetch course data from JSONPlaceholder API
- Real-time loading states and error handling
- Pagination support
- Search functionality for API data
- Responsive grid layouts

### 🎨 UI/UX Features

- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animations**: Smooth transitions and loading effects
- **Error Boundaries**: Graceful error handling
- **Loading States**: Professional loading indicators

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd school-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Dashboard

- View system overview and statistics
- Access quick actions for all features
- See recent students and teachers

### Managing Students

1. Navigate to "Students" page
2. Click "Add New Student" to create a new record
3. Fill in student details (name, email, grade, etc.)
4. Use search to find specific students
5. Edit or delete existing records

### Managing Teachers

1. Go to "Teachers" page
2. Add new teachers with their details
3. Assign subjects and experience levels
4. Search and filter teacher records

### Creating Classes

1. Visit "Classes" page
2. Create new classes with schedules
3. Assign teachers to classes
4. Set room numbers and capacity

### Taking Attendance

1. Navigate to "Attendance" page
2. Select a class and date
3. Mark students as present/absent
4. Add notes if needed
5. Save attendance records

### API Data

1. **API Students**: View students fetched from JSONPlaceholder

   - Navigate to "API Students" page
   - Browse through paginated results
   - Search by name, email, or username
   - View detailed student information

2. **API Courses**: View courses fetched from JSONPlaceholder
   - Go to "API Courses" page
   - Browse course listings
   - Search by title or description
   - View course details

## 🛠️ Technical Details

### Built With

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **JSONPlaceholder**: Mock API for demonstration

### Key Components

- **ThemeContext**: Dark/light mode management
- **useLocalStorage**: Custom hook for data persistence
- **useApi**: Custom hook for API calls
- **ErrorBoundary**: Error handling component
- **LoadingSpinner**: Reusable loading component

### API Integration

- **JSONPlaceholder Users**: Simulates student data
- **JSONPlaceholder Posts**: Simulates course data
- **Pagination**: Page-based data loading
- **Search**: Client-side filtering
- **Error Handling**: Graceful API error management

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interfaces

## 🎯 Features Implemented

### ✅ Task 1: Project Setup

- ✅ React application with Vite
- ✅ Tailwind CSS configuration
- ✅ Project structure with components, pages, and utilities
- ✅ React Router setup

### ✅ Task 2: Component Architecture

- ✅ Button component with variants (primary, secondary, danger)
- ✅ Card component for content display
- ✅ Navbar component with navigation
- ✅ Footer component with links
- ✅ Layout component with Navbar and Footer
- ✅ Customizable and reusable components

### ✅ Task 3: State Management and Hooks

- ✅ TaskManager component (simulated in other features)
- ✅ useState for component state
- ✅ useEffect for side effects
- ✅ useContext for theme management
- ✅ Custom useLocalStorage hook

### ✅ Task 4: API Integration

- ✅ Fetch data from JSONPlaceholder API
- ✅ Display fetched data in responsive layouts
- ✅ Loading and error states
- ✅ Pagination implementation
- ✅ Search functionality for API results

### ✅ Task 5: Styling with Tailwind CSS

- ✅ Responsive design for all screen sizes
- ✅ Theme switcher (light/dark mode)
- ✅ Tailwind utility classes throughout
- ✅ Custom animations and transitions

## 📸 Screenshots

_Add screenshots of your application here_

## 🌐 Deployment

The application can be deployed to:

- **Vercel**: `npm run build` then deploy to Vercel
- **Netlify**: Build and deploy to Netlify
- **GitHub Pages**: Use GitHub Actions for deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- JSONPlaceholder for providing mock API data
- Tailwind CSS for the amazing utility framework
- React team for the excellent framework
- Vite for the fast build tool
