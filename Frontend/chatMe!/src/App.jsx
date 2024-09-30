import "./index.css"
import RegisterUser from "./components/RegisterUser.jsx"
import { useEffect, useState } from "react"
import LoginUser from "./components/LoginUser.jsx"
import axios from 'axios';



function App() {
  const [IsLoggedIn, changeLoggedIn] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/user/isLoggedIn")
      .then((response) => {
        if (response.data === "Not logged in") {
          changeLoggedIn(false)
        } else {
          changeLoggedIn(true)
        }
      })

  }, [])


  return <>
    {IsLoggedIn ? <RegisterUser /> : <LoginUser />}
  </>
}

export default App;
