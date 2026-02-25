import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Components
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Admin Components
import Login from './pages/admin/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import EditProfile from './pages/admin/EditProfile';
import ProjectManager from './pages/admin/ProjectManager';

const Portfolio = () => (
  <div className="app-container">
    <Header />
    <main>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <Experience />
      <Education />
      <Skills />
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
    <ScrollToTop />
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} /> {/* Default to Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="projects" element={<ProjectManager />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
