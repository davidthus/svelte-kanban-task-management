import { writable } from 'svelte/store';
import { themeTypes } from '../constants/themeTypes';
import { boards } from './boardStore';

const initialState = {
	sidebarOpen: true,
	theme: themeTypes.LIGHTTHEME,
	activeBoard: boards.subscribe((value) => value)[0].name || null
};
export const data = writable(initialState);

export const loadData = () => {
	const loadedBoards = JSON.parse(localStorage.getItem('data')) || initialState;

	data.set(loadedBoards);
};
loadData();

data.subscribe((value) => {
	localStorage.setItem('data', value);
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
