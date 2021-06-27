const ShowStatus = ({ items }) => {
	return (
		<div className="column is-one-quarter">
			<p className="is-size-5">{items.length} Notes</p>
		</div>
	);
};

export default ShowStatus;
