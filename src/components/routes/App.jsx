import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

axios.defaults.withCredentials = true;

function App() {

    const navigate = useNavigate();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuthenticated = async () => {
            try {
                const res = await axios.get("http://localhost:3000/auth/check-auth");
                if (res.status !== 200 || !res.data.authenticated) {
                    navigate("/login");
                } else {
                    setIsAuthChecked(true);
                }
            } catch (error) {
                console.log(error);
                navigate("/login")
            }
        }
        checkAuthenticated();
    }, []);

    if (!isAuthChecked) {
        return <center>
            <LoadingSpinner height="6rem" width="6rem" color="black" borderStyle="solid" />
        </center>;
    }

    return (
        <div className="app-container">
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
