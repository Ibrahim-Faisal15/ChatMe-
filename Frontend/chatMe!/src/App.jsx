import "./index.css";
import RegisterUser from "./components/RegisterUser.jsx";
import { Navigate } from "react-router-dom";

import { useLoaderData } from "react-router-dom";
function App() {
  const UserState = useLoaderData();
  let content;

  if (UserState === "register") {
    content = <Navigate to="/Register" />;
  } else {
    content = <Navigate to="/chat-logs" />;
  }

  return <>{content}</>;
}

export default App;
