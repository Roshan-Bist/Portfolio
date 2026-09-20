import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const statusLabel: Record<string, string> = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planned: 'Planned',
};

const Projects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProjects(res.data.projects || []);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setFetchError("Couldn't load projects. Make sure the server is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="container projects-page">
                <div className="projects-header">
                    <div className="skeleton projects-skeleton__badge" />
                    <div className="skeleton projects-skeleton__title" />
                    <div className="skeleton projects-skeleton__subtitle" />
                </div>
                <div className="projects-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton projects-skeleton__card" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container projects-page">
            <div className="projects-header">
                <div className="projects-badge">Selected Work</div>
                <h2 className="projects-title">Backend Projects</h2>
                <p className="projects-subtitle">
                    APIs, real-time systems, and production backends I&apos;ve built and shipped.
                </p>
            </div>

            {fetchError ? (
                <div className="glass-panel projects-empty projects-error">
                    <p>{fetchError}</p>
                </div>
            ) : projects.length === 0 ? (
                <div className="glass-panel projects-empty">
                    <p>No projects published yet. Please check back later!</p>
                </div>
            ) : (
                <div
                    className={[
                        'projects-grid',
                        projects.length <= 2 ? 'projects-grid--centered' : '',
                        projects.length === 1 ? 'projects-grid--single' : '',
                        projects.length === 2 ? 'projects-grid--duo' : '',
                        projects.length === 4 ? 'projects-grid--quad' : '',
                        projects.length === 5 ? 'projects-grid--five' : '',
                    ].filter(Boolean).join(' ')}
                >
                    {projects.map((project, index) => (
                        <article
                            key={project._id}
                            className="project-card glass-panel"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            {project.image && (
                                <div className="project-card__image-wrap">
                                    <div className="project-card__image-overlay" />
                                    <span className={`project-card__status project-card__status--${project.project_status}`}>
                                        {statusLabel[project.project_status] || project.project_status}
                                    </span>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-card__image"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            <div className="project-card__body">
                                {!project.image && (
                                    <span className={`project-card__status project-card__status--inline project-card__status--${project.project_status}`}>
                                        {statusLabel[project.project_status] || project.project_status}
                                    </span>
                                )}

                                <h3 className="project-card__title">{project.title}</h3>

                                <p className="project-card__excerpt">
                                    {project.description.length > 160
                                        ? `${project.description.substring(0, 160)}...`
                                        : project.description}
                                </p>

                                {project.technologies?.length > 0 && (
                                    <div className="project-card__tech">
                                        {project.technologies.map((tech: string) => (
                                            <span key={tech} className="project-card__tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="project-card__actions">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-card__link"
                                        >
                                            <Github size={16} />
                                            Code
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-card__link project-card__link--primary"
                                        >
                                            <ExternalLink size={16} />
                                            Live
                                            <ArrowUpRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <style>{`
                .projects-page {
                    min-height: 80vh;
                    padding: clamp(3rem, 8vw, 6rem) 0 3rem;
                }

                .projects-header {
                    text-align: center;
                    margin-bottom: clamp(2.5rem, 6vw, 4rem);
                }

                .projects-badge {
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

                .projects-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 800;
                    color: var(--text-heading);
                    margin-bottom: 1rem;
                    letter-spacing: -0.5px;
                }

                .projects-subtitle {
                    color: var(--text-secondary);
                    max-width: 560px;
                    margin: 0 auto;
                    font-size: clamp(1rem, 2vw, 1.1rem);
                    line-height: 1.7;
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
                    gap: clamp(1.5rem, 3vw, 2rem);
                }

                .projects-grid--centered {
                    justify-content: center;
                }

                .projects-grid--single {
                    grid-template-columns: minmax(min(100%, 380px), 420px);
                }

                .projects-grid--duo {
                    grid-template-columns: repeat(2, minmax(min(100%, 320px), 400px));
                }

                .projects-grid--quad {
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                }

                .projects-grid--quad .project-card:nth-child(4) {
                    grid-column: 2;
                }

                .projects-grid--five {
                    grid-template-columns: repeat(6, minmax(0, 1fr));
                }

                .projects-grid--five .project-card:nth-child(-n+3) {
                    grid-column: span 2;
                }

                .projects-grid--five .project-card:nth-child(4) {
                    grid-column: 2 / span 2;
                }

                .projects-grid--five .project-card:nth-child(5) {
                    grid-column: 4 / span 2;
                }

                @media (max-width: 900px) {
                    .projects-grid--quad,
                    .projects-grid--five {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .projects-grid--quad .project-card:nth-child(4) {
                        grid-column: 1 / -1;
                        max-width: 400px;
                        width: 100%;
                        justify-self: center;
                    }

                    .projects-grid--five .project-card:nth-child(-n+3),
                    .projects-grid--five .project-card:nth-child(4),
                    .projects-grid--five .project-card:nth-child(5) {
                        grid-column: auto;
                    }

                    .projects-grid--five .project-card:nth-child(5) {
                        grid-column: 1 / -1;
                        max-width: 400px;
                        width: 100%;
                        justify-self: center;
                    }
                }

                @media (max-width: 768px) {
                    .projects-grid--duo,
                    .projects-grid--quad,
                    .projects-grid--five {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .projects-grid--quad .project-card:nth-child(4),
                    .projects-grid--five .project-card:nth-child(5) {
                        grid-column: auto;
                        max-width: none;
                    }
                }

                .project-card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    border-radius: 16px;
                    overflow: hidden;
                    opacity: 0;
                    animation: fadeInUp 0.6s var(--ease-out-expo) forwards;
                    transition: transform 0.4s var(--ease-out-expo), border-color 0.4s ease, box-shadow 0.4s ease;
                }

                .project-card:hover {
                    transform: translateY(-6px);
                    border-color: rgba(var(--primary-rgb), 0.35);
                    box-shadow: 0 20px 50px rgba(var(--primary-rgb), 0.12);
                }

                .project-card__image-wrap {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }

                @media (min-width: 768px) {
                    .project-card__image-wrap { height: 220px; }
                }

                .project-card__image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, var(--bg-primary), transparent);
                    opacity: 0.5;
                    z-index: 1;
                    transition: opacity 0.3s ease;
                }

                .project-card:hover .project-card__image-overlay {
                    opacity: 0.3;
                }

                .project-card__status {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    z-index: 2;
                    padding: 4px 12px;
                    border-radius: 999px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    font-family: var(--font-mono);
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .project-card__status--inline {
                    position: static;
                    display: inline-block;
                    margin-bottom: 0.75rem;
                }

                .project-card__status--completed {
                    background: rgba(34, 211, 238, 0.2);
                    color: #67e8f9;
                }

                .project-card__status--in-progress {
                    background: rgba(251, 191, 36, 0.2);
                    color: #fcd34d;
                }

                .project-card__status--planned {
                    background: rgba(148, 163, 184, 0.2);
                    color: #cbd5e1;
                }

                .project-card__image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s var(--ease-out-expo);
                }

                .project-card:hover .project-card__image {
                    transform: scale(1.06);
                }

                .project-card__body {
                    padding: clamp(1.25rem, 3vw, 1.75rem);
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .project-card__title {
                    font-size: clamp(1.1rem, 2.5vw, 1.35rem);
                    font-weight: 700;
                    color: var(--text-heading);
                    margin-bottom: 0.75rem;
                    line-height: 1.35;
                    transition: color 0.3s ease;
                }

                .project-card:hover .project-card__title {
                    color: var(--primary-color);
                }

                .project-card__excerpt {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.65;
                    margin-bottom: 1rem;
                    flex-grow: 1;
                }

                .project-card__tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.45rem;
                    margin-bottom: 1.25rem;
                }

                .project-card__tech-tag {
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 10px;
                    border-radius: 999px;
                    font-size: 0.72rem;
                    font-weight: 600;
                    font-family: var(--font-mono);
                    letter-spacing: 0.02em;
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.1);
                    border: 1px solid rgba(var(--primary-rgb), 0.22);
                }

                .project-card__actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .project-card__link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-heading);
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: var(--transition);
                }

                .project-card__link:hover {
                    border-color: rgba(var(--primary-rgb), 0.35);
                    color: var(--primary-color);
                }

                .project-card__link--primary {
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.1);
                    border-color: rgba(var(--primary-rgb), 0.2);
                }

                .project-card__link--primary:hover {
                    background: rgba(var(--primary-rgb), 0.2);
                }

                .projects-empty {
                    text-align: center;
                    padding: 3rem;
                    border-radius: 16px;
                    max-width: 560px;
                    margin: 0 auto;
                    color: var(--text-secondary);
                }

                .projects-error {
                    border-color: rgba(239, 68, 68, 0.3);
                    color: #fca5a5;
                }

                .projects-skeleton__badge {
                    width: 140px;
                    height: 28px;
                    margin: 0 auto 1rem;
                    border-radius: 999px;
                }

                .projects-skeleton__title {
                    width: 280px;
                    height: 40px;
                    margin: 0 auto 1rem;
                }

                .projects-skeleton__subtitle {
                    width: 400px;
                    max-width: 90%;
                    height: 20px;
                    margin: 0 auto;
                }

                .projects-skeleton__card {
                    height: 380px;
                    border-radius: 16px;
                }
            `}</style>
        </div>
    );
};

export default Projects;
