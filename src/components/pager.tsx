import { useState } from "preact/hooks";
import ChatBot from "@/components/Chatbot";
import type React from "preact/compat";
export default function Home() {
	const [file, setFile] = useState<File>();
	const [filePath, setFilePath] = useState<string>();
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (
		event: React.ChangeEvent<HTMLInputElement> & {
			target: { files: FileList };
		},
	) => {
		if (!event.target?.files?.length) return;
		const selectedFile = event.target.files[0];
		if (selectedFile && selectedFile.type === "application/pdf") {
			setFile(selectedFile);
		} else {
			alert("Please select a PDF file.");
		}
	};

	const handleSubmit = async (event: MouseEvent) => {
		event.preventDefault();
		setLoading(true);
		if (file) {
			const formData = new FormData();
			formData.append("file", file);

			try {
				const response = await fetch("/api/upload", {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const data = await response.json();
					setFilePath(data.filePath); // Assuming the backend returns the file path
					alert(`${data.filePath} uploaded`)
					// setResponse(data.response); // Set the response if needed
				} else {
					alert("Failed to upload file.");
				}
			} catch (error) {
				console.error("Error:", error);
				alert("An error occurred while uploading the file.");
			} finally {
				setLoading(false);
			}
		} else {
			alert("No file selected.");
		}
	};

	return (
		<div className="flex">
			<main className="flex min-h-screen w-[50vw] flex-col items-center justify-center bg-slate-900">
				{filePath ? (
					<object
						className="pdf"
						data={filePath}
						width="600"
						title={filePath}
						height="500"
					/>
				) : (
					<div className="flex flex-col items-center justify-center gap-10 w-[60%] h-[90vh]">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col justify-center items-center w-full h-64 rounded-lg border-2 border-dashed cursor-pointer border-slate-400 bg-slate-800 hover:border-blue-300"
						>
							<div className="flex flex-col justify-center items-center pt-5 pb-6">
								<svg
									className="mb-4 w-8 h-8 text-gray-300 hover:text-gray-600"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500">
									<span className="font-semibold text-gray-300">
										Click to upload
									</span>{" "}
									or drag and drop
								</p>
								<p className="text-xs text-gray-400">PDF</p>
							</div>
							<input
								id="dropzone-file"
								type="file"
								accept="application/pdf"
								onChange={handleFileChange}
								className="hidden"
							/>
						</label>
						{file && (
							<button
								className="px-5 py-3 font-semibold text-white bg-transparent rounded-md border-2 border-slate-400 hover:border-slate-300"
								onClick={handleSubmit}
								type="button"
							>
								{loading ? "Uploading..." : "Submit"}
							</button>
						)}
					</div>
				)}
			</main>
			<ChatBot filePath={filePath} />
		</div>
	);
}
