import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import StudentProfile from "./pages/StudentProfile";
import TeacherProfile from "./pages/TeacherProfile";
import BuildCourse from "./pages/BuildCourse";
import CourseStudents from "./pages/CourseStudents";
import LearnCourse from "./pages/LearnCourse";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/verify-otp" element={<VerifyOTP />} />

      <Route path="/catalog" element={<Catalog />} />

      <Route path="/course/:id" element={<CourseDetails />} />

      {/* Student Routes */}

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute role="Student">
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/learn/:id"
        element={
          <ProtectedRoute role="Student">
            <LearnCourse />
          </ProtectedRoute>
        }
      />

      {/* Teacher Routes */}

      <Route
        path="/teacher/profile"
        element={
          <ProtectedRoute role="Teacher">
            <TeacherProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/build-course"
        element={
          <ProtectedRoute role="Teacher">
            <BuildCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/course/:id/students"
        element={
          <ProtectedRoute role="Teacher">
            <CourseStudents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
