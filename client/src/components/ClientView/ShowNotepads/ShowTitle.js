const ShowTitle = ({ title, category }) => {
	return (
		<div>
			<h4 className="title is-4">{title}</h4>
			<p className="is-size-5">{category}</p>
		</div>
	);
};

export default ShowTitle;
