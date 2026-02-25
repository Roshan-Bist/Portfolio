const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Profile = require('./Models/profileModel');

dotenv.config();

const seedRealData = async () => {
    try {
        console.log("Connecting to DB at", process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");

        const realProfileData = {
            name: "Roshan Bist",
            title: "Backend Engineer | Node.js Specialist | Real-Time & Payment Systems",
            email: "roshanbist2025@gmail.com",
            phone: "+47 (Contact via Email)", // Placeholder as phone is required but wasn't provided perfectly
            address: "Stavanger, Norway",
            bio: "I build secure, scalable backend systems using Node.js and modern web technologies. Experienced in authentication systems, WebSocket-based real-time features, and subscription-based platforms.",
            highlights: [
                "Design scalable and modular backend systems",
                "Prioritize secure authentication and server-side validation",
                "Optimize database performance",
                "Maintain clean and production-ready code",
                "Focus on long-term maintainability"
            ],
            socialLinks: {
                linkedin: "https://linkedin.com/in/roshan-bist-87039316a",
                github: "https://github.com/roshanbist", // Assuming generic
                twitter: ""
            },
            skills: [
                {
                    category: "Backend",
                    topPriority: true,
                    items: [
                        "Node.js",
                        "Express",
                        "REST APIs",
                        "WebSocket",
                        "Authentication (JWT, Secure server-side processing)"
                    ]
                },
                {
                    category: "Databases",
                    topPriority: false,
                    items: ["MongoDB", "MySQL", "SQLite"]
                },
                {
                    category: "Cloud & DevOps",
                    topPriority: false,
                    items: ["CI/CD pipelines", "Docker (working knowledge)", "Git"]
                },
                {
                    category: "Frontend",
                    topPriority: false,
                    items: ["React (working knowledge)", "SSR integration"]
                }
            ],
            experience: [
                {
                    title: "Junior Full Stack Developer (MERN – Freelancer)",
                    company: "I.R. MEDIATECH PVT. LTD – Nepal",
                    duration: "Apr 2025 – Present",
                    description: "• Built scalable REST APIs\n• Implemented WebSocket for real-time features\n• Collaborated with UI/UX team to improve onboarding experience\n• Managed CI/CD deployment workflows\n• Researched and implemented AI agent framework for multi-platform interaction"
                },
                {
                    title: "Junior Backend Developer (Node.js)",
                    company: "I.R. MEDIATECH PVT. LTD – Nepal",
                    duration: "Oct 2024 – Mar 2025",
                    description: "• Optimized backend architecture for scalability\n• Ensured secure server-side processing\n• Collaborated with AI and data teams"
                },
                {
                    title: "Junior Backend Developer",
                    company: "SILICONTECH NEPAL PVT. LTD – Nepal",
                    duration: "Feb 2022 – Aug 2024",
                    description: "• Implemented advanced authentication systems\n• Integrated WebSocket real-time features\n• Developed subscription and payment systems\n• Conducted backend code reviews\n• Mentored 3 interns in backend development"
                },
                {
                    title: "Web Developer Intern (Python Flask)",
                    company: "U.N.I.Q.E TECHNOLOGIES – Bangalore, India",
                    duration: "Jul 2019 – Aug 2019",
                    description: "• Built authentication modules\n• Developed REST APIs\n• Designed database schemas (SQLite & MySQL)\n• Implemented order management system"
                }
            ],
            education: [
                {
                    degree: "Bachelor of Engineering – Computer Science",
                    school: "Visvesvaraya Technological University (India)",
                    year: "CGPA: 7.45/10 | Recognized by NOKUT (Norway)"
                },
                {
                    degree: "Final Year Project",
                    school: "House Price Prediction using Machine Learning",
                    year: "Regression modeling, Feature engineering, Model evaluation"
                }
            ],
            achievements: [],
            certifications: [],
            languages: [],
            interests: [],
            portfolio: ""
        };

        console.log("Updating Profile with real data...");
        // Since there is only one profile, we use updateOne without specific query filter or grab the first
        const existingProfile = await Profile.findOne({});

        if (existingProfile) {
            const result = await Profile.updateOne({ _id: existingProfile._id }, { $set: realProfileData });
            console.log("Profile updated:", result);
        } else {
            const newProfile = new Profile(realProfileData);
            await newProfile.save();
            console.log("Profile created from scratch.");
        }

        console.log("Data seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding real data:", error);
        process.exit(1);
    }
};

seedRealData();
