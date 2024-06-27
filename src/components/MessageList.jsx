import { useContext, useEffect, useRef } from "react";
import { MessageListContext } from "./store/MessageProvider";
import MessageBox from "./MessageBox";
import LoadingSpinner from "./LoadingSpinner";

function MessageList() {
    const { messages, fetchingReply, setMessages } = useContext(MessageListContext);
    const messageListRef = useRef();

    useEffect(() => {
        setMessages();
    }, []);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            className="message-list"
            ref={messageListRef}
        >
            {messages.map((message) => (
                <MessageBox
                    key={message.messagetimestamp}
                    sender={message.sender}
                    messagetext={message.messagetext}
                    messagetimestamp={message.messagetimestamp}
                />
            ))}
            {fetchingReply && (
                <MessageBox
                    key={new Date().getTime()}
                    sender="PawGPT"
                    messagetext=""
                >
                    <LoadingSpinner
                        height="2rem"
                        width="2rem"
                        color="white"
                        borderStyle="dashed"
                    />
                </MessageBox>
            )}
        </div>
    );
}

export default MessageList;
