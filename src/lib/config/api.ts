import { env } from '$env/dynamic/public';

export const API_URL = env.PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
export const STRIPE_KEY = env.PUBLIC_STRIPE_KEY; 