import { useEffect } from 'react';
import axios from 'axios';
import { profileImageUrl } from '../config/api';

function setFavicon(href: string) {
    const selectors = ["link[rel='icon']", "link[rel='shortcut icon']"];
    let link = document.querySelector(selectors.join(',')) as HTMLLinkElement | null;

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.type = 'image/jpeg';
    link.href = href;

    let apple = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement | null;
    if (!apple) {
        apple = document.createElement('link');
        apple.rel = 'apple-touch-icon';
        document.head.appendChild(apple);
    }
    apple.href = href;
}

/** Loads the profile image and uses it as the browser tab favicon. */
export function useProfileFavicon() {
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await axios.get('/api/profile');
                const image = res.data?.[0]?.image;
                if (cancelled) return;
                setFavicon(profileImageUrl(image));
            } catch (error) {
                console.error('Failed to set favicon from profile image:', error);
                if (!cancelled) {
                    setFavicon(profileImageUrl(null));
                }
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);
}
