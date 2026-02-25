import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, X, Save, ExternalLink, Github } from 'lucide-react';

const ProjectManager = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState<any>({
        title: '',
        description: '',
        image: '',
        link: '',
        github: '',
        project_status: 'completed',
        public: true
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/project');
            setProjects(res.data.projects || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const headers = {
                'Authorization': localStorage.getItem('token') || ''
            };
            try {
                await axios.delete(`/api/project/${id}`, { headers });
                setProjects(projects.filter(p => p._id !== id));
            } catch (error) {
                console.error("Error deleting project:", error);
                alert("Failed to delete project");
            }
        }
    };

    const startEdit = (project: any) => {
        setCurrentProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            link: project.link,
            github: project.github || '',
            project_status: project.project_status,
            public: project.public
        });
        setIsEditing(true);
    };

    const startAdd = () => {
        setCurrentProject(null);
        setFormData({
            title: '',
            description: '',
            image: '',
            link: '',
            github: '',
            project_status: 'completed',
            public: true
        });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setCurrentProject(null);
    };

    const handleChange = (e: any) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const headers = {
            'Authorization': localStorage.getItem('token') || ''
        };

        try {
            if (currentProject) {
                // Update
                const res = await axios.put(`/api/project/${currentProject._id}`, formData, { headers });
                setProjects(projects.map(p => p._id === currentProject._id ? res.data.project : p));
            } else {
                // Create
                const res = await axios.post('/api/project', formData, { headers });
                setProjects([...projects, res.data.project]);
            }
            setIsEditing(false);
            fetchProjects(); // Refresh to be safe
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project");
        }
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div className="project-manager">
            <div className="header-flex">
                <h2 className="heading">Manage Projects</h2>
                {!isEditing && (
                    <button onClick={startAdd} className="btn-small">
                        <Plus size={16} /> Add New Project
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="edit-form glass-panel">
                    <h3>{currentProject ? 'Edit Project' : 'Add New Project'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                        </div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Live Link</label>
                                <input type="text" name="link" value={formData.link} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>GitHub Link</label>
                                <input type="text" name="github" value={formData.github} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Status</label>
                                <select name="project_status" value={formData.project_status} onChange={handleChange}>
                                    <option value="completed">Completed</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="on-hold">On Hold</option>
                                </select>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input type="checkbox" name="public" checked={formData.public} onChange={handleChange} />
                                    Publicly Visible
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={cancelEdit} className="btn-cancel">Cancel</button>
                            <button type="submit" className="btn-save"><Save size={16} /> Save Project</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="projects-list">
                    {projects.map(project => (
                        <div key={project._id} className="project-item glass-panel">
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <p className="status">{project.project_status}</p>
                            </div>
                            <div className="project-actions">
                                <button onClick={() => startEdit(project)} className="btn-icon">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="btn-icon delete">
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .header-flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .btn-small {
                    background: rgba(59, 130, 246, 0.1);
                    color: var(--primary-color);
                    border: 1px solid var(--primary-color);
                    padding: 8px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.9rem;
                }
                .projects-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .project-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: rgba(17, 34, 64, 0.5);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                }
                .project-info h3 {
                    margin: 0 0 5px 0;
                    color: var(--text-primary);
                }
                .project-info .status {
                    margin: 0;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    text-transform: capitalize;
                }
                .project-actions {
                    display: flex;
                    gap: 10px;
                }
                .btn-icon {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--text-secondary);
                    padding: 5px;
                }
                .btn-icon:hover {
                    color: var(--primary-color);
                }
                .btn-icon.delete:hover {
                    color: #ff6b6b;
                }
                
                /* Form Styles */
                .edit-form {
                    padding: 20px;
                    background: rgba(17, 34, 64, 0.8);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    color: var(--text-secondary);
                }
                input, textarea, select {
                    width: 100%;
                    padding: 10px;
                    background: var(--bg-color);
                    border: 1px solid var(--glass-border);
                    border-radius: 4px;
                    color: var(--text-primary);
                }
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                .checkbox-group label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    margin-top: 30px;
                }
                .checkbox-group input {
                    width: auto;
                }
                .form-actions {
                    display: flex;
                    gap: 15px;
                    margin-top: 20px;
                }
                .btn-save {
                    background: rgba(59, 130, 246, 0.1);
                    color: var(--primary-color);
                    border: 1px solid var(--primary-color);
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .btn-cancel {
                    background: transparent;
                    color: var(--text-secondary);
                    border: 1px solid var(--text-secondary);
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};
export default ProjectManager;
