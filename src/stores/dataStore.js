import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';
import { themeTypes } from '../constants/themeTypes';
// import { boards } from './boardStore';

const initialState = {
	sidebarOpen: true,
	theme: themeTypes.LIGHTTHEME,
	activeBoard: 'Platform Launch'
};

export const data = persist(writable(initialState), createLocalStorage(), 'data');

export function toggleSidebar() {
	data.update((prev) => ({ ...prev, sidebarOpen: prev.sidebarOpen ? true : false }));
}

export function toggleTheme() {
	data.update((prev) => ({
		...prev,
		theme: themeTypes === 1 ? themeTypes.DARKTHEME : themeTypes.LIGHTTHEME
	}));
}

export function toggleActiveBoard(newActiveBoard) {
	data.update((prev) => ({ ...prev, activeBoard: newActiveBoard }));
}
