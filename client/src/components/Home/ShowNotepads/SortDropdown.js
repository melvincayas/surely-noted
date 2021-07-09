const SortDropdown = () => {
	return (
		<select name="sort" className="mb-5 ml-2">
			<option value="asc">Name: A-Z</option>
			<option value="desc">Name: Z-A</option>
		</select>
	);
};

export default SortDropdown;
