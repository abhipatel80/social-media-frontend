import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { getConversationAsync } from "../store/conversationSlice";
import { addMessageAsync, getMessageAsync } from "../store/msgSlice";
import { formatTime } from "../utils/formatTime";
import { addMessage } from "../store/msgSlice";
import { io } from "socket.io-client";
import { clearChat, deleteMsg } from "../api/chatapi";
import LazyImage from "./LazyImage";
import UserSkeleton from "./skeletons/UserSkeleton";
import { getSingleUserAsync } from "../store/userSlice";
import { NavLink } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const AllSingleChat = ({ udata }) => {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [message, setmessage] = useState("");
  const [newmessage, setnewmessage] = useState(false);

  // socket connection
  const skt = useRef();
  skt.current = io("ws://localhost:4000");
  const socket = skt.current;

  const dispatch = useDispatch();

  // get data from redux toolkit
  const { conversationData } = useSelector((state) => state.conversation);
  const { messages } = useSelector((state) => state.msg);
  const { singleUser } = useSelector((state) => state.user);

  const receiverId = udata;
  const senderId = localStorage.getItem("userId");
  const type = "text";
  const conversationId = conversationData?._id;

  const formData = {
    senderId,
    receiverId,
    type,
    conversationId,
    text: message,
  };

  // get selected user data
  useEffect(() => {
    dispatch(getSingleUserAsync(udata));
    // eslint-disable-next-line
  }, [udata]);

  // get conversation
  useEffect(() => {
    dispatch(getConversationAsync({ senderId, receiverId }));
    // eslint-disable-next-line
  }, [senderId, receiverId]);

  // get chat messages
  useEffect(() => {
    dispatch(getMessageAsync(conversationId));
    // eslint-disable-next-line
  }, [conversationId, senderId, receiverId, newmessage]);

  // add new message comes from socket
  useEffect(() => {
    setnewmessage(false);
    socket.on("msg", (data) => {
      dispatch(
        addMessage({
          ...data,
          createdAt: Date.now(),
        })
      );
      setnewmessage(true);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [conversationId, newmessage]);

  // send msg to user
  const sendmsg = () => {
    if (message === "") return;
    else {
      setnewmessage(false);
      dispatch(addMessageAsync(formData));
      socket.emit("sendmsg", formData);
      setnewmessage(true);
      setmessage("");
    }
  };

  // online / offline status user
  const handleUserConnected = () => {
    socket.emit("userConnected", senderId);
  };

  useEffect(() => {
    handleUserConnected();
    socket.on("updateOnlineUsers", (onlineUsers) => {
      const isOnline = onlineUsers.includes(udata);
      setOnlineStatus(isOnline);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [conversationId, udata]);

  // delete single message
  const delmsg = async (id) => {
    setnewmessage(false);
    await deleteMsg(id);
    setnewmessage(true);
  };

  // clear chat
  const clearFullChat = async () => {
    setnewmessage(false);
    await clearChat(conversationId);
    setnewmessage(true);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-ful border bg-white flex py-2.5 px-6">
        <NavLink to="/chat" className="flex items-center mr-3 md:hidden">
          <KeyboardBackspaceIcon />
        </NavLink>
        {singleUser?.userImage?.startsWith("https") ? (
          <LazyImage
            src={`${singleUser?.userImage}`}
            alt="user profile"
            className="w-12 h-12 rounded-full cursor-pointer img-cover"
          />
        ) : (
          <UserSkeleton />
        )}
        <div className="ml-4">
          <p className="font-semibold">{singleUser?.username}</p>
          <p className="text-gray-500">{onlineStatus ? "online" : "offline"}</p>
        </div>
        <div className="ml-auto flex items-center">
          <button
            className="bg-blue-500 rounded-md hover:bg-blue-600 text-white py-1.5 px-3"
            onClick={clearFullChat}
          >
            Clear Chat
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-100 h-[32.1rem] overflow-auto">
        {messages?.map((val, i) => {
          return (
            <div key={i}>
              {val.senderId === senderId ? (
                <div
                  className="mr-5 w-fit ml-auto flex items-center"
                  onMouseEnter={() => setShowDeleteIcon(true)}
                  onMouseLeave={() => setShowDeleteIcon(false)}
                >
                  {showDeleteIcon ? (
                    <i
                      className="fa-solid mr-4 fa-trash cursor-pointer"
                      onClick={() => delmsg(val._id)}
                    ></i>
                  ) : (
                    ""
                  )}
                  <p
                    className="bg-blue-500 max-w-[20rem] md:max-w-[30rem] text-white py-1.5 px-2
                   rounded-md my-1.5"
                  >
                    {val.text}
                    <sub className="text-small text-white pl-3">
                      {formatTime(val?.createdAt)}
                    </sub>
                    <sub className="text-small">
                      <i className="fa-solid fa-check ml-1"></i>
                    </sub>
                  </p>
                </div>
              ) : (
                <p className="bg-white w-fit py-1.5 px-2 rounded-md mx-3 my-2">
                  {val.text}
                  <sub className="text-small text-gray-600 pl-3">
                    {formatTime(val?.createdAt)}
                  </sub>
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full border bg-white flex py-3 px-6 mt-auto">
        <div className="ml-4 flex w-full">
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              placeholder="Type a message"
              className="outline-none"
            />
          </div>
          <div className="ml-auto">
            <button
              onClick={sendmsg}
              disabled={message === "" ? true : false}
              className={`${message === "" ? "text-gray-300" : ""}`}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSingleChat;
