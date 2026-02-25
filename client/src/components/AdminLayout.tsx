import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, Briefcase } from 'lucide-react';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">Admin Panel</div>
                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className="admin-nav-link">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/profile" className="admin-nav-link">
                        <User size={20} /> Edit Profile
                    </Link>
                    <Link to="/admin/projects" className="admin-nav-link">
                        <Briefcase size={20} /> Projects
                    </Link>
                </nav>
                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={20} /> Logout
                </button>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
            <style>{`
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background: var(--bg-color);
                }
                .admin-sidebar {
                    width: 250px;
                    background: var(--bg-light);
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid var(--glass-border);
                }
                .admin-logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary-color);
                    margin-bottom: 2rem;
                }
                .admin-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    flex: 1;
                }
                .admin-nav-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--text-secondary);
                    padding: 10px;
                    border-radius: 4px;
                    transition: var(--transition);
                }
                .admin-nav-link:hover, .admin-nav-link.active {
                    background: rgba(59, 130, 246, 0.1);
                    color: var(--primary-color);
                }
                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: none;
                    border: none;
                    color: #ff6b6b;
                    cursor: pointer;
                    padding: 10px;
                    font-size: 1rem;
                    margin-top: auto;
                }
                .logout-btn:hover {
                    color: #ff4757;
                }
                .admin-content {
                    flex: 1;
                    padding: 2rem;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
