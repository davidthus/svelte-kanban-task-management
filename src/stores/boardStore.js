import data from '$src/data/data.json';
import { writable } from 'svelte/store';
export const boards = writable([]);

export const loadTodos = () => {
	const loadedBoards = JSON.parse(localStorage.getItem('boards')) || data.boards;

	boards.set(loadedBoards);
};
loadTodos();

boards.subscribe((value) => {
	localStorage.setItem('boards', value);
});

export function addBoard(boardName) {
	boards.update((prev) => [...prev, { boardName, columns: [] }]);
}

export function deleteBoard(index) {
	boards.update((prev) => prev.filter((_, currentBoardIndex) => currentBoardIndex !== index));
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
