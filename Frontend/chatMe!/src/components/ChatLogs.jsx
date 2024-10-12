import { Avatar } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChatLogs() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/user/get-all-chatLogs", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          console.log("Chat logs retrieved:", response.data)
        }
      })
      .catch((err) => {
        // console.error("Error occurred:", err)
        navigate("/Register");
      });
  }, []);

  const func = () => {
    if (window.innerWidth < 768) {
      document.querySelector(".chatLogs").classList.toggle("hidden", true);
      document.querySelector(".chat").classList.toggle("hidden", false);
      document.querySelector(".chat").classList.add("w-screen");
    }
  };

  const func2 = () => {
    if (window.innerWidth < 768) {
      console.log(123);
      document.querySelector(".chatLogs").classList.toggle("hidden", false);
      document.querySelector(".chat").classList.toggle("hidden", true);
      document.querySelector(".chat").classList.add("w-screen");
    }
  };

  return (
    <>
      <div className="AllChats h-screen flex">
        <div
          className="chatLogs bg-brown-100 w-screen md:w-[35vw] md:block "
          onClick={() => {
            console.log(123);
          }}
        >
          <div className="header flex justify-between items-center h-[10vh]  border-b-2 border-black">
            <div className="profile-photo px-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
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
          <div className="All-Chat-Logs h-[80vh]">Chats</div>
          <div className="footer h-[10vh] border-t-2 border-black flex items-center px-4 ">
            <Button variant="filled" className="flex justify-center bg-black">
              Logout!
            </Button>
          </div>
        </div>
        <div
          className="chat border-black border-2 bg-red-900 hidden     md:block md:w-[65vw]"
          onClick={() => {
            func2();
          }}
        >
          CHATS
        </div>
      </div>
    </>
  );
}

export default ChatLogs;
