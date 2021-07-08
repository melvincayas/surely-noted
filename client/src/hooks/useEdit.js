import { useState } from "react";

const useEdit = contentToEdit => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(contentToEdit);

	const editStatusHandler = () => {
		setIsEditing(prevIsEditing => !prevIsEditing);
		if (isEditing) setEditedContent(contentToEdit);
	};

	const editContentHandler = event => {
		setEditedContent(event.target.value);
	};

	return {
		isEditing,
		setIsEditing,
		editedContent,
		editStatusHandler,
		editContentHandler,
	};
};

export default useEdit;
