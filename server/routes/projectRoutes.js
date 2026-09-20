const express = require("express");
const router = express.Router();
const {
    createProject,
    updateProject,
    deleteProject,
    getProjects,
    getProjectById,
} = require("../controllers/projects.controller");
const authenticate = require("../Middleware/authentication");

router.post("/", authenticate, createProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);

module.exports = router;
