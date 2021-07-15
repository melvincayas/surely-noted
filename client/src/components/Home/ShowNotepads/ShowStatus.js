const ShowStatus = ({ items }) => {
	const completedTasks = items.filter(task => task.complete);

	return (
		<div className="column is-one-quarter">
			<p className="title is-4 mb-0">
				{items.length} {items.length === 1 ? "Task" : "Tasks"}
			</p>
			<p className="is-size-5">{completedTasks.length} Done</p>
		</div>
	);
};

export default ShowStatus;
