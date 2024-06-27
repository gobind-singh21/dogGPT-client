import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { RiRobot3Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageListContext } from "./store/MessageProvider";
import Modal from 'react-bootstrap/Modal';

function MessageBox({ sender, messagetext, messagetimestamp, children }) {
    const [copied, setCopied] = useState(false);
    const { removeMessage } = useContext(MessageListContext);
    const [deletePopup, setDeletePopup] = useState(false);

    let alignmentClass = "";
    let isServer = sender === "PawGPT";
    if (isServer) {
        alignmentClass = "left";
    } else {
        alignmentClass = "right";
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(messagetext).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy the text to clipboard: ", err);
        });
    };

    const handleDelete = () => {
        setDeletePopup(false);
        removeMessage(messagetimestamp, sender);
    }

    return (
        <>
            <div className={alignmentClass}>
                <div className="sender-info">
                    <div className="sender-icon">
                        {isServer && <RiRobot3Fill />}
                        {!isServer && <FaUserAlt />}
                    </div>
                    <p className="sender">{sender}</p>
                </div>
                <div className={`message ${alignmentClass}`}>
                    {children ? (
                        children
                    ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {messagetext}
                        </ReactMarkdown>
                    )}
                </div>
                <div className="message-options">
                    <div className="message-option" onClick={() => setDeletePopup(true)}>
                        <MdOutlineDeleteOutline />
                    </div>
                    <div className="message-option" onClick={handleCopy}>
                        {copied ? <AiOutlineCheck /> : <BsCopy />}
                    </div>
                </div>
            </div>
            <Modal show={deletePopup} centered>
                <Modal.Body className="text-center">
                    <h3>Delete Message</h3>
                    <p>Are you sure you want to delete this message</p>
                    <button className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
                    <button className="btn btn-light m-2" onClick={() => setDeletePopup(false)}>Cancel</button>
                </Modal.Body>
            </Modal>
        </>
    );
}

MessageBox.propTypes = {
    sender: PropTypes.string.isRequired,
    messagetext: PropTypes.string.isRequired,
    messagetimestamp: PropTypes.string,
    children: PropTypes.any,
};

export default MessageBox;
