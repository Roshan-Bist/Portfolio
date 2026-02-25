import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollReveal from '../components/ScrollReveal';

const Skills = () => {
    const [skills, setSkills] = useState<string[]>([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/profile');
                if (res.data && res.data.length > 0) {
                    setSkills(res.data[0].skills || []);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!skills.length) return null;

    return (
        <div className="section" id="skills">
            <div className="container">
                <ScrollReveal>
                    <h2 className="heading" style={{ display: 'block' }}>Technical Skills</h2>
                    <div className="skills-category-grid">
                        {skills.map((categoryObj: any, index: number) => (
                            <div key={index} className="skill-category-card glass-panel" style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="category-header">
                                    <h3 className="category-title">{categoryObj.category}</h3>
                                    {categoryObj.topPriority && (
                                        <span className="priority-badge">TOP PRIORITY</span>
                                    )}
                                </div>
                                <div className="skills-items-container">
                                    {categoryObj.items && categoryObj.items.map((item: string, i: number) => (
                                        <span key={i} className="skill-pill" style={{ animationDelay: `${(index * 0.15) + (i * 0.05)}s` }}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            <style>{`
            .skills-category-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 2rem;
                margin-top: 3rem;
            }

            .skill-category-card {
                padding: 2rem;
                background: rgba(17, 34, 64, 0.5);
                border: 1px solid var(--glass-border);
                border-radius: 8px;
                backdrop-filter: blur(10px);
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease, box-shadow 0.4s ease;
                position: relative;
                overflow: hidden;
                animation: fadeUpIn 0.8s ease-out forwards;
                opacity: 0;
                transform: translateY(20px);
            }

            /* Adding a subtle animated gradient background on hover to the cards */
            .skill-category-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(217, 70, 239, 0.05) 100%);
                opacity: 0;
                transition: opacity 0.4s ease;
                z-index: 0;
                pointer-events: none;
            }

            .skill-category-card:hover::before {
                opacity: 1;
            }

            .skill-category-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: rgba(59, 130, 246, 0.3);
                box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
            }

            .category-header, .skills-items-container {
                position: relative;
                z-index: 1;
            }

            .category-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                border-left: 3px solid var(--primary-color);
                padding-left: 10px;
                transition: border-color 0.3s ease;
            }

            .skill-category-card:hover .category-header {
                border-left-color: #d946ef; /* Matches the neon pink/purple on hover */
            }

            .category-title {
                font-size: 1.25rem;
                color: var(--text-heading);
                margin: 0;
                transition: color 0.3s ease;
            }

            .skill-category-card:hover .category-title {
                color: #fff;
            }

            .priority-badge {
                font-size: 0.7rem;
                font-weight: 700;
                color: #000;
                background-color: #06b6d4;
                padding: 3px 8px;
                border-radius: 4px;
                letter-spacing: 0.5px;
                box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7); }
                70% { box-shadow: 0 0 0 6px rgba(6, 182, 212, 0); }
                100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
            }

            .skills-items-container {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
            }

            .skill-pill {
                background: rgba(15, 23, 42, 0.8);
                color: var(--text-primary);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 0.95rem;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                cursor: default;
                animation: fadeUpIn 0.8s ease-out forwards;
                opacity: 0;
            }

            .skill-pill:hover {
                background: rgba(59, 130, 246, 0.15);
                border-color: rgba(59, 130, 246, 0.6);
                color: #fff;
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
            }

            @keyframes fadeUpIn {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
            }
            `}</style>
        </div>
    );
};

export default Skills;
