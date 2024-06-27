import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/routes/App.jsx";
import Lander from "./components/Lander.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import ImageUploadWindow from "./components/ImageUploadWindow.jsx";
import Login from "./components/Login.jsx";
import "./index.css";
import SignUp from "./components/SignUp.jsx";
import AuthProvider from "./components/store/UserProvider.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Lander />
    },
    {
        path: "/login",
        element: <AuthProvider>
            <Login />
        </AuthProvider>
    },
    {
        path: "/sign-up",
        element: <AuthProvider>
            <SignUp />
        </AuthProvider>
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/chat",
                element: <ChatWindow />
            },
            {
                path: "/breed-check",
                element: <ImageUploadWindow />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
