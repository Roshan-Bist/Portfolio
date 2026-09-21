import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollReveal from './ScrollReveal';

type SkillGroup = {
    category: string;
    topPriority?: boolean;
    items?: string[];
};

const Skills = () => {
    const [skills, setSkills] = useState<SkillGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('/api/profile');
                const groups = res.data?.[0]?.skills || [];
                setSkills(Array.isArray(groups) ? groups : []);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) {
        return (
            <div className="section" id="skills">
                <div className="container skills-page">
                    <div className="skeleton skills-skeleton__title" />
                    <div className="skills-grid">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="skeleton skills-skeleton__card" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!skills.length) return null;

    return (
        <div className="section" id="skills">
            <div className="container skills-page">
                <ScrollReveal>
                    <div className="skills-header">
                        <div className="skills-badge">Stack</div>
                        <h2 className="heading">Skills & Technologies</h2>
                        <p className="skills-subtitle">
                            Languages, frameworks, and tools I use to build reliable backend systems.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="skills-grid">
                    {skills.map((group, index) => (
                        <ScrollReveal key={group.category || index} delay={index * 0.08} threshold={0.1}>
                            <article
                                className={`skill-category glass-panel${group.topPriority ? ' skill-category--priority' : ''}`}
                            >
                                <div className="skill-category__header">
                                    <h3 className="skill-category__title">{group.category}</h3>
                                    {group.topPriority && (
                                        <span className="skill-category__badge">Core</span>
                                    )}
                                </div>
                                <div className="skill-category__items">
                                    {(group.items || []).filter(Boolean).map((item) => (
                                        <span key={item} className="skill-tag">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <style>{`
                .skills-page {
                    padding-bottom: 1rem;
                }

                .skills-header {
                    margin-bottom: clamp(2rem, 5vw, 3rem);
                }

                .skills-header .heading {
                    display: block;
                }

                .skills-badge {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 999px;
                    border: 1px solid rgba(var(--primary-rgb), 0.3);
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                    font-family: var(--font-mono);
                }

                .skills-subtitle {
                    color: var(--text-secondary);
                    max-width: 560px;
                    margin-top: 0.75rem;
                    font-size: clamp(1rem, 2vw, 1.1rem);
                    line-height: 1.7;
                }

                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
                    gap: clamp(1rem, 2.5vw, 1.5rem);
                }

                .skill-category {
                    padding: clamp(1.25rem, 3vw, 1.75rem);
                    border-radius: 14px;
                    height: 100%;
                    transition: transform 0.35s var(--ease-out-expo), border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .skill-category:hover {
                    transform: translateY(-4px);
                    border-color: rgba(var(--primary-rgb), 0.35);
                    box-shadow: 0 16px 40px rgba(var(--primary-rgb), 0.1);
                }

                .skill-category--priority {
                    border-color: rgba(var(--primary-rgb), 0.35);
                    background: linear-gradient(160deg, rgba(var(--primary-rgb), 0.12), rgba(17, 24, 39, 0.7));
                }

                .skill-category__header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .skill-category__title {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: var(--text-heading);
                    margin: 0;
                }

                .skill-category__badge {
                    flex-shrink: 0;
                    padding: 3px 10px;
                    border-radius: 999px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    font-family: var(--font-mono);
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.15);
                    border: 1px solid rgba(var(--primary-rgb), 0.3);
                }

                .skill-category__items {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .skill-tag {
                    display: inline-flex;
                    align-items: center;
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    font-family: var(--font-mono);
                    color: var(--text-primary);
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
                }

                .skill-category:hover .skill-tag {
                    border-color: rgba(var(--primary-rgb), 0.25);
                }

                .skill-tag:hover {
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.1);
                    border-color: rgba(var(--primary-rgb), 0.35);
                }

                .skills-skeleton__title {
                    width: 280px;
                    height: 40px;
                    margin-bottom: 2rem;
                }

                .skills-skeleton__card {
                    height: 160px;
                    border-radius: 14px;
                }
            `}</style>
        </div>
    );
};

export default Skills;
