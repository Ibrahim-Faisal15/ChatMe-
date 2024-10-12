import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "./components/LoginUser.jsx";
import ChatLogs from "./components/ChatLogs.jsx";
import RegisterUser from "./components/registerUser.jsx";

async function IsUserLoggedIn() {
  try {
    const response = await axios.get("api/v1/user/isLoggedIn", { withCredentials: true });
    if (response.status === 200) {
      // console.log(response.typeof, response.data === "Not logged in")
      if (response.data.message === "Not logged in") {
        return "register";
      } else {
        return "login";
      }
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: IsUserLoggedIn,
  },
  {
    path: "/Register",
    element: <RegisterUser></RegisterUser>,
  },
  {
    path: "/Login",
    element: <LoginUser></LoginUser>,
  },
  {
    path: "/chats",
    element: <ChatLogs></ChatLogs>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
