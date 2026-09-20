const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        image: {
            type: String,
            default: "",
        },
        link: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        technologies: {
            type: [String],
            default: [],
        },
        project_status: {
            type: String,
            enum: ["completed", "in-progress", "planned"],
            default: "completed",
        },
        public: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
