// sumit

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const SideBar = ({ hamActive, setHamActive }) => {

    const navigate = useNavigate()
    const currentUser = useSelector(state => state.user)

    const [employee, setEmployee] = useState('');

    const employeeUlElements = [
        {
            name: "Home",
            redirect: "/"
        },
        {
            name: "Analytics",
            redirect: "/analytics"
        },
        {
            name: "Logout",
            redirect: "/logout"
        }
    ]
    const adminUlElements = [
        {
            name: "Home",
            redirect: "/"
        },
        {
            name: "Analytics",
            redirect: "/analytics"
        },
        {
            name: "View All Employees",
            redirect: "/all-emps"
        },
        {
            name: "Logout",
            redirect: "/logout"
        }
    ]
    useEffect(() => {
        const storedEmployee = localStorage.getItem('user');
        if (storedEmployee) {
            setEmployee(JSON.parse(storedEmployee));
        }
        else{
            navigate('/login')
        }
    }, []);

    // if (!employee) {
    //     return <div>Loading...</div>; // or any loading indicator
    // }


    return (
        <div>
            {!hamActive ? (
                <div className='sm:h-[100vh] bg-light-green border-r-2  border-main-green py-3 max-sm:h-auto'>

                    <GiHamburgerMenu
                        title="Open Side Bar"
                        onClick={() => setHamActive(!hamActive)}
                        className=" mx-3  h-10 w-10  text-main-green cursor-pointer "
                    />
                </div>
            ) : (<div>
                <aside className='bg-light-green w-[25%] h-[100vh] border-r-2  border-main-green absolute max-sm:hidden ' >
                    <RxCross2
                        title="Close Side Bar"
                        onClick={() => setHamActive(!hamActive)}
                        className=" m-3 h-7 w-7 cursor-pointer"
                    />
                    <div >
                        <div className='w-100 h-auto flex justify-center items-center flex-col border-b-2 border-main-green p-3'>
                            <img src={"" || "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} className='bg-white h-28 w-28 rounded-full align-center m-3 border-2 border-main-green ' />
                            <h2>{currentUser.loggedInUserData.employeeFullName}</h2>
                            <p className='text-sm text-main-green underline cursor-pointer' onClick={() => { navigate("/profile") }}>View Profile</p>
                        </div>

                        <nav>
                            <ul className='flex flex-col w-100 '>
                                {employee.employeeRole === "admin" ? adminUlElements.map((ele) => (
                                    <li key={ele.name}
                                        onClick={() => { navigate(`${ele.redirect}`) }}
                                        className='p-3 border-b-2 cursor-pointer border-main-green hover:bg-main-green hover:text-white'
                                    >
                                        {ele.name}
                                    </li>
                                )) : employeeUlElements.map((ele) => (
                                    <li key={ele.name}
                                        onClick={() => { navigate(`${ele.redirect}`) }}
                                        className='p-3 border-b-2 cursor-pointer border-main-green hover:bg-main-green hover:text-white'
                                    >
                                        {ele.name}
                                    </li>
                                ))}

                            </ul>
                        </nav>
                    </div>
                </aside>


                {/* for phone view top bar */}
                <aside className='bg-light-green w-[100vw] h-auto border-b-2 border-main-green absolute sm:hidden max-sm:block ' >
                    <RxCross2
                        title="Close Side Bar"
                        onClick={() => setHamActive(!hamActive)}
                        className=" m-3 h-7 w-7 cursor-pointer"
                    />
                    <div className='flex border-t-2 border-main-green'>
                        <div className=' h-auto flex justify-center items-center flex-col border-r-2 border-main-green p-3'>
                            <img src={"" || "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} className='bg-white h-28 w-28 rounded-full align-center m-3 border-2 border-main-green ' />
                            <h2>UserName</h2>
                            <p className='text-sm text-main-blue underline cursor-pointer' onClick={() => { navigate("/profile") }}>View Profile</p>
                        </div>

                        <nav className='w-full'>
                            <ul className='flex flex-col w-full flex-1 '>
                            {employee.employeeRole === "admin" ? adminUlElements.map((ele) => (
                                    <li key={ele.name}
                                        onClick={() => { navigate(`${ele.redirect}`) }}
                                        className='p-3 border-b-2 cursor-pointer border-main-green hover:bg-main-green hover:text-white'
                                    >
                                        {ele.name}
                                    </li>
                                )) : employeeUlElements.map((ele) => (
                                    <li key={ele.name}
                                        onClick={() => { navigate(`${ele.redirect}`) }}
                                        className='p-3 border-b-2 cursor-pointer border-main-green hover:bg-main-green hover:text-white'
                                    >
                                        {ele.name}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>

            </div>
            )}

        </div>
    );
}

export default SideBar;
