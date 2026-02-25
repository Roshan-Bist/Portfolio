const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auth = require("./Models/AuthModel");
const Profile = require("./Models/profileModel");
const Project = require("./Models/projectModel");

dotenv.config();

const seedData = async () => {
    try {
        console.log("Connecting to DB at", process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");

        console.log("Clearing existing data...");
        await Auth.deleteMany({});
        await Profile.deleteMany({});
        await Project.deleteMany({});
        console.log("Data cleared.");

        console.log("Creating Admin User...");
        const adminUser = new Auth({
            name: "Roshan Bist",
            email: "admin@example.com",
            password: "password123" // Will be hashed by pre('save') hook
        });
        await adminUser.save();
        console.log("Admin User created.");

        console.log("Creating Profile...");
        const profile = new Profile({
            name: "Roshan Bist",
            title: "Full Stack Developer",
            email: "admin@example.com",
            phone: "+1234567890",
            address: "123 Tech Street, Silicon Valley",
            bio: "Passionate Full Stack Developer with experience in MERN stack.",
            socialLinks: {
                linkedin: "https://linkedin.com/in/roshanbist",
                github: "https://github.com/roshanbist",
                twitter: "https://twitter.com/roshanbist"
            },
            skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
            experience: [
                {
                    title: "Senior Developer",
                    company: "Tech Corp",
                    duration: "2023 - Present",
                    description: "Leading the frontend team."
                }
            ],
            education: [
                {
                    degree: "B.S. Computer Science",
                    school: "University of Tech",
                    year: "2022"
                }
            ],
            achievements: ["Employee of the Month"],
            certifications: ["AWS Certified Developer"],
            languages: ["English", "Nepali"],
            interests: ["Coding", "Hiking"],
            portfolio: "https://roshanbist.com"
        });
        await profile.save();
        console.log("Profile created.");

        console.log("Creating Projects...");
        const projects = [
            {
                title: "Portfolio Website",
                description: "A personal portfolio website built with React and Node.js.",
                image: "https://via.placeholder.com/150",
                link: "https://roshanbist.com",
                project_status: "completed",
                github: "https://github.com/roshanbist/portfolio",
                public: true
            },
            {
                title: "E-commerce App",
                description: "Full-featured e-commerce application.",
                image: "https://via.placeholder.com/150",
                link: "https://shop.example.com",
                project_status: "in-progress",
                github: "https://github.com/roshanbist/ecommerce",
                public: true
            }
        ];
        await Project.insertMany(projects);
        console.log("Projects created.");

        console.log("Data seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
