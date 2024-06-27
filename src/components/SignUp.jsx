import { useContext, useRef, useState } from "react";
import { AuthContext } from "./store/UserProvider";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const SignUp = () => {

    const { signup } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null)
    const [showImageSelectPopup, setShowImageSelectPopup] = useState(false);
    const [errors, setErrors] = useState({
        userName: false,
        userEmail: false,
        userPassword: false
    });

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (!file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    };

    const handleOnSignUp = (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log("Form submit start")
        const userName = nameRef.current.value.trim();
        const userEmail = emailRef.current.value.trim().toLowerCase();
        const userPassword = passwordRef.current.value.trim();

        let validationErrors = {
            userName: userName === "",
            userEmail: userEmail.length < 3 || !userEmail.includes('@'),
            userPassword: userPassword <= 8
        };
        setErrors(() => validationErrors);
        if (validationErrors.userName || validationErrors.userEmail || validationErrors.userPassword) {
            if (!imageFile) {
                setShowImageSelectPopup(true);
                setTimeout(() => {
                    setShowImageSelectPopup(false);
                }, 1000);
            }
            setIsLoading(false);
            return;
        }
        const authFormData = new FormData();
        authFormData.append('profileImage', imageFile);
        authFormData.append('userName', userName);
        authFormData.append('userEmail', userEmail);
        authFormData.append('userPassword', userPassword);
        signup(authFormData);
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        console.log("Form submitted");
        setIsLoading(false);
    };

    return <>
        <form className="auth-form" onSubmit={handleOnSignUp}>
            <h1 className="h1 mb-3 fw-normal">Create account</h1>

            <div className={`form-floating w-50 ${errors.userName ? "has-error" : ""}`}>
                <input ref={nameRef} autoComplete="off" type="text" className="form-control" id="floatingName" placeholder="User name" />
                <label htmlFor="floatingName">User name*</label>
            </div>
            <div className={`form-floating w-50 ${errors.userEmail ? "has-error" : ""}`}>
                <input ref={emailRef} autoComplete="off" type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                <label htmlFor="floatingEmail">Email address*</label>
            </div>
            <div className={`form-floating w-50 ${errors.userPassword ? "has-error" : ""}`}>
                <input ref={passwordRef} autoComplete="off" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password*</label>
            </div>
            <div className="mb-3">
                <label
                    htmlFor="formFile"
                    className="form-label"
                >
                    Select your profile photo*
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
                    <img src={imagePreview} alt="Selected profile picture" style={{ maxHeight: "400px", width: "auto" }} />
                </div>
            )}
            <button className="btn btn-primary w-20 py-2" type="submit">Sign Up</button>
            <Link to="/login">Login to your account</Link>
        </form>
        <Modal show={isLoading} centered>
            <Modal.Body className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
        <Modal show={showImageSelectPopup} centered>
            <Modal.Body className="text-center">
                <h4>Please fill the required fields</h4>
            </Modal.Body>
        </Modal>
    </>
}

export default SignUp;