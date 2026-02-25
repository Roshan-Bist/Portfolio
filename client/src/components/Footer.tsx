import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>Built with React & Node.js by Roshan Bist</p>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <style>{`
        .footer {
          padding: 2rem 0;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .footer p {
            margin-bottom: 0.5rem;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
