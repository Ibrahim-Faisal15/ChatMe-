import { useEffect } from "react";
import "./index.css";
import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";


function App() {


  const UserState = useLoaderData();
  let content;

  if (UserState === "register") {
    content = <Navigate to="/Register" />;
  } else {
    content = <Navigate to="/chats" />;
  }

  return <>{content}</>;
}

export default App;
