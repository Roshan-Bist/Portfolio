import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollReveal from '../components/ScrollReveal';

const Education = () => {
    const [education, setEducation] = useState<any[]>([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/profile');
                if (res.data && res.data.length > 0) {
                    setEducation(res.data[0].education || []);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!education.length) return null;

    return (
        <div className="section" id="education">
            <div className="container">
                <ScrollReveal threshold={0.2}>
                    <div className="experience-section">
                        <h2 className="heading">Education</h2>
                        <div className="timeline">
                            {education.map((edu: any, index: number) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h4>{edu.degree}</h4>
                                        <div className="company" style={{ margin: '0.5rem 0' }}>{edu.school}</div>
                                        <div className="duration">
                                            <span>{edu.year}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            <style>{`
             .timeline {
                 position: relative;
                 max-width: 900px;
                 margin: 0 auto;
                 padding: 20px 0;
             }
    
             .timeline::after {
                 content: '';
                 position: absolute;
                 width: 2px;
                 background: rgba(59, 130, 246, 0.15);
                 top: 0;
                 bottom: 0;
                 left: 20px;
                 margin-left: -1px;
             }
    
             .timeline-item {
                 padding: 10px 0 30px 50px;
                 position: relative;
                 width: 100%;
                 display: flex;
             }
    
             .timeline-dot {
                 width: 16px;
                 height: 16px;
                 position: absolute;
                 background: var(--bg-primary);
                 border: 2px solid var(--primary-color);
                 border-radius: 50%;
                 left: 13px;
                 top: 24px;
                 z-index: 1;
                 transition: all 0.3s ease;
             }
    
             .timeline-item:hover .timeline-dot {
                 background: var(--primary-color);
                 box-shadow: 0 0 12px var(--primary-color);
             }
    
             .timeline-content {
                 padding: 25px 30px;
                 background: rgba(17, 34, 64, 0.5);
                 border: 1px solid var(--glass-border);
                 border-radius: 8px;
                 width: 100%;
                 backdrop-filter: blur(10px);
                 transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease, box-shadow 0.4s ease;
                 position: relative;
                 overflow: hidden;
             }

             .timeline-content::before {
                 content: '';
                 position: absolute;
                 top: 0; left: 0; right: 0; bottom: 0;
                 background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(217, 70, 239, 0.05) 100%);
                 opacity: 0;
                 transition: opacity 0.4s ease;
                 z-index: 0;
                 pointer-events: none;
             }

             .timeline-content:hover::before {
                 opacity: 1;
             }
    
             .timeline-content:hover {
                 transform: translateY(-8px) scale(1.02);
                 border-color: rgba(59, 130, 246, 0.3);
                 box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
             }
    
             .timeline-content h4 {
                 font-size: 1.3rem;
                 color: var(--text-heading);
                 margin-bottom: 0.2rem;
                 position: relative;
                 z-index: 1;
             }
    
             .timeline-content .company {
                 color: var(--primary-color);
                 font-weight: 500;
                 position: relative;
                 z-index: 1;
             }
    
             .timeline-content .duration {
                 font-family: var(--font-mono);
                 font-size: 0.9rem;
                 color: var(--text-secondary);
                 display: flex;
                 align-items: center;
                 position: relative;
                 z-index: 1;
             }
            `}</style>
        </div>
    );
};

export default Education;
