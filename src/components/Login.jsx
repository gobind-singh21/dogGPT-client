import { useContext, useRef, useState } from "react";
import { AuthContext } from "./store/UserProvider";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const userEmail = emailRef.current.value.trim();
        const userPassword = passwordRef.current.value.trim();
        if (userEmail.length > 3 && userEmail.includes("@") && userPassword !== "") {
            const userCredentialObject = {
                userEmail,
                userPassword
            };
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setIsLoading(true);
            try {
                await login(userCredentialObject);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <>
            <form className="auth-form" onSubmit={handleOnSubmit}>
                <h1 className="h1 mb-3 fw-normal">Login</h1>

                <div className="form-floating w-50">
                    <input ref={emailRef} autoComplete="off" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating w-50">
                    <input ref={passwordRef} autoComplete="off" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-20 py-2" type="submit">Login</button>
                <Link to="/sign-up">Create an account</Link>
            </form>

            <Modal show={isLoading} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;
