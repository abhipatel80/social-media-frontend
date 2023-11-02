import React from 'react'
import { NavLink } from 'react-router-dom'
import ExploreIcon from '@mui/icons-material/Explore';

const MobileMenu = () => {
    const id = localStorage.getItem("userId");
    return (
        <>
            <div className="flex justify-items-center">
                <div
                    className="main-menu mobile-menu flex justify-between w-screen px-4 py-2 absolute bg-white font-semibold"
                >
                    <NavLink to="/">
                        <div className="menu-mobile">
                            <i className="fa-solid fa-house"></i>
                        </div>
                    </NavLink>
                    <NavLink to="/explore">
                        <div className="menu-mobile">
                            <ExploreIcon />
                        </div>
                    </NavLink>
                    <NavLink to="/addpost">
                        <div className="menu-mobile">
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </NavLink>
                    <NavLink to="/chat">
                        <div className="menu-mobile">
                            <i className="fa-solid fa-comment"></i>
                        </div>
                    </NavLink>
                    <NavLink to={`/profile/${id}`}>
                        <div className="menu-mobile">
                            <i className="fa-solid fa-user"></i>
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default MobileMenu
