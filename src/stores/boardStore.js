import { writable } from 'svelte/store';
import data from '../data/data.json';

export const boards = writable([]);

export const loadBoards = () => {
	const loadedBoards = JSON.parse(localStorage.getItem('boards')) || data.boards;
	boards.set(loadedBoards);
};
loadBoards();

boards.subscribe((value) => {
	localStorage.setItem('boards', JSON.stringify(value));
});

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
				board.columns = board.columns.map((column, currentColumnIndex) => {
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
				board.columns = board.columns.map((column, currentColumnIndex) => {
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
				board.columns[oldColumnIndex].tasks.splice(taskIndex, 1);
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
				board.columns = board.columns.map((column, currentColumnIndex) => {
					if (currentColumnIndex === columnIndex) {
						column.tasks = column.tasks.filter(
							(task, currentTaskIndex) => currentTaskIndex !== taskIndex
						);
					}
					return column;
				});
			}
			return board;
		})
	);
}

export function changeTaskStatus(task, boardIndex, columnIndex, oldColumnIndex, taskIndex) {
	boards.update((prev) =>
		prev.map((board, currentBoardIndex) => {
			let taskStatusChanged = false;
			let newColumns;
			if (currentBoardIndex === boardIndex) {
				newColumns = board.columns.map((column, currentColumnIndex) => {
					// START OF CODE BLOCK
					const taskStatusChangedToCurrentColumn =
						columnIndex !== oldColumnIndex && columnIndex === currentColumnIndex;

					if (taskStatusChangedToCurrentColumn) {
						taskStatusChanged = true;
						return { ...column, tasks: [...column.tasks, { ...task, status: column.name }] };
					}

					return column;
					// END OF CODE BLOCK
				});
			}

			if (taskStatusChanged) {
				return {
					name: board.name,
					columns: newColumns.map((newColumn, currentNewColumn) => {
						// removes the old task from old column if tasks did indeed change
						if (currentNewColumn === oldColumnIndex) {
							return {
								...newColumn,
								tasks: newColumn.tasks.filter(
									(task, currentTaskIndex) => currentTaskIndex !== taskIndex
								)
							};
						}
						return newColumn;
					})
				};
			}

			return board;
		})
	);
}

export function toggleSubtask(
	subtaskIndex,
	taskIndex,
	boardIndex,
	columnIndex,
	currentSubtaskState
) {
	boards.update((prev) =>
		prev.map((board, currentBoardIndex) => {
			if (currentBoardIndex === boardIndex) {
				board.columns = board.columns.map((column, currentColumnIndex) => {
					if (currentColumnIndex === columnIndex) {
						column.tasks = column.tasks.map((task, currentTaskIndex) => {
							if (currentTaskIndex === taskIndex) {
								task.subtasks = task.subtasks.map((subtask, currentSubtaskIndex) => {
									if (currentSubtaskIndex === subtaskIndex) {
										subtask.isCompleted = !currentSubtaskState;
									}
									return subtask;
								});
							}

							return task;
						});
					}

					return column;
				});
			}

			return board;
		})
	);
}
