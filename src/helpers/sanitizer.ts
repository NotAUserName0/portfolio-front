/**
 * Helper de sanitización y seguridad para URLs de imágenes, enlaces externos y navegación.
 * Previene vulnerabilidades de Cross-Site Scripting (DOM XSS), inyección de protocolos (ej. javascript:)
 * y ataques de Reverse Tabnabbing.
 */

const DANGEROUS_PROTOCOLS = /^(javascript|vbscript|data|file):/i;
const ALLOWED_HTTP_PROTOCOLS = ['http:', 'https:'];
const ALLOWED_NAV_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

/**
 * Valida y sanitiza una URL o nombre de archivo de imagen.
 * Solo permite protocolos seguros (http, https) o rutas relativas de backend seguras,
 * neutralizando inyecciones de protocolos maliciosos (javascript:, vbscript:, data:svg)
 * y ataques de path traversal (..).
 *
 * @param image Ruta relativa, nombre de archivo o URL externa de la imagen.
 * @returns Cadena sanitizada o string vacío si no es segura.
 */
export const sanitizeImageUrl = (image: string | null | undefined): string => {
    if (!image || typeof image !== 'string') {
        return '';
    }

    const trimmed = image.trim();

    if (!trimmed) {
        return '';
    }

    // Bloquear explícitamente protocolos peligrosos
    if (DANGEROUS_PROTOCOLS.test(trimmed)) {
        return '';
    }

    // Verificar si es una URL absoluta HTTP o HTTPS
    if (/^https?:\/\//i.test(trimmed)) {
        try {
            const parsed = new URL(trimmed);
            if (ALLOWED_HTTP_PROTOCOLS.includes(parsed.protocol)) {
                return parsed.href;
            }
            return '';
        } catch {
            return '';
        }
    }

    // Bloquear caracteres de control o intentos de path traversal en rutas relativas
    if (trimmed.includes('..') || /[\r\n\t\0<>"']/.test(trimmed)) {
        return '';
    }

    // Eliminar barra inicial si existe para mantener coherencia en rutas relativas
    const cleanPath = trimmed.startsWith('/') ? trimmed.substring(1) : trimmed;

    return cleanPath;
};

/**
 * Sanitiza una URL para navegación en elementos <a> o redirecciones.
 * Previene la ejecución de scripts al hacer clic en enlaces no confiables (ej. href="javascript:...").
 *
 * @param url URL de destino a validar.
 * @param fallback URL segura por defecto en caso de enlace inválido (default: '#').
 * @returns URL sanitizada o el fallback seguro.
 */
export const sanitizeUrl = (url: string | null | undefined, fallback = '#'): string => {
    if (!url || typeof url !== 'string') {
        return fallback;
    }

    const trimmed = url.trim();

    if (!trimmed) {
        return fallback;
    }

    // Permitir anclas internas seguras (#profile, #proyects, etc.)
    if (/^#[a-zA-Z0-9_-]*$/.test(trimmed)) {
        return trimmed;
    }

    // Bloquear esquemas peligrosos
    if (DANGEROUS_PROTOCOLS.test(trimmed)) {
        return fallback;
    }

    try {
        const base = typeof window !== 'undefined' && window.location ? window.location.origin : 'http://localhost';
        const parsed = new URL(trimmed, base);
        if (ALLOWED_NAV_PROTOCOLS.includes(parsed.protocol)) {
            return trimmed;
        }
        return fallback;
    } catch {
        return fallback;
    }
};

/**
 * Abre de forma segura una URL externa en una nueva pestaña.
 * Valida el protocolo para evitar XSS y especifica 'noopener,noreferrer'
 * para mitigar ataques de Reverse Tabnabbing (acceso indebido a window.opener).
 *
 * @param url URL externa a abrir.
 */
export const openSafeExternalUrl = (url: string | null | undefined): void => {
    const safeUrl = sanitizeUrl(url, '');
    if (!safeUrl || safeUrl === '#') {
        return;
    }

    // Solo abrir URLs web externas (http / https) en nueva pestaña
    if (/^https?:\/\//i.test(safeUrl)) {
        window.open(safeUrl, '_blank', 'noopener,noreferrer');
    }
};
