import Header from "./Header";
import InputField from "./InputField";
import MessageList from "./MessageList";
import { MessagesProvider } from "./store/MessageProvider";

function ChatWindow() {
    return (
        <div className="chat-window">
            <MessagesProvider>
                <Header header="Chat" />
                <MessageList />
                <InputField />
            </MessagesProvider>
        </div>
    );
}

export default ChatWindow;
