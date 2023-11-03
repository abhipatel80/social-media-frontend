import React from "react";
import Dialog from "./dialogs/Dialog";
import { useSelector } from "react-redux";

const MyPost = () => {
  const { myPosts } = useSelector((state) => state.post);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 md:h-auto">
        {myPosts?.map((val) => {
          return <Dialog key={val._id} val={val}  />;
        })}
      </div>
    </div>
  );
};

export default MyPost;
