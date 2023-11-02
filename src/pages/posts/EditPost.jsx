import React, { useEffect, useState } from 'react'
import { editPostAsync, getSinglePostAsync } from '../../store/postSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const EditPost = () => {
    const { id } = useParams();

    const [caption, setcaption] = useState();
    const { error, singlePost } = useSelector(state => state.post);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSinglePostAsync(id));
        // eslint-disable-next-line
    }, [id]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        if (!token) {
            navigate("/auth/login")
        }
        // eslint-disable-next-line
    }, [token])


    const submit = (e) => {
        e.preventDefault();
        dispatch(editPostAsync({ caption, id }));
        if (typeof error !== "string") {
            return navigate("/")
        }
    };

    return (
        <>
            <div className='bg-gray-50 flex items-center justify-center pt-20 h-screen'>
                <form className='shadow-lg px-10 min-w-[10rem] rounded-md py-7 bg-white' onSubmit={submit}>
                    <p className='text-red-600'>{typeof error === "string" ? error : ""}</p>
                    <div className='inputs'>
                        <label htmlFor='Caption'>Caption</label>
                        <textarea type="text" className='input resize-none' rows="3" cols="40" onChange={(e) => setcaption(e.target.value)} placeholder='Caption' name="caption" id="caption" defaultValue={singlePost?.caption} />
                    </div>
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-md cursor-pointer mt-4'>Edit Post</button>
                </form>
            </div>
        </>
    )
}

export default EditPost