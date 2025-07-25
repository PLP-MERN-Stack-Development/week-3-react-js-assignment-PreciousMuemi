# School Management System

A comprehensive React-based school management system with API integration, built using React, Tailwind CSS, and modern web technologies.

##  Features

###  Dashboard

- Overview statistics (students, teachers, classes, attendance)
- Quick action buttons for all major functions
- Recent students and teachers display
- Responsive design with dark/light mode
- **Data Source Toggle**: Switch between local and API data

###  Student Management

- Add, edit, and delete student records
- Search and filter students by name, email, or grade
- Comprehensive student information (name, email, grade, age, phone, address)
- Local storage persistence
- **API Integration**: Fetch and display students from JSONPlaceholder
- **Toggle Switch**: Modern sliding switch for data source selection

###  Teacher Management

- Add, edit, and delete teacher records
- Search and filter teachers by name, email, or subject
- Teacher details including experience and qualifications
- Subject assignment tracking

###  Class Management

- Create and manage class schedules
- Assign teachers to classes
- Set class capacity and room numbers
- Grade-based student grouping
- **English Course Names**: Proper course titles instead of Lorem ipsum
- **API Integration**: Fetch courses with realistic descriptions

### Attendance Tracking

- Take daily attendance for classes
- Present/absent status with notes
- Attendance statistics and history
- Date-based attendance records
###  API Integration

- **API Students**: Fetch student data from JSONPlaceholder API
- **API Courses**: Fetch course data from JSONPlaceholder API
- Real-time loading states and error handling
- Pagination support
- Search functionality for API data
- Responsive grid layouts
- **Toggle Switches**: Modern UI for switching between local and API data

###  UI/UX Features

- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animations**: Smooth transitions and loading effects
- **Error Boundaries**: Graceful error handling
- **Loading States**: Professional loading indicators
- **Enhanced Sidebar**: Collapsible sidebar with icons and active states
- **Sticky Header**: Navigation that stays at the top
- **Mobile-First**: Optimized for all screen sizes

## Getting Started

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
- **Toggle between local and API data** using the modern switch

### Managing Students

1. Navigate to "Students" page
2. **Use the toggle switch** to choose between local and API data
3. Click "Add New Student" to create a new record (local data only)
4. Fill in student details (name, email, grade, etc.)
5. Use search to find specific students
6. Edit or delete existing records (local data only)

### Managing Teachers

1. Go to "Teachers" page
2. Add new teachers with their details
3. Assign subjects and experience levels
4. Search and filter teacher records

### Creating Classes

1. Visit "Classes" page
2. **Toggle between local and API data** to see different course information
3. Create new classes with schedules (local data only)
4. Assign teachers to classes
5. Set room numbers and capacity
6. **View realistic course names** like "Introduction to Computer Science" instead of Lorem ipsum

### Taking Attendance

1. Navigate to "Attendance" page
2. Select a class and date
3. Mark students as present/absent
4. Add notes if needed
5. Save attendance records

### API Data Features

- **Modern Toggle Switches**: Sliding switches instead of buttons
- **Realistic Data**: English course names and descriptions
- **Responsive Grids**: Beautiful card layouts
- **Loading States**: Professional spinners and progress indicators
- **Error Handling**: Graceful error messages with retry options

## Technical Details

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
- **ToggleSwitch**: Modern sliding switch component
- **Enhanced Sidebar**: Collapsible navigation with icons

### API Integration

- **JSONPlaceholder Users**: Simulates student data
- **JSONPlaceholder Posts**: Simulates course data with English names
- **Pagination**: Page-based data loading
- **Search**: Client-side filtering
- **Error Handling**: Graceful API error management
- **Data Transformation**: Convert API data to realistic school information

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interfaces
- **Enhanced Mobile Navigation**: Hamburger menu with smooth animations

##  Features Implemented

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
- ✅ **Enhanced Sidebar** with icons and active states
- ✅ **ToggleSwitch** component for modern UI

### ✅ Task 3: State Management and Hooks

- ✅ TaskManager component (simulated in other features)
- ✅ useState for component state
- ✅ useEffect for side effects
- ✅ useContext for theme management
- ✅ Custom useLocalStorage hook
- ✅ Custom useApi hook for API calls

### ✅ Task 4: API Integration

- ✅ Fetch data from JSONPlaceholder API
- ✅ Display fetched data in responsive layouts
- ✅ Loading and error states
- ✅ Pagination implementation
- ✅ Search functionality for API results
- ✅ **Data transformation** for realistic school data
- ✅ **Toggle switches** for data source selection

### ✅ Task 5: Styling with Tailwind CSS

- ✅ Responsive design for all screen sizes
- ✅ Theme switcher (light/dark mode)
- ✅ Tailwind utility classes throughout
- ✅ Custom animations and transitions
- ✅ **Enhanced mobile responsiveness**
- ✅ **Modern UI components** with smooth animations

##  Screenshots

### Dashboard View

![Dashboard Screenshot](<./public/Screenshot%20(163).png>)

### Students Page with Toggle Switch

![Students Page Screenshot](<./public/Screenshot%20(164).png>)

## 🌐Deployment

### Live Demo

**Deployed Project URL:** [Add your deployed project URL here]

### Deployment Options

The application can be deployed to:

- **Vercel**:
  ```bash
  npm run build
  # Then deploy to Vercel
  ```
- **Netlify**: Build and deploy to Netlify
- **GitHub Pages**: Use GitHub Actions for deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

