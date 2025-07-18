// src/lib/stores/user.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initial = browser 
  ? (localStorage.getItem('nombre') ?? '') 
  : '';

export const nombre = writable<string>(initial);

if (browser) {
  nombre.subscribe((value) => {
    if (value) {
      localStorage.setItem('nombre', value);
    } else {
      localStorage.removeItem('nombre');
    }
  });
}
