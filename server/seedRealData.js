const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Auth = require('./Models/AuthModel');
const Profile = require('./Models/profileModel');
const Project = require('./Models/projectModel');

dotenv.config();

const ADMIN = {
    name: 'Roshan Bist',
    email: 'roshanbist2025@gmail.com',
    password: 'roshan@123',
};

const profileData = {
    name: 'Roshan Bist',
    title: 'Backend Engineer | Node.js Specialist | Real-Time & Payment Systems',
    email: 'roshanbist2025@gmail.com',
    phone: '+47 (Contact via Email)',
    address: 'Stavanger, Norway',
    bio: 'I build secure, scalable backend systems using Node.js and modern web technologies. Experienced in authentication systems, WebSocket-based real-time features, and subscription-based platforms.',
    highlights: [
        'Design scalable and modular backend systems',
        'Prioritize secure authentication and server-side validation',
        'Optimize database performance',
        'Maintain clean and production-ready code',
        'Focus on long-term maintainability',
    ],
    socialLinks: {
        linkedin: 'https://linkedin.com/in/roshan-bist-87039316a',
        github: 'https://github.com/roshanbist',
        twitter: '',
    },
    skills: [
        {
            category: 'Backend',
            topPriority: true,
            items: [
                'Node.js',
                'Express',
                'REST APIs',
                'WebSocket',
                'Authentication (JWT, Secure server-side processing)',
            ],
        },
        {
            category: 'Databases',
            topPriority: false,
            items: ['MongoDB', 'MySQL', 'SQLite'],
        },
        {
            category: 'Cloud & DevOps',
            topPriority: false,
            items: ['CI/CD pipelines', 'Docker (working knowledge)', 'Git'],
        },
        {
            category: 'Frontend',
            topPriority: false,
            items: ['React (working knowledge)', 'SSR integration'],
        },
    ],
    experience: [
        {
            title: 'Junior Full Stack Developer (MERN – Freelancer)',
            company: 'I.R. MEDIATECH PVT. LTD – Nepal',
            duration: 'Apr 2025 – Present',
            description:
                '• Built scalable REST APIs\n• Implemented WebSocket for real-time features\n• Collaborated with UI/UX team to improve onboarding experience\n• Managed CI/CD deployment workflows\n• Researched and implemented AI agent framework for multi-platform interaction',
        },
        {
            title: 'Junior Backend Developer (Node.js)',
            company: 'I.R. MEDIATECH PVT. LTD – Nepal',
            duration: 'Oct 2024 – Mar 2025',
            description:
                '• Optimized backend architecture for scalability\n• Ensured secure server-side processing\n• Collaborated with AI and data teams',
        },
        {
            title: 'Junior Backend Developer',
            company: 'SILICONTECH NEPAL PVT. LTD – Nepal',
            duration: 'Feb 2022 – Aug 2024',
            description:
                '• Implemented advanced authentication systems\n• Integrated WebSocket real-time features\n• Developed subscription and payment systems\n• Conducted backend code reviews\n• Mentored 3 interns in backend development',
        },
        {
            title: 'Web Developer Intern (Python Flask)',
            company: 'U.N.I.Q.E TECHNOLOGIES – Bangalore, India',
            duration: 'Jul 2019 – Aug 2019',
            description:
                '• Built authentication modules\n• Developed REST APIs\n• Designed database schemas (SQLite & MySQL)\n• Implemented order management system',
        },
    ],
    education: [
        {
            degree: 'Bachelor of Engineering – Computer Science',
            school: 'Visvesvaraya Technological University (India)',
            year: 'CGPA: 7.45/10 | Recognized by NOKUT (Norway)',
        },
        {
            degree: 'Final Year Project',
            school: 'House Price Prediction using Machine Learning',
            year: 'Regression modeling, Feature engineering, Model evaluation',
        },
    ],
    achievements: [],
    certifications: [],
    languages: ['English', 'Nepali'],
    interests: ['Backend Architecture', 'Open Source', 'Hiking'],
    portfolio: '',
};

const sampleProjects = [
    {
        title: 'Real-Time Chat API',
        description:
            'Scalable Node.js backend with WebSocket support, JWT authentication, and MongoDB for persistent messaging.',
        image: 'https://images.unsplash.com/photo-1616469829941-018a8c2ee993?w=800&auto=format&fit=crop',
        link: 'https://github.com/roshanbist',
        project_status: 'completed',
        github: 'https://github.com/roshanbist',
        public: true,
    },
    {
        title: 'Subscription Payment Platform',
        description:
            'Backend service handling subscription billing, secure payment webhooks, and user access control.',
        image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop',
        link: 'https://github.com/roshanbist',
        project_status: 'completed',
        github: 'https://github.com/roshanbist',
        public: true,
    },
    {
        title: 'Portfolio CMS',
        description:
            'Full-stack portfolio with admin dashboard, profile management, and REST API built with MERN stack.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
        link: 'https://github.com/roshanbist',
        project_status: 'in-progress',
        github: 'https://github.com/roshanbist',
        public: true,
    },
];

const seedRealData = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to DB');

        // Admin user
        let admin = await Auth.findOne({ email: ADMIN.email });
        if (admin) {
            admin.name = ADMIN.name;
            admin.password = ADMIN.password;
            await admin.save();
            console.log('Admin user updated:', ADMIN.email);
        } else {
            admin = new Auth(ADMIN);
            await admin.save();
            console.log('Admin user created:', ADMIN.email);
        }

        // Profile
        const existingProfile = await Profile.findOne({});
        if (existingProfile) {
            await Profile.updateOne({ _id: existingProfile._id }, { $set: profileData });
            console.log('Profile updated.');
        } else {
            await new Profile(profileData).save();
            console.log('Profile created.');
        }

        // Projects
        await Project.deleteMany({});
        await Project.insertMany(sampleProjects);
        console.log(`Projects seeded: ${sampleProjects.length}`);

        console.log('\n✅ Seeding completed successfully!');
        console.log('─────────────────────────────────');
        console.log('Admin login:');
        console.log(`  Email:    ${ADMIN.email}`);
        console.log(`  Password: ${ADMIN.password}`);
        console.log('─────────────────────────────────');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedRealData();
