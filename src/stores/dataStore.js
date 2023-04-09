import { writable } from 'svelte/store';
import { themeTypes } from '../constants/themeTypes';

const initialState = {
	sidebarOpen: true,
	theme: themeTypes.DARKTHEME
};

export const data = writable(initialState);

export const loadData = () => {
	const loadedData = JSON.parse(localStorage.getItem('data')) || initialState;
	const activeBoard = JSON.parse(localStorage.getItem('boards'))[0].name || data.boards[0].name;

	if (loadedData?.activeBoard) {
		data.set(loadedData);
	} else {
		data.set({ ...loadedData, activeBoard });
	}
};
loadData();

data.subscribe((value) => {
	localStorage.setItem('data', JSON.stringify(value));
});

export function toggleSidebar() {
	data.update((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
}

export function toggleTheme() {
	data.update((prev) => ({
		...prev,
		theme: prev.theme === 1 ? themeTypes.DARKTHEME : themeTypes.LIGHTTHEME
	}));
}

export function toggleActiveBoard(newActiveBoard) {
	data.update((prev) => ({ ...prev, activeBoard: newActiveBoard }));
}
