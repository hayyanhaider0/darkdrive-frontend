import { useState, useEffect } from "react";
import axios from "axios";
import KeyModal from "../components/KeyModal";
import FileUpload from "../components/FileUpload";
import { Download, Loader, Lock, Trash2 } from "lucide-react";

const Dashboard = () => {
	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [downloadError, setDownloadError] = useState("");

	const BACKEND_URL = import.meta.env.VITE_BACKEND;
	const API_URL = `${BACKEND_URL}/api/files`;

	const handleDelete = async (file) => {
		setDownloadError("loading");
		try {
			const response = await axios.delete(`${API_URL}/${file.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
			});
			console.log(response.data);

			setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id));
			setDownloadError("");
			setShowDeleteModal(false);
		} catch (err) {
			console.log("Error deleting file: ", err);
		}
	};

	const downloadFile = async (password, file) => {
		setDownloadError("loading");
		try {
			const response = await axios.get(`${API_URL}/download/${file.id}`, {
				params: {
					password: password,
				},
				responseType: "blob",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`, // JWT for auth
				},
			});

			// Create a Blob from the response data
			const blob = new Blob([response.data], { type: "application/octet-stream" });

			// Create a download link and click it
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.setAttribute("download", file.fileName);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link); // Cleanup

			// Close modal after successful download
			setDownloadError("");
			setShowModal(false);
		} catch (err) {
			// in this case the user entered the wrong pass
			setDownloadError("Download failed, please check password.");
		}
	};

	useEffect(() => {
		const getUserFiles = async () => {
			try {
				const response = await axios.get(`${API_URL}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				});

				console.log(response.data);
				setFiles(response.data);
			} catch (err) {
				console.error("Error fetching files: ", err.response?.data || err.message);
			}
		};

		getUserFiles();
	}, []);

	const handleDownloadClick = (file) => {
		if (file.locked) {
			setSelectedFile(file);
			setShowModal(true);
		} else {
			downloadFile("", file);
		}
	};

	const handleDeleteClick = (file) => {
		setSelectedFile(file);
		setShowDeleteModal(true);
	};

	return (
		<>
			{showModal && (
				<KeyModal
					type='Download'
					text='Enter the encryption key'
					onSubmit={(password) => downloadFile(password, selectedFile)}
					closeModal={() => setShowModal(false)}
					status={downloadError}
				/>
			)}
			{showDeleteModal && (
				<KeyModal
					type='Delete'
					text='Do you want to delete this file?'
					closeModal={() => setShowDeleteModal(false)}
					onSubmit={() => handleDelete(selectedFile)}
					status={downloadError}
				/>
			)}
			<main className='flex flex-col md:flex-row md:flex-grow mt-22'>
				<section className='flex flex-col flex-grow'>
					<FileUpload setFilesList={setFiles} />
				</section>
				<section className='p-6 md:w-5/6'>
					<ul className='max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col gap-2 border-gray-700'>
						{files.length > 0 ? (
							files.map((file, index) => (
								<li
									key={index}
									className='flex w-full justify-between bg-white/10 p-2 px-4 rounded-md hover:bg-white/5 transition'
								>
									<p className='flex-1 truncate pr-2'>{file.fileName}</p>
									<div className='flex gap-4'>
										{file.locked && <Lock />}
										<button
											title='Download'
											onClick={() => handleDownloadClick(file)}
											className={`${
												downloadError === "loading" ? "cursor-not-allowed" : "cursor-pointer"
											} w-fit p-0 bg-transparent text-accent underline`}
										>
											{downloadError === "loading" ? <Loader /> : <Download />}
										</button>
										<button
											onClick={() => handleDeleteClick(file)}
											title='Delete'
											className='p-0 bg-transparent text-red-600'
										>
											<Trash2 />
										</button>
									</div>
								</li>
							))
						) : (
							<p className='text-lg font-bold'>Upload and securely store your files.</p>
						)}
					</ul>
				</section>
			</main>
		</>
	);
};

export default Dashboard;
