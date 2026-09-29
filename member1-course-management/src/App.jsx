import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CourseProvider } from "./features/courses/CourseContext";
import MyCourses from "./features/courses/MyCourses";
import CourseForm from "./features/courses/CourseForm";

export default function App() {
  return (
    <CourseProvider>
      <BrowserRouter>
        <header className="nav">
          <div className="wrap bar">
            <Link to="/" className="logo">Course Studio</Link>
            <nav>
              <NavLink to="/" end>My courses</NavLink>
              <NavLink to="/courses/new">New course</NavLink>
            </nav>
          </div>
        </header>
        <main className="wrap">
          <Routes>
            <Route path="/" element={<MyCourses />} />
            <Route path="/courses/new" element={<CourseForm key="new" />} />
            <Route path="/courses/:id/edit" element={<CourseForm key="edit" />} />
            <Route path="*" element={<MyCourses />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </BrowserRouter>
    </CourseProvider>
  );
}
