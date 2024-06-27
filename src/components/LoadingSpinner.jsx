import propTypes from "prop-types";

function LoadingSpinner({ height, width, color, borderStyle }) {
    return (
        <center>
            <div
                className="spinner-border spinner"
                style={{
                    width: width,
                    height: height,
                    border: `5px ${borderStyle} ${color}`,
                }}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </center>
    );
}

LoadingSpinner.propTypes = {
    height: propTypes.string.isRequired,
    width: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
    borderStyle: propTypes.string.isRequired,
};

export default LoadingSpinner;
