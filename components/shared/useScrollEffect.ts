import { useState, useEffect } from 'react';

export function useScrollEffect() {
    const [scrollY, setScrollY] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // More efficient scroll handler with throttling via requestAnimationFrame
    useEffect(() => {
        setIsMounted(true);

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate transform values based on scroll
    const opacity = Math.max(0, 1 - scrollY / 300);
    const y = Math.min(100, scrollY / 3);
    const scale = Math.max(0.9, 1 - scrollY / 3000);

    return { scrollY, isMounted, opacity, y, scale };
}
