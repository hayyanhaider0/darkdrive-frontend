import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND;
const API_URL = `${BACKEND_URL}/api/files`;

export const uploadFile = async (file, password) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("password", password);

	const response = await axios.post(`${API_URL}/upload`, formData, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("userToken")}`,
		},
	});

	if (response.status !== 200) {
		throw new Error("Upload failed");
	}

	return response.data;
};
