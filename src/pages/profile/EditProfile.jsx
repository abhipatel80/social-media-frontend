import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { change } from '../../utils/change';
import { editUserAsync, getSingleUserAsync } from '../../store/userSlice';

const EditPost = () => {

    const { singleUser } = useSelector(state => state.user);

    const [userImage, setuserImage] = useState();
    const [input, setinput] = useState({
        username: singleUser?.username,
        email: singleUser?.email,
        bio: singleUser?.bio
    });

    const formData = new FormData();
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("bio", input.bio);
    formData.append("userImage", userImage);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.user);

    const submit = (e) => {
        e.preventDefault();
        dispatch(editUserAsync(formData))
        if (typeof error !== "string") {
            return navigate("/profile")
        }
    };

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getSingleUserAsync(userId));
        if (!token) {
            navigate("/auth/login")
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <div className='bg-gray-100 flex items-center pt-20 justify-center h-full'>
            <form className='shadow-lg px-10 min-w-[10rem] rounded-md py-7 bg-white' onSubmit={submit}>
                <p className='text-red-600'>{typeof error === "string" ? error : ""}</p>
                <div className='inputs'>
                    <label htmlFor='username'>Username</label>
                    <input type="text" required className='input' defaultValue={singleUser?.username} onChange={(e) => change(e, setinput)} placeholder='username' name="username" id="username" />
                </div>
                <div className='inputs'>
                    <label htmlFor='Email'>Email</label>
                    <input type="email" required className='input' defaultValue={singleUser?.email} onChange={(e) => change(e, setinput)} placeholder='Email' name="email" id="email" />
                </div>
                <div className='inputs'>
                    <label htmlFor='image'>User Image</label>
                    <input type="file" required className='input' onChange={(e) => setuserImage(e.target.files[0])} name="image" id="image" />
                </div>
                <div className='inputs'>
                    <label htmlFor='bio'>Bio (optional)</label>
                    <textarea type="text" className='input resize-none' defaultValue={singleUser?.bio} onChange={(e) => change(e, setinput)} placeholder='Bio (optional)' name="bio" id="bio" />
                </div>
                <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-md cursor-pointer mt-4'>Edit Profile</button>
            </form>
        </div>
    )
}

export default EditPost
