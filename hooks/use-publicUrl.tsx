
export function usePublicUrl() {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://treksor.com';
    return baseUrl;
}
