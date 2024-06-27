// import { useContext, useRef, useState } from "react";
import { useContext, useRef } from "react";
import { MessageListContext } from "./store/MessageProvider";
import { IoIosSend } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";

const InputField = () => {
    const { addMessage, fetchingReply } = useContext(MessageListContext);
    // const [textareaHeight, setTextareaHeight] = useState("auto");
    // const [textareaOverflowY, setTextareaOverflowY] = useState("hidden");
    const userInputRef = useRef();

    const adjustTextareaHeight = (element) => {
        const maxHeight = 200;
        const currentHeight = element.scrollHeight;
        const lineHeight = parseInt(
            window.getComputedStyle(element).lineHeight
        );
        const rows = Math.ceil(currentHeight / lineHeight);
        if (rows * lineHeight > maxHeight) {
            // setTextareaHeight(() => `${maxHeight}px`);
            // setTextareaOverflowY(() => "scroll");
            element.style.height = `${maxHeight}px`;
            element.style.overflowY = "scroll";
        } else {
            // setTextareaHeight(() => `${currentHeight}`);
            // setTextareaOverflowY(() => "hidden");
            element.style.height = "auto";
            element.style.overflowY = "hidden";
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            handleSubmit(event);
        }
    };

    const handleChange = (event) => {
        adjustTextareaHeight(event.target);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInput = userInputRef.current.value.trim();
        if (userInput !== "" && !fetchingReply) {
            const date = new Date().getTime();
            addMessage({
                sender: localStorage.getItem("userName"),
                messagetext: userInputRef.current.value,
                messagetimestamp: date,
            });
            userInputRef.current.value = "";
            e.target.style.height = "auto";
            e.target.style.overflowY = "hidden";
        }
    };

    return (
        <form
            className="input-form"
            onSubmit={handleSubmit}
        >
            <div className="input-container">
                <textarea
                    className="textarea"
                    ref={userInputRef}
                    // style={{
                    //     height: textareaHeight,
                    //     overflowY: textareaOverflowY
                    // }}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type something..."
                />
                <button
                    type="submit"
                    className="submit-button"
                >
                    {fetchingReply && (
                        <LoadingSpinner
                            height="2rem"
                            width="2rem"
                            color="white"
                            borderStyle="dashed"
                        />
                    )}
                    {!fetchingReply && <IoIosSend />}
                </button>
            </div>
        </form>
    );
};

export default InputField;
