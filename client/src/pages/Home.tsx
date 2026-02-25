import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import axios from 'axios';

const Home = () => {
    const [profile, setProfile] = useState<any>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/profile');
                if (res.data && res.data.length > 0) {
                    setProfile(res.data[0]);
                } else {
                    setError("No profile data found.");
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError("Failed to load profile data.");
            }
        };

        fetchProfile();
    }, []);

    if (error) return <div className="container section" style={{ color: 'red' }}>{error}</div>;
    if (!profile) return <div className="container section">Loading profile...</div>;

    return (
        <div className="home-page">
            <section className="hero section">
                <div className="container">
                    <div className="hero-content">
                        {profile.image && (
                            <div className="hero-img-wrapper animate-element delay-1">
                                <img
                                    src={profile.image.startsWith('http') ? profile.image : `http://localhost:3004${profile.image}`}
                                    alt={profile.name}
                                    className="hero-profile-img"
                                />
                            </div>
                        )}
                        <div className="hero-text-content">
                            {profile.name && <h2 className="hero-greeting animate-element delay-2">Hi, my name is</h2>}
                            {profile.name && <h1 className="hero-name animate-element delay-3">{profile.name}.</h1>}
                            <h2 className="hero-title animate-element delay-4">{profile.title || "Backend Engineer"}</h2>

                            {/* <div className="hero-cta-buttons animate-element delay-5"> */}
                            {/* <a href="#projects" className="btn btn-primary">View Projects</a> */}
                            {/* <a href="#contact" className="btn btn-secondary">Contact Me</a> */}
                            {profile.resume && (
                                <a href={profile.resume.startsWith('http') ? profile.resume : `http://localhost:3004${profile.resume}`} target="_blank" rel="noreferrer" className="btn btn-outline">Download CV</a>
                            )}
                            {/* </div> */}

                            <div className="social-links-hero animate-element delay-6">
                                {profile.socialLinks?.github && (
                                    <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub">
                                        <Github size={24} />
                                    </a>
                                )}
                                {profile.socialLinks?.linkedin && (
                                    <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                                        <Linkedin size={24} />
                                    </a>
                                )}
                                {profile.email && (
                                    <a href={`mailto:${profile.email}`} className="social-btn" aria-label="Email">
                                        <Mail size={24} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Tech Ticker (Marquee) --- */}
                {profile.skills && profile.skills.length > 0 && (
                    <div className="tech-ticker-container animate-element delay-6">
                        <div className="tech-ticker-scroll">
                            {/* Duplicate the list twice for seamless infinite scrolling */}
                            {[1, 2].map((_, idx) => (
                                <div key={idx} className="tech-ticker-track">
                                    {profile.skills.flatMap((cat: any) => cat.items || []).map((skill: string, i: number) => (
                                        <span key={`${idx}-${i}`} className="ticker-item">
                                            <span className="ticker-dot"></span>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <style>{`
            .hero {
                min-height: 80vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .hero-content {
                display: flex;
                align-items: center;
                gap: 60px;
            }

            /* --- Animations --- */
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                animation: smoothSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .delay-1 { animation-delay: 0.1s; }
            .delay-2 { animation-delay: 0.2s; }
            .delay-3 { animation-delay: 0.3s; }
            .delay-4 { animation-delay: 0.4s; }
            .delay-5 { animation-delay: 0.5s; }
            .delay-6 { animation-delay: 0.6s; }

            @keyframes smoothSlideUp {
                0% {
                    opacity: 0;
                    transform: translateY(30px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            /* ------------------ */

            .hero-text-content {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .hero-greeting {
                color: var(--primary-color);
                font-size: 1.2rem;
                margin-bottom: 1rem;
                font-weight: 400;
                font-family: var(--font-mono);
            }

            .hero-profile-img {
                width: 280px;
                height: 280px;
                border-radius: 50%;
                object-fit: cover;
                border: 4px solid var(--primary-color);
                box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.3);
                transition: transform 0.5s ease, box-shadow 0.5s ease;
            }

            .hero-profile-img:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 40px -10px rgba(59, 130, 246, 0.6);
            }

            @media (max-width: 768px) {
                .hero-content {
                    flex-direction: column;
                    text-align: center;
                    gap: 30px;
                }
                .hero-text-content {
                    align-items: center;
                }
                .hero-profile-img {
                    width: 200px;
                    height: 200px;
                }
            }

            .hero-name {
                font-size: clamp(40px, 8vw, 80px);
                font-weight: 800;
                color: var(--text-heading);
                line-height: 1.1;
                margin-bottom: 15px;
                letter-spacing: -1.5px;
            }

            .hero-title {
                font-size: clamp(24px, 4vw, 40px);
                font-weight: 700;
                color: var(--text-secondary);
                line-height: 1.2;
                margin-bottom: 2.5rem;
                max-width: 700px;
            }

            .hero-cta-buttons {
                display: flex;
                gap: 20px;
                margin-bottom: 2.5rem;
                flex-wrap: wrap;
            }

            .btn-primary {
                background: rgba(59, 130, 246, 0.1);
                color: var(--primary-color);
                border: 1px solid var(--primary-color);
            }

            .btn-secondary {
                background: rgba(255, 255, 255, 0.05);
                color: var(--text-primary);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.2);
                color: #fff;
            }

            .social-links-hero {
                display: flex;
                gap: 20px;
            }

            /* --- Tech Ticker Styles --- */
            .tech-ticker-container {
                width: 100%;
                overflow: hidden;
                background: rgba(17, 24, 39, 0.6);
                border-top: 1px solid rgba(59, 130, 246, 0.1);
                border-bottom: 1px solid rgba(59, 130, 246, 0.1);
                padding: 1rem 0;
                margin-top: 4rem; /* Gap between hero content and ticker */
                position: absolute;
                bottom: 0px;
                left: 0;
                backdrop-filter: blur(10px);
            }

            .tech-ticker-scroll {
                display: flex;
                width: max-content;
                animation: scrollTicker 40s linear infinite;
            }

            .tech-ticker-scroll:hover {
                animation-play-state: paused;
            }

            .tech-ticker-track {
                display: flex;
                align-items: center;
                gap: 3rem;
                padding-right: 3rem; /* Same as gap */
            }

            .ticker-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--text-secondary);
                font-family: var(--font-mono);
                font-size: 1rem;
                white-space: nowrap;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .ticker-dot {
                width: 6px;
                height: 6px;
                background-color: var(--primary-color);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--primary-color);
            }

            @keyframes scrollTicker {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }

            @media (max-width: 768px) {
                .tech-ticker-container {
                    position: relative;
                    margin-top: 2rem;
                }
            }
        `}</style>
        </div>
    );
};

export default Home;
