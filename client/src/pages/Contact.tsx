import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Contact = () => {
    return (
        <div className="section contact-section">
            <ScrollReveal>
                <div className="container text-center">
                    <h2 className="heading">Get In Touch</h2>
                    <p className="contact-text">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <a href="mailto:admin@example.com" className="btn contact-btn">
                        Say Hello
                    </a>
                </div>
            </ScrollReveal>

            <style>{`
        .contact-section {
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .text-center {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .contact-text {
            max-width: 600px;
            color: var(--text-secondary);
            font-size: 1.1rem;
            margin-bottom: 3rem;
        }

        .contact-btn {
            padding: 1.25rem 1.75rem;
            font-size: 1rem;
        }
      `}</style>
        </div>
    );
};

export default Contact;
