import { env } from '$env/dynamic/public';
import { dev } from '$app/environment';

// En desarrollo, usar proxy de Vite. En producción, usar la URL completa
export const API_URL = dev 
  ? '/api'  // Proxy de Vite redirige a localhost:8000
  : (env.PUBLIC_API_URL || 'http://127.0.0.1:8000/api');
  
export const STRIPE_KEY = env.PUBLIC_STRIPE_KEY; 