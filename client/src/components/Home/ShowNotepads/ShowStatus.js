const ShowStatus = ({ items }) => {
	return (
		<div className="column is-one-quarter">
			<p className="is-size-5">
				{items.length} {items.length === 1 ? "Task" : "Tasks"}
			</p>
		</div>
	);
};

export default ShowStatus;
