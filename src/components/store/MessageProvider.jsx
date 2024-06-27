import { createContext, useReducer, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";

const MessageListContext = createContext({
    messages: [],
    fetchingReply: false,
    fetchingMessage: false,
    addMessage: () => { },
    setMessages: () => { },
    removeMessage: () => { },
});

function messageReducer(currMessages, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            return [...currMessages, action.payload.message];
        case "ADD_MESSAGES":
            return action.payload.messages;
        case "REMOVE_MESSAGE":
            return currMessages.filter((message) => message.messagetimestamp !== action.payload.messagetimestamp || message.sender !== action.payload.sender);
        case "DELETE_LAST_MESSAGE":
            return currMessages.slice(0, -1);
        default:
            return currMessages;
    }
}


const MessagesProvider = ({ children }) => {
    const [messages, dispatchMessage] = useReducer(messageReducer, []);
    const [fetchingReply, setFetching] = useState(false);
    const [fetchingMessages, setFetchingMessages] = useState(false);

    const setMessages = async () => {
        try {
            setFetchingMessages(true);
            const response = await axios.get("http://localhost:3000/chat/get-messages");
            response.data.sent.forEach((message) => {
                message.sender = localStorage.getItem("userName");
            });
            response.data.received.forEach((message) => {
                message.sender = "PawGPT";
            });

            const combinedMessages = [...response.data.sent, ...response.data.received];
            combinedMessages.sort((message1, message2) => message1.messagetimestamp - message2.messagetimestamp);

            const addMessagesActionIem = {
                type: "ADD_MESSAGES",
                payload: {
                    messages: combinedMessages
                }
            };
            dispatchMessage(addMessagesActionIem);
            setFetchingMessages(false);
        } catch (error) {
            setFetchingMessages(false);
            console.log(error);
            alert("Failed to fetch your messages try again");
        }
    }

    const addMessage = async (newMessage) => {

        const addMessageActionItem = {
            type: "ADD_MESSAGE",
            payload: {
                message: newMessage,
            },
        };
        dispatchMessage(addMessageActionItem);
        setFetching(true);
        try {
            const res = await axios.post("http://localhost:3000/chat/message", newMessage, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            const replyActionItem = {
                type: "ADD_MESSAGE",
                payload: {
                    message: {
                        sender: "PawGPT",
                        messagetext: res.data.response,
                        messagetimestamp: res.data.timestamp,
                    },
                },
            };
            dispatchMessage(replyActionItem);
            setFetching(false);
        } catch (error) {
            console.log(error);
            setFetching(false);
            alert("Error occured!");
            const deleteLastActionItem = {
                type: "DELETE_LAST_MESSAGE",
            };
            dispatchMessage(deleteLastActionItem);
        }
    }

    const removeMessage = async (messagetimestamp, sender) => {
        try {
            const res = await axios.delete("http://localhost:3000/chat/delete-message/" + messagetimestamp + "/" + sender);
            if (res.status === 200 && res.data.success) {
                const removeMessageActionItem = {
                    type: "REMOVE_MESSAGE",
                    payload: {
                        messagetimestamp,
                        sender
                    },
                };
                dispatchMessage(removeMessageActionItem);
            } else {
                console.log(res);
                alert("Message deletion failed");
            }
        } catch (error) {
            alert("Message deletion failed");
            console.log(error);
        }
    }

    return (
        <MessageListContext.Provider
            value={{ messages, fetchingReply, fetchingMessages, addMessage, setMessages, removeMessage }}
        >
            {children}
        </MessageListContext.Provider>
    );
};

MessagesProvider.propTypes = {
    children: propTypes.any,
};

export { MessagesProvider, MessageListContext };
