import "./index.css";
import RegisterUser from "./components/RegisterUser.jsx";
import { Navigate } from "react-router-dom";

import { useLoaderData } from "react-router-dom";
function App() {
  const UserState = useLoaderData();
  let content;

  if (UserState === true) {
    content = <RegisterUser />;
  } else {
    content = <Navigate to="/Login" replace />;
  }

  return <>{content}</>;
}

export default App;
