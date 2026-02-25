import React from 'react';
import { Github, ExternalLink, Folder } from 'lucide-react';

const ProjectCard = ({ project }: { project: any }) => {
  const highlightKeywords = (text: string) => {
    if (!text) return text;
    const keywords = ['API', 'APIs', 'Backend', 'Node.js', 'Payments', 'Cloud', 'CI/CD', 'Stripe', 'Docker', 'MongoDB', 'React', 'TypeScript', 'JWT', 'RESTful'];
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');

    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (keywords.some(k => k.toLowerCase() === part.toLowerCase())) {
        return <span key={index} className="highlight">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="project-card">
      <div className="project-content">
        {project.image ? (
          <div className="project-image-wrapper">
            <img
              src={project.image.startsWith('http') ? project.image : `http://localhost:3004${project.image}`}
              alt={project.title}
              className="project-image"
            />
            <div className="image-overlay"></div>
          </div>
        ) : (
          <div className="project-image-wrapper">
            <div className="project-image-placeholder">
              <Folder size={64} color="var(--primary-color)" strokeWidth={1} />
            </div>
          </div>
        )}
        <div className="project-top">
          <div className="project-badges">
            {project.project_status && (
              <span className={`status-badge ${project.project_status}`}>
                {project.project_status.replace('-', ' ')}
              </span>
            )}
            {!project.image && !project.project_status && <Folder size={40} color="#3b82f6" />}
          </div>
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <div className="project-description">
          <p>{highlightKeywords(project.description)}</p>
        </div>

        <ul className="project-tech-list">
          <li className="tech-tag">React</li>
          <li className="tech-tag">Node.js</li>
          <li className="tech-tag">MongoDB</li>
        </ul>
      </div>

      <style>{`
        .project-card {
          background: rgba(17, 34, 64, 0.7);
          border-radius: 12px;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease, box-shadow 0.4s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(59, 130, 246, 0.1);
          backdrop-filter: blur(10px);
          overflow: hidden;
          position: relative;
        }

        .project-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(217, 70, 239, 0.05) 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 0;
            pointer-events: none;
        }

        .project-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
          background: rgba(17, 34, 64, 0.9);
        }

        .project-card:hover::before {
            opacity: 1;
        }

        .project-content {
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100%;
            position: relative;
            z-index: 1;
        }

        .project-image-wrapper {
          width: 100%;
          height: 220px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(59, 130, 246, 0.1);
        }

        .project-image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(10, 25, 47, 0.8);
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.215, 0.610, 0.355, 1);
          filter: grayscale(40%) contrast(1.1);
        }

        .image-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to bottom, transparent, rgba(10, 25, 47, 0.9));
            opacity: 0.6;
            transition: opacity 0.4s ease;
            pointer-events: none;
        }

        .project-card:hover .project-image {
          transform: scale(1.08);
          filter: grayscale(0%) contrast(1);
        }

        .project-card:hover .image-overlay {
            opacity: 0.2;
        }

        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 0 1.5rem;
          margin-bottom: 1rem;
        }

        .project-badges {
            display: flex;
            gap: 10px;
        }

        .status-badge {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 4px 10px;
            border-radius: 12px;
            font-weight: 600;
        }

        .status-badge.completed {
            background: rgba(59, 130, 246, 0.1);
            color: var(--primary-color);
            border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .status-badge.in-progress {
            background: rgba(255, 171, 0, 0.1);
            color: #ffab00;
            border: 1px solid rgba(255, 171, 0, 0.3);
        }

        .status-badge.on-hold {
            background: rgba(100, 181, 246, 0.1);
            color: #64b5f6;
            border: 1px solid rgba(100, 181, 246, 0.3);
        }

        .project-links {
          display: flex;
          gap: 12px;
          color: var(--text-secondary);
        }

        .project-links a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(17, 34, 64, 0.5);
            transition: all 0.3s ease;
            border: 1px solid transparent;
        }

        .project-links a:hover {
          color: var(--primary-color);
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-3px);
        }

        .project-title {
          padding: 0 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .project-description {
          padding: 0 1.5rem;
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .project-tech-list {
          padding: 0 1.5rem 1.5rem 1.5rem;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          list-style: none;
          margin: 0;
        }

        .tech-tag {
            font-family: monospace;
            font-size: 0.85rem;
            color: var(--text-primary);
            background: rgba(204, 214, 246, 0.1);
            padding: 4px 12px;
            border-radius: 15px;
            transition: all 0.3s ease;
        }

        .project-card:hover .tech-tag {
            background: rgba(59, 130, 246, 0.1);
            color: var(--primary-color);
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
