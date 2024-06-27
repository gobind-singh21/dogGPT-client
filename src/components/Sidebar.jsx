import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import propTypes from "prop-types";

function Sidebar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let chatClass = "", breedClass = "";
    const location = useLocation();
    if (location.pathname === "/chat") {
        chatClass = "active";
    } else if (location.pathname === "/breed-check") {
        breedClass = "active";
    }

    return (
        <>
            <button
                className="btn btn-primary d-md-none"
                type="button"
                onClick={handleShow}
                aria-controls="offcanvasSidebar"
            >
                Open Sidebar
            </button>

            <div
                className={`offcanvas offcanvas-start text-bg-dark d-md-none ${show ? "show" : ""}`}
                id="offcanvasSidebar"
                tabIndex="-1"
                aria-labelledby="offcanvasSidebarLabel"
                style={{ width: "250px" }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasSidebarLabel">PawGPT</h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Close"
                        onClick={handleClose}
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <SidebarContent handleClose={handleClose} chatClass={chatClass} breedClass={breedClass} />
                </div>
            </div>

            <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "20%" }}>
                <SidebarContent handleClose={handleClose} chatClass={chatClass} breedClass={breedClass} />
            </div>
        </>
    );
}

const SidebarContent = ({ handleClose, chatClass, breedClass }) => (
    <>
        <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            onClick={handleClose}
        >
            <svg
                className="bi pe-none me-2"
                width="40"
                height="32"
            >
                <use xlinkHref="#bootstrap"></use>
            </svg>
            <span className="fs-4">PawGPT</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <Link
                    to="/chat"
                    className={`nav-link text-white ${chatClass}`}
                    aria-current="page"
                    onClick={handleClose}
                >
                    <svg
                        className="bi pe-none me-2"
                        width="16"
                        height="16"
                    >
                        <use xlinkHref="#home"></use>
                    </svg>
                    Chat
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/breed-check"
                    className={`nav-link text-white ${breedClass}`}
                    onClick={handleClose}
                >
                    <svg
                        className="bi pe-none me-2"
                        width="16"
                        height="16"
                    >
                        <use xlinkHref="#speedometer2"></use>
                    </svg>
                    Identify Breed
                </Link>
            </li>
        </ul>
        <hr />
        <div className="dropdown">
            <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                />
                <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser">
                <li>
                    <a className="dropdown-item" href="#">
                        New project...
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Settings
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Profile
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Sign out
                    </a>
                </li>
            </ul>
        </div>
    </>
);

SidebarContent.propTypes = {
    handleClose: propTypes.any.isRequired,
    chatClass: propTypes.any.isRequired,
    breedClass: propTypes.any.isRequired,
};

export default Sidebar;
