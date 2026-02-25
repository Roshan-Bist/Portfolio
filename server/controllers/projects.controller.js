const Project = require("../Models/projectModel");

exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Project updated successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Project deleted successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Projects fetched successfully", projects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
