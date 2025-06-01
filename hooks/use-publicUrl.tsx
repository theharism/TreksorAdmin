
export function usePublicUrl() {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://31.97.13.169:8080';
    return baseUrl;
}
