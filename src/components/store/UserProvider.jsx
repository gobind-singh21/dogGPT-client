import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import propTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

Axios.defaults.withCredentials = true;

const AuthContext = createContext({
    login: () => { },
    signup: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [errorOccured, setErrorOccured] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const login = async (userCredentials) => {
        try {
            const res = await Axios.post("http://localhost:3000/auth/login", userCredentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res);
            if (res.data.userName) {
                localStorage.setItem("userName", res.data.userName);
                navigate("/chat");
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
            setErrorOccured(true);
            setTimeout(() => {
                setErrorOccured(false);
                setErrorMessage("");
            }, 3000);
        }
    }

    const signup = async (authFormData) => {
        try {
            const res = await Axios.post("http://localhost:3000/auth/sign-up", authFormData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res);
            if (res.data.userName) {
                localStorage.setItem("userName", res.data.userName);
                navigate("/chat");
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setErrorOccured(true);
            setTimeout(() => {
                setErrorOccured(false);
                setErrorMessage("");
            }, 3000);
            console.log(error);
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return <AuthContext.Provider value={{
        login,
        signup,
        logout,
    }}>
        {children}
        <Modal show={errorOccured} centered>
            <Modal.Header>
                <Modal.Title style={{ color: "Red" }}>
                    Error occured
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
                {errorMessage}
            </Modal.Body>
        </Modal>
    </AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: propTypes.any
};

export default AuthProvider;
export { AuthContext };