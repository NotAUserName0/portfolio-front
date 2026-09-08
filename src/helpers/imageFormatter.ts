import { environment } from '../environment';
import { sanitizeImageUrl } from './sanitizer';

/**
 * @description Formats and sanitizes the full URL for an image asset.
 *              Ensures image sources are safe from malicious protocols,
 *              and that relative image paths always include the 'upload/' prefix,
 *              preventing 403 Forbidden errors when loading images that were stored
 *              without the prefix in legacy database records.
 * @param image The relative file path, filename, or external URL.
 * @returns The fully qualified and sanitized URL pointing to the image resource, or empty string if invalid.
 */
export const formatImageUrl = (image: string | null | undefined): string => {
    const sanitized = sanitizeImageUrl(image);
    if (!sanitized) {
        return '';
    }

    // Return validated external URLs directly
    if (sanitized.startsWith('http://') || sanitized.startsWith('https://')) {
        return sanitized;
    }

    const baseUrl = environment.IS_PRODUCTION ? environment.API_URL : environment.DEV_URL;
    const cleanImage = sanitized.startsWith('/') ? sanitized.substring(1) : sanitized;
    const fullPath = cleanImage.startsWith('upload/') ? cleanImage : `upload/${cleanImage}`;

    return `${baseUrl}/${fullPath}`;
};