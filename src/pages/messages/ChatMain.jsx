import React, { useEffect } from 'react'
import AllChat from './AllChat'
import SingleChat from './SingleChat'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmptyChat from './EmptyChat';

const ChatMain = () => {

  const { singleUser } = useSelector(state => state.user);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login")
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className='flex h-screen'>
      <div className='w-[30%]'>
        <AllChat />
      </div>
      <div className='w-[70%]'>
        {Object.keys(singleUser).length >= 1 ?
          <SingleChat udata={singleUser} />
          : <EmptyChat />
        }
      </div>
    </div>
  )
}

export default ChatMain
