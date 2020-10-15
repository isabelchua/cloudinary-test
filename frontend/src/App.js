import React, { useState } from "react";
import Gallery from "./Gallery";

function App() {
	const [file, setFile] = useState("");
	const [preview, setPreview] = useState("");

	const handleFile = e => {
		const file = e.target.files[0];
		previewFile(file);
	};

	const handleSubmitFile = e => {
		e.preventDefault();
		if (!preview) return;
		uploadImage(preview);
	};

	const previewFile = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreview(reader.result);
		};
	};

	const uploadImage = async base64EncodedImage => {
		console.log(base64EncodedImage);
		try {
			await fetch("/user", {
				method: "POST",
				body: JSON.stringify({ data: base64EncodedImage })
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="App">
			<h1>Upload</h1>
			<form onSubmit={handleSubmitFile} className="form">
				<input
					type="file"
					name="image"
					onChange={handleFile}
					value={file}
					className="form-input"
					id=""
				/>
				<button className="btn" type="submit">
					Submit
				</button>
				{preview && (
					<img src={preview} alt="chosen" style={{ height: "240px" }} />
				)}
			</form>
			<Gallery />
		</div>
	);
}

export default App;
