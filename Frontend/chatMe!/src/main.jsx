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
      // console.log(response.typeof, response.data === "Not logged in")
      if (response.data.message === "Not logged in") {
        return "register";
      } else {
        return "login";
      }
    }
    throw new Error("Request failed with status " + response.status);
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}





<Headers></Headers>

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
