/** Base URL for the backend API (no trailing slash). Example: http://localhost:3004 */
export const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '';

/** Default profile photo until a new file is uploaded or a link is pasted. */
export const DEFAULT_PROFILE_IMAGE = '/uploads/image-1771971173338-501230229.jpg';

/** Resolve uploaded/static asset paths against the API origin. */
export function assetUrl(path?: string | null): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Profile image with fallback to the default upload. */
export function profileImageUrl(path?: string | null): string {
    return assetUrl(path || DEFAULT_PROFILE_IMAGE);
}
