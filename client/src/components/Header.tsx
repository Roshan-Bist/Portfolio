import React, { useState } from 'react';
import { Menu, X, Code } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  /* Remove isActive logic as scrolling makes it tricky without IntersectionObserver */

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
          <span>Portfolio</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(10, 25, 47, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          height: 80px;
          display: flex;
          align-items: center;
          box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
        }

        .nav-list {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: var(--text-secondary);
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.2s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }



        .menu-toggle {
          display: none;
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background: var(--bg-light);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.3s ease-in-out;
          }

          .nav.nav-open {
            right: 0;
            box-shadow: -10px 0 30px -15px rgba(2, 12, 27, 0.7);
          }

          .nav-list {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }

          .nav-link {
            font-size: 1.2rem;
            flex-direction: column;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
