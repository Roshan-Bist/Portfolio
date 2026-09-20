const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Profile = require("./Models/profileModel");
const Project = require("./Models/projectModel");
const Article = require("./Models/articleModel");
const Auth = require("./Models/AuthModel");
const { DEFAULT_PROFILE_IMAGE } = require("./constants");

dotenv.config();

const profilesPath = path.join(__dirname, "seed-data", "profiles.json");
const projectsPath = path.join(__dirname, "seed-data", "projects.json");

/** Strip Mongo export metadata ($oid, $date, __v, timestamps). */
function cleanMongoExport(doc) {
    if (Array.isArray(doc)) {
        return doc.map(cleanMongoExport);
    }
    if (doc && typeof doc === "object") {
        if (Object.keys(doc).length === 1 && doc.$oid) return doc.$oid;
        if (Object.keys(doc).length === 1 && doc.$date) return new Date(doc.$date);

        const cleaned = {};
        for (const [key, value] of Object.entries(doc)) {
            if (key === "_id" || key === "__v" || key === "createdAt" || key === "updatedAt") {
                continue;
            }
            cleaned[key] = cleanMongoExport(value);
        }
        return cleaned;
    }
    return doc;
}

function loadJson(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Seed file not found: ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const seedRealData = async () => {
    try {
        console.log("Connecting to DB at", process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");

        console.log("Creating/Updating Admin User...");
        await Auth.deleteMany({});
        const adminUser = new Auth({
            name: "Roshan Bist",
            email: "roshanbist2025@gmail.com",
            password: "roshan@123",
        });
        await adminUser.save();
        console.log("Admin User created:", adminUser.email);

        console.log("Seeding Profile from seed-data/profiles.json...");
        const profilesRaw = loadJson(profilesPath);
        const profileSource = Array.isArray(profilesRaw) ? profilesRaw[0] : profilesRaw;
        if (!profileSource) {
            throw new Error("profiles.json has no profile document");
        }

        const profileData = cleanMongoExport(profileSource);
        if (!profileData.image) {
            profileData.image = DEFAULT_PROFILE_IMAGE;
        }

        await Profile.deleteMany({});
        const profile = await Profile.create(profileData);
        console.log("Profile created:", profile.name, `(${profile.email})`);

        console.log("Seeding Projects from seed-data/projects.json...");
        const projectsRaw = loadJson(projectsPath);
        const projects = (Array.isArray(projectsRaw) ? projectsRaw : [projectsRaw]).map((project) => {
            const cleaned = cleanMongoExport(project);
            return {
                title: cleaned.title,
                description: cleaned.description || "",
                image: cleaned.image || "",
                link: cleaned.link || "",
                github: cleaned.github || "",
                technologies: Array.isArray(cleaned.technologies) ? cleaned.technologies : [],
                project_status: cleaned.project_status || "completed",
                public: cleaned.public !== false,
            };
        });

        await Project.deleteMany({});
        await Article.deleteMany({}); // clear leftover article seed data
        if (projects.length > 0) {
            await Project.insertMany(projects);
        }
        console.log(`Seeded ${projects.length} projects.`);

        console.log("Data seeding completed successfully!");
        console.log("Login with:", adminUser.email, "/ roshan@123");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding real data:", error);
        process.exit(1);
    }
};

seedRealData();
