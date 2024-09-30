import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "./components/LoginUser.jsx";
import RegisterUser from "./components/RegisterUser.jsx";

async function IsUserLoggedIn() {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/user/isLoggedIn");
    if (response.status === 200) {
      if (response.data === "Not logged in") {
        return false;
      } else {
        return true;
      }
    }
    throw new Error("Request failed with status " + response.status);
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
    path: "/Login",
    element: <LoginUser></LoginUser>,
  },
  {
    path: "/Register",
    element: <RegisterUser></RegisterUser>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
