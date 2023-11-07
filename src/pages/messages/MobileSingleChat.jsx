import React from "react";
import { useParams } from "react-router-dom";
import AllSingleChat from "../../components/AllSingleChat";

const MobileSingleChat = () => {
  const { id } = useParams();

  return (
    <>
      <AllSingleChat udata={id} />
    </>
  );
};

export default MobileSingleChat;
