import { writable } from 'svelte/store';
import { modalTypes } from '../constants/modalTypes';

export const modalInfo = writable({
	isModalOpen: false,
	modalType: modalTypes.VIEWTASK,
	details: {
		taskIndex: null,
		columnIndex: null,
		boardIndex: null
	}
});

export function openModal({ modalType, details }) {
	modalInfo.set({
		isModalOpen: true,
		modalType,
		details
	});
}

export function closeModal() {
	modalInfo.set({
		isModalOpen: false,
		modalType: modalTypes.VIEWTASK,
		details: {
			taskIndex: null,
			columnIndex: null,
			boardIndex: null
		}
	});
}

export function changeModalDetails(details) {
	console.log(details);
	modalInfo.update((prev) => ({
		...prev,
		details
	}));
}
