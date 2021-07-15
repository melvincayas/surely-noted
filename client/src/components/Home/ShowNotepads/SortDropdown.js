import classes from "../../../styles/Home/ShowNotepads.module.css";

const SortDropdown = ({ sortValue, onChangeHandler }) => {
	return (
		<select
			value={sortValue}
			onChange={onChangeHandler}
			name="sort"
			className={`mb-5 ml-2 ${classes["sort-dropdown"]}`}
		>
			<option value="recent">Recently Updated</option>
			<option value="newest">Newest</option>
			<option value="ascending">Name: A-Z</option>
			<option value="descending">Name: Z-A</option>
		</select>
	);
};

export default SortDropdown;
