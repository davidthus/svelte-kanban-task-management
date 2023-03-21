import data from '$src/data/data.json';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export const boards = persist(writable(data.boards), createLocalStorage(), 'boards');

export function addBoard(boardName) {
	boards.update((prev) => [...prev, { boardName, columns: [] }]);
}

export function addColumn(columnName, boardIndex) {
	boards.update((prev) =>
		prev.map((board, currentBoardIndex) => {
			if (currentBoardIndex === boardIndex) {
				board.columns = [...board.columns, { name: columnName, tasks: [] }];
			}
			return board;
		})
	);
}

export function addTask(newTask, boardIndex, columnIndex) {
	boards.update((prev) =>
		prev.map((board, currentBoardIndex) => {
			if (currentBoardIndex === boardIndex) {
				return board.columns.map((column, currentColumnIndex) => {
					if (currentColumnIndex === columnIndex) {
						column.tasks = [...column.tasks, newTask];
					}
					return column;
				});
			}
			return board;
		})
	);
}

export function updateBoard(updatedBoard, index) {
	boards.update((prev) =>
		prev.map((board, currentBoardIndex) => {
			if (currentBoardIndex === index) {
				return updatedBoard;
			}
			return board;
		})
	);
}

// columns dont get updated, boards can either delete or add them, or tasks can be added to them or deleted

export function updateTask(updatedTask, boardIndex, columnIndex, oldColumnIndex, taskIndex) {
	boards.update((prev) =>
		prev.map((board, currentBoardIndex) => {
			let taskStatusChanged = false;
			if (currentBoardIndex === boardIndex) {
				return board.columns.map((column, currentColumnIndex) => {
					if (currentColumnIndex === oldColumnIndex && currentColumnIndex === columnIndex) {
						column.tasks[taskIndex] = updatedTask;
					} else if (currentColumnIndex === columnIndex) {
						column.tasks = [...column.tasks, updatedTask];
						taskStatusChanged = true;
					}

					return column;
				});
			}

			if (taskStatusChanged) {
				board.columns[oldColumnIndex].splice(taskIndex, 1);
			}

			return board;
		})
	);
}

export function deleteBoard(index) {
	boards.update((prev) => prev.filter((_, currentBoardIndex) => currentBoardIndex !== index));
}

export function deleteTask(boardIndex, columnIndex, taskIndex) {
	boards.update((prev) =>
		prev.map((board, currentBoardIndex) => {
			if (currentBoardIndex === boardIndex) {
				return board.columns.map((column, currentColumnIndex) => {
					if (currentColumnIndex === columnIndex) {
						column.tasks.filter((task, currentTaskIndex) => currentTaskIndex !== taskIndex);
					}
					return column;
				});
			}
			return board;
		})
	);
}
