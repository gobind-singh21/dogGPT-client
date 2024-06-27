import propTypes from "prop-types";

function Header({ header }) {
    return (
        <header
            className="p-3 text-bg-dark"
            style={{ height: "10%", width: "100%" }}
        >
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                    <div
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                        style={{ marginLeft: "30rem" }}
                    >
                        <h1
                            className="fs-4"
                            style={{ textAlign: "center", marginBottom: "0px" }}
                        >
                            {header}
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    header: propTypes.string.isRequired,
};

export default Header;
