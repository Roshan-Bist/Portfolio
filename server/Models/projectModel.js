const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    project_status: {
        type: String,
        enum: ["completed", "in-progress", "on-hold"],
        default: "in-progress"
    },
    github: {
        type: String,
    },
    public: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Project", ProjectSchema);