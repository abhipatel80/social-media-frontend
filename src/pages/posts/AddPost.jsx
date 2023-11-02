import React, { useEffect, useState } from 'react'
import { addPostAsync } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AddPost = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { error } = useSelector(state => state.post);

  const [postImage, setpostImage] = useState();
  const [caption, setcaption] = useState();

  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("postImage", postImage);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    if (!token) {
      navigate("/auth/login")
    }
    // eslint-disable-next-line
  }, [token]);

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(addPostAsync(formData));
    if (typeof error !== "string") {
      return navigate("/")
    }
  };

  return (
    <>
      <div className='bg-gray-50 flex items-center justify-center lg:pt-20 h-screen w-full'>
        <form className='shadow-lg px-10 min-w-[10rem] rounded-md py-7 bg-white' onSubmit={submit}>
          <p className='text-red-600'>{typeof error === "string" ? error : ""}</p>
          <div className='inputs'>
            <label htmlFor='Caption'>Caption</label>
            <textarea type="text" className='input resize-none' rows="3" cols="40" onChange={(e) => setcaption(e.target.value)} placeholder='Caption' name="caption" id="caption" />
          </div>
          <div className='inputs'>
            <label htmlFor='Profile img'>Post Image</label>
            <input type="file" className='input' onChange={(e) => setpostImage(e.target.files[0])} name="image" id="image" />
          </div>
          <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-md cursor-pointer mt-4'>Add Post</button>
        </form>
      </div>
    </>
  )
}

export default AddPost
