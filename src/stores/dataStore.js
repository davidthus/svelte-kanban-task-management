import { writable } from 'svelte/store';
import { themeTypes } from '../constants/themeTypes';
import { firstBoard } from './boardStore';

const initialState = {
	sidebarOpen: true,
	theme: themeTypes.LIGHTTHEME,
	activeBoard: firstBoard
};

export const data = writable(initialState);

export const loadData = () => {
	const loadedData = JSON.parse(localStorage.getItem('data')) || initialState;

	data.set(loadedData);
};
loadData();

data.subscribe((value) => {
	localStorage.setItem('data', JSON.stringify(value));
});

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
