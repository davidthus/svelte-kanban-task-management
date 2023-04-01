export function subtasksCompleted(task) {
	const completedLength = task.subtasks.filter((subtask) => subtask.isCompleted).length;
	return `${completedLength} of ${task.subtasks.length}`;
}
