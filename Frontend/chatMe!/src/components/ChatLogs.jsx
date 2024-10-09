import { ShoppingBagIcon, UserCircleIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function ChatLogs() {
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
          className="chatLogs border-black border-2 bg-green-800 w-screen md:w-[35vw] md:block "
          onClick={() => {
            func();
          }}
        >
          CHAT-LOGS
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
