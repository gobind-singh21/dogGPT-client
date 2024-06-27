import { useState } from "react";
import axios from "axios";

const ImageInput = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        if (!imageFile) {
            alert("Select an image File first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios.post(
                "http://localhost:3000/breed-check",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Upload successful", response);
        } catch (error) {
            alert("Error in uploading image");
            console.log(error);
        }
    };

    return (
        <form
            className="image-input-form"
            onSubmit={handleOnSubmit}
        >
            <div className="mb-3">
                <label
                    htmlFor="formFile"
                    className="form-label"
                >
                    Select image File
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={handleFileChange}
                />
            </div>
            {imagePreview && (
                <div className="mb-3">
                    <img
                        src={imagePreview}
                        alt="Selected Preview"
                        style={{ maxHeight: "400px", width: "auto" }}
                    />
                </div>
            )}
            <button
                type="submit"
                className="btn btn-primary"
            >
                Upload
            </button>
        </form>
    );
};

export default ImageInput;
