import { Avatar } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
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
  const [user_name, setUsername] = useState("");
  const [status, setStatus] = useState("inactive");
  const [isChatClicked, setIsChatClicked] = useState(false);
  const [clearChatUI, setClearChatUI] = useState("hidden");
  const [clearChatLog, setClearChatLog] = useState("");
  const [user_message, setUser_message] = useState("");
  const [Server_message, setServer_message] = useState();

  useEffect(() => {
    axios
      .get("/api/v1/user/get-all-chatLogs", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          // console.log("Chat logs retrieved:", response.data);
          const username = response.data.data.username;
          setUsername(username);
          socket.connect();
          socket.on("connect", () => {
            setStatus("active");
            axios
              .post("/api/v1/user/set-status", {
                username: username,
                status: status,
              })
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
          });
        }
      })
      .catch((err) => {
        // console.error("Error occurred:", err)
        navigate("/Register");
      });
  }, []);

  useEffect(() => {
    axios.get("/api/v1/user/fetch-user_messages")
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.error("Error occurred:", err)
      })

  }, [])

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("New message received:", message);
      setServer_message(message);
      const messageBody = document.querySelector(".chat-body")
      const messageContainer = document.createElement("div");
      messageContainer.innerText = message
      messageBody.appendChild(messageContainer);


    });

    return () => {
      socket.disconnect();
    }
  }, [])





  const fetchChats = () => {
    // if (window.innerWidth < 768) {
    //   document.querySelector(".chatLogs").classList.toggle("hidden", true);
    //   document.querySelector(".chat").classList.toggle("hidden", false);
    //   document.querySelector(".chat").classList.add("w-screen");
    //   document
    //     .querySelector(".chat")
    //     .classList.add("flex items-center justify-center text-2xl font-medium");
    setIsChatClicked(true);
    setClearChatLog("hidden")
    setClearChatUI("block")

  };

  const func2 = () => {

    if (window.innerWidth < 768) {
      //   console.log(123);
      //   document.querySelector(".chatLogs").classList.toggle("hidden", false);
      //   document.querySelector(".chat").classList.toggle("hidden", true);
      //   document.querySelector(".chat").classList.add("w-screen");
      //   document
      //     .querySelector(".chat")
      //     .classList.add("flex items-center justify-center text-2xl font-medium");
      // }
      setIsChatClicked(false)
      setClearChatLog("block")
      setClearChatUI("hidden")
    }
  }

  return (
    <>
      <div className="AllChats h-screen flex">
        <div className={`chatLogs bg-white w-screen md:w-[35vw] md:block ${clearChatLog}`}>
          <div className="header flex justify-between items-center h-[10vh]  border-b-2 border-black">
            <div className="profile-photo px-4 flex items-center">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <div className="username text-[1.2em] font-bold pl-2">{user_name}</div>
            </div>
            <div className="Chat-config-btns flex justify-evenly w-32 ">

              <Button variant="filled" className="w-2 flex justify-center bg-black">
                GitHub
              </Button>
            </div>
          </div>

          <div className="All-Chat-Logs h-[80vh]">
            <div
              className="Chat-instance  !important hover:bg-gray-400 active:bg-gray-400 focus-visible:bg-gray-400 border-b-2 border-black flex h-[8vh] items-center cursor-pointer"
              onClick={() => {
                fetchChats();
              }}
            >
              <div className="image pl-3">
                {" "}
                <Avatar
                  src="../../public/Group_Chat profile.jpg"
                  alt="avatar"
                />
              </div>
              <div className="information pl-5">
                <div className="username text-lg font-bold">Sheldon</div>
                <div className="last-user_message">We'll meet at 5...</div>
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
          className={`chat border-black border-1 md:w-[65vw]   ${clearChatUI} md:block  ${isChatClicked ? `${clearChatUI} w-[100vw] bg-blue-gray-50 ` : "md:flex md:justify-center md:items-center md:text-2xl md:font-bold md:bg-gray-500"}`}

        >
          {isChatClicked ? <>  <div className="header   h-[10vh] border-b-2 border-black flex justify-between  items-center ">
            <div className="profile-pic-and-username flex items-center">
              <div className="chat-picture  px-4 flex items-center">
                <Avatar
                  src="../../public/Group_Chat profile.jpg"
                  alt="avatar"
                ></Avatar>
              </div>
              <div className="chat-name text-[1.2em] font-bold pl-2">
                Group Chat
              </div>
            </div>
            <div className="Chat-config-btns flex  w-32 ">
              <Button variant="filled" className=" flex justify-center bg-black w-[5vw] ml-5 " onClick={() => {
                func2();
              }}>
                Back
              </Button>
            </div>

          </div>
            <div className="chat-body h-[80vh]">



            </div>
            <div className="user_message-sender h-[10vh] border-t-2 border-black flex items-center px-4">
              <div className="relative flex justify-center items-center w-[35rem] md:w-[50rem]">
                <Input
                  type="text"
                  label="Type your user_message"
                  onChange={(e) => {
                    setUser_message(e.target.value)

                  }}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  onClick={() => {
                    socket.emit("msg", user_message)
                  }}
                  size="sm"
                  // color={email ? "gray" : "blue-gray"}
                  // disabled={!email}
                  className="!absolute right-1 top-1 rounded"

                >
                  SEND
                </Button>

              </div>
            </div></> : "Click a chat and have fun...."}
        </div>
      </div >
    </>
  );
}

export default ChatLogs;
