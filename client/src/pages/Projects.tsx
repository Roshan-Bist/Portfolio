import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';

const Projects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/project');
                setProjects(res.data.projects || []);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError("Failed to load projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div className="container section">Loading projects...</div>;
    if (error) return <div className="container section" style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="section">
            <div className="container">
                <h2 className="heading">Projects</h2>
                <ScrollReveal>
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                </ScrollReveal>
            </div>
            <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
      `}</style>
        </div>
    );
};

export default Projects;
