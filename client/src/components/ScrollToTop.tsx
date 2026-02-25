import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    <ArrowUp size={24} />
                </button>
            )}
            <style>{`
                .scroll-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background-color: var(--primary-color);
                    color: var(--bg-color);
                    border: none;
                    border-radius: 50%;
                    padding: 12px;
                    cursor: pointer;
                    z-index: 999;
                    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .scroll-to-top:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 15px rgba(59, 130, 246, 0.5);
                }
            `}</style>
        </>
    );
};

export default ScrollToTop;
