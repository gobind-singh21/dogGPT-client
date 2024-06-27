import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Lander() {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <h3 className="landing-header-content">PawGPT</h3>
                <div className="landing-header-nav">
                    <Link to="/login">
                        <button className="header-nav-button">Login</button>
                    </Link>
                    <Link to="/sign-up">
                        <button className="header-nav-button">Sign Up</button>
                    </Link>
                </div>
            </header>
            <div className="landing-container">
                <h1 className="landing-heading">PawGPT</h1>
                <p className="landing-content">Welcome to PawGPT where,</p>
                <b className="landing-content">Dog lives matters</b>
                <div className="nav-buttons">
                    <Link
                        to="/chat"
                        className="nav-button"
                    >
                        Chat with PawGPT
                    </Link>
                    <Link
                        to="/breed-check"
                        className="nav-button"
                    >
                        Identify breed
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Lander;
