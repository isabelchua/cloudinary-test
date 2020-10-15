import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";

function Gallery() {
	const [imageIds, setImageIds] = useState();

	const loadImages = async () => {
		try {
			const res = await fetch("/api/images");
			const data = await res.json();
			console.log(data);
			setImageIds(data);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		loadImages();
	}, []);
	return (
		<div>
			<h1 className="title">Home</h1>
			{imageIds &&
				imageIds.map((imageId, index) => (
					<Image
						key={index}
						cloudName="isabelchua"
						publicId={imageId}
						width="300"
						crop="scale"
					/>
				))}
		</div>
	);
}

export default Gallery;
