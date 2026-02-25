import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, User, Star } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        experience: 0,
        skills: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [profileRes, projectRes] = await Promise.all([
                    axios.get('/api/profile'),
                    axios.get('/api/project')
                ]);

                const profile = profileRes.data[0] || {};
                const projects = projectRes.data.projects || [];

                setStats({
                    projects: projects.length,
                    experience: profile.experience ? profile.experience.length : 0,
                    skills: profile.skills ? profile.skills.length : 0
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <h2 className="heading">Dashboard Overview</h2>
            <div className="stats-grid">
                <div className="stat-card glass-panel">
                    <Briefcase size={32} className="stat-icon" />
                    <div className="stat-info">
                        <h3>{stats.projects}</h3>
                        <p>Total Projects</p>
                    </div>
                </div>
                <div className="stat-card glass-panel">
                    <User size={32} className="stat-icon" />
                    <div className="stat-info">
                        <h3>{stats.experience}</h3>
                        <p>Experience Entries</p>
                    </div>
                </div>
                <div className="stat-card glass-panel">
                    <Star size={32} className="stat-icon" />
                    <div className="stat-info">
                        <h3>{stats.skills}</h3>
                        <p>Skills Listed</p>
                    </div>
                </div>
            </div>

            <style>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                .stat-card {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    background: rgba(17, 34, 64, 0.5);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                }
                .stat-icon {
                    color: var(--primary-color);
                }
                .stat-info h3 {
                    font-size: 2rem;
                    color: var(--text-primary);
                    margin: 0;
                    line-height: 1;
                }
                .stat-info p {
                    color: var(--text-secondary);
                    margin: 5px 0 0 0;
                    font-size: 0.9rem;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
