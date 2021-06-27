const ShowContent = ({ created, items }) => {
	return (
		<div>
			<p className="is-size-5">{created}</p>
			<p className="is-size-5">{items.length} notes</p>
		</div>
	);
};

export default ShowContent;
