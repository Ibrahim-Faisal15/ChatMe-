import { Avatar } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  protocols: ["websocket"],
  autoConnect: false,
});

function ChatLogs() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("inactive");

  useEffect(() => {
    axios
      .get("/api/v1/user/get-all-chatLogs", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          // console.log("Chat logs retrieved:", response.data);
          setUsername(response.data.data.username);

        }
      })
      .catch((err) => {
        // console.error("Error occurred:", err)
        navigate("/Register");
      });
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      setStatus("active");
      axios
        .post("/api/v1/user/set-status", {
          username: username,
          status: status
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    });
  }, []);

  const func = () => {
    if (window.innerWidth < 768) {
      document.querySelector(".chatLogs").classList.toggle("hidden", true);
      document.querySelector(".chat").classList.toggle("hidden", false);
      document.querySelector(".chat").classList.add("w-screen");
      document
        .querySelector(".chat")
        .classList.add("flex items-center justify-center text-2xl font-medium");
    }
  };

  const func2 = () => {
    if (window.innerWidth < 768) {
      console.log(123);
      document.querySelector(".chatLogs").classList.toggle("hidden", false);
      document.querySelector(".chat").classList.toggle("hidden", true);
      document.querySelector(".chat").classList.add("w-screen");
      document
        .querySelector(".chat")
        .classList.add("flex items-center justify-center text-2xl font-medium");
    }
  };

  return (
    <>
      <div className="AllChats h-screen flex">
        <div className="chatLogs bg-brown-100 w-screen md:w-[35vw] md:block ">
          <div className="header flex justify-between items-center h-[10vh]  border-b-2 border-black">
            <div className="profile-photo px-4 flex items-center">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <div className="username text-[1.2em] font-bold pl-2">{username}</div>
            </div>
            <div className="Chat-config-btns flex justify-evenly w-32 ">
              <Button variant="filled" className="w-2 flex justify-center  bg-black">
                1
              </Button>
              <Button variant="filled" className="w-2 flex justify-center bg-black">
                2
              </Button>
            </div>
          </div>

          <div className="All-Chat-Logs h-[80vh]">
            <div
              className="Chat-instance  !important hover:bg-gray-400 active:bg-gray-400 focus-visible:bg-gray-400 border-b-2 border-black flex h-[8vh] items-center cursor-pointer"
              onClick={() => {
                func();
              }}
            >
              <div className="image pl-3">
                {" "}
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                />
              </div>
              <div className="information pl-5">
                <div className="username text-lg font-bold">Sheldon</div>
                <div className="last-message">We'll meet at 5...</div>
              </div>
            </div>
          </div>
          <div className="footer h-[10vh] border-t-2 border-black flex items-center px-4 ">
            <Button
              variant="filled"
              className="flex justify-center bg-black"
              onClick={() => {
                axios
                  .get("api/v1/user/logout")
                  .then((response) => {
                    navigate("/login");
                  })
                  .catch((error) => {
                    console.error("Error occurred:", error);
                  });
              }}
            >
              Logout!
            </Button>
          </div>
        </div>
        <div
          className="chat border-black border-2 bg-gray-600 hidden md:flex md:items-center md:justify-center md:text-2xl md:font-medium md:w-[65vw]"
          onClick={() => {
            func2();
          }}
        >
          Select a chat and have fun
        </div>
      </div>
    </>
  );
}

export default ChatLogs;
