const ShowTitle = ({ title, category }) => {
	return (
		<div className="column is-three-quarters">
			<h4 className="title is-4 mb-0">{title}</h4>
			<p className="is-size-5">{category}</p>
		</div>
	);
};

export default ShowTitle;
