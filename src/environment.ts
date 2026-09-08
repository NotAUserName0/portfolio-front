const env = import.meta.env;

export const environment = {
    API_URL: env.VITE_API_URL ?? 'http://localhost:8081',
    DEV_URL: env.VITE_DEV_URL ?? 'http://localhost:8081',
    IS_PRODUCTION: String(env.VITE_IS_PRODUCTION).toLowerCase() === 'true'
} as const;