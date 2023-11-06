import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserAsync,
  getSearchAsync,
  getSingleUserAsync,
} from "../../store/userSlice";
import { addConversationAsync } from "../../store/conversationSlice";
import LazyImage from "../../components/LazyImage";
import UserSkeleton from "../../components/skeletons/UserSkeleton";
import { url } from "../../api/userapi";

const AllChat = () => {
  const { allUsers, searchUsers } = useSelector((state) => state.user);

  const [search, setsearch] = useState("");

  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getAllUserAsync());
    // eslint-disable-next-line
  }, []);

  const addConversation = (rid) => {
    dispatch(addConversationAsync({ senderId: id, receiverId: rid }));
    dispatch(getSingleUserAsync(rid));
    // eslint-disable-next-line
  };

  const searchUser = (e) => {
    setsearch(e.target.value);
    dispatch(getSearchAsync(search));
  };

  const data =
    search !== "" ? (searchUsers ? searchUsers : []) : allUsers ? allUsers : [];

  return (
    <div className="w-full border h-screen lg:p-3 p-1">
      <div className="flex">
        <NavLink to="/" className="flex">
          <KeyboardBackspaceIcon />
          <p className="ml-2 font-semibold">Back</p>
        </NavLink>
      </div>
      <div className="py-3">
        <input
          className="w-full text-sm border outline-none rounded-md py-1.5 px-3"
          type="search"
          placeholder="Search or start a new chat"
          onChange={searchUser}
        />
      </div>
      <div className="h-[31rem] overflow-auto all-chats">
        {data &&
          data?.map((val, i) => {
            return (
              <div key={i}>
                {val._id === id ? (
                  ""
                ) : (
                  <NavLink
                    to={window.innerWidth <= 768 ? `/chat/${val._id}` : ""}
                  >
                    <div
                      className="flex w-full items-center my-3 mt-0 lg:p-2.5 rounded-md cursor-pointer hover:bg-gray-100"
                      onClick={() => addConversation(val._id)}
                    >
                      <div className="mr-4">
                        {val.userImage.startsWith("https") ? (
                          <LazyImage
                            src={`${val.userImage}`}
                            alt="user profile"
                            className="w-12 h-12 rounded-full img-cover"
                          />
                        ) : (
                          <UserSkeleton />
                        )}
                      </div>
                      <div className="mr-2">
                        <h2 className="text-sm font-semibold">
                          {val.username}
                        </h2>
                        <p className="text-gray-500 text-sm">Interwave</p>
                      </div>
                      <div className="text-xs text-gray-500 ml-auto">
                        <p>24-10-2023</p>
                      </div>
                    </div>
                  </NavLink>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllChat;
