import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    exp: number;
    [key: string]: any;
}

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isTokenValid = (): boolean => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.exp > Date.now() / 1000;
    } catch (error) {
        return false;
    }
};

export const getUsernameFromToken = (): string | null => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.username;
    } catch (error) {
        return null;
    }
};

export const getUserIdFromToken = (): string | null => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

