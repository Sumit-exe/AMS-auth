import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [hamActive, setHamActive] = useState(false);
    const [editProfileModal, seteditProfileModal] = useState(false);

    const currentUser = useSelector(state => state.user);
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        // Retrieve the token and user data from local storage
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if no user data is found
            navigate('/login');
        }
    }, [navigate]);

    const [employee, setEmployee] = useState({
        employeeFullName: '',
        employeeEmail: '',
        employeePhoneNo: '',
        employeeAadhar: '',
        employeeAvatar: ''
    });

    useEffect(() => {
        if (user) {
            setEmployee({
                employeeFullName: user.employeeFullName,
                employeeEmail: user.employeeEmail,
                employeePhoneNo: user.employeePhoneNo,
                employeeAadhar: user.employeeAadhar,
                employeeAvatar: user.employeeAvatar
            });
        }
    }, [user]);

    const handleEditProfile = (e) => {
        e.preventDefault();
        // Handle profile update logic here

        localStorage.setItem('user', JSON.stringify(employee));
    };

    return (
        <div className='w-full flex justify-between max-sm:flex-col'>
            <div>
                <SideBar hamActive={hamActive} setHamActive={setHamActive} />
            </div>
            <div className={`${hamActive ? 'w-[75%] max-sm:w-full' : 'w-full'} h-[100vh] flex p-3 flex-col items-center`}>
                <div className='w-full h-full flex justify-center items-center'>
                    {!editProfileModal && (
                        <div className='bg-light-green p-4 rounded shadow border-2 flex justify-center items-center'>
                            <div className='p-3'>
                                <img src={employee.employeeAvatar || "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} alt="profile photo" className='bg-white h-40 w-40 rounded-full' />
                            </div>
                            <div className='text-main-green uppercase font-semibold'>
                                <h2>Employee Id: <span>{user?.employeeId}</span></h2>
                                <h2>FullName: <span>{employee.employeeFullName}</span></h2>
                                <h2>Email: <span>{employee.employeeEmail}</span></h2>
                                <h2>Phone Number: <span>{employee.employeePhoneNo}</span></h2>
                                <h2>employeeAadhar: <span>{employee.employeeAadhar}</span></h2>
                                <h2>Team Id: <span>{user?.employeeTeamId || "-"}</span></h2>
                                <h2>Team: <span>{user?.employeeTeamName || "-"}</span></h2>
                                <h2>Role: <span>{user?.employeeRole || "-"}</span></h2>
                                <h2>Manager Id: <span>{user?.employeeManagerId || "-"}</span></h2>
                                <h2>Manager Name: <span>{user?.employeeManagerName || "-"}</span></h2>
                                <button className='bg-main-green text-white p-2 m-2 rounded' onClick={() => seteditProfileModal(!editProfileModal)}>Edit profile</button>
                            </div>
                        </div>
                    )}
                    {/* edit modal */}
                    {editProfileModal && (
                        <div className='flex justify-center items-center my-5 md:w-[60%]'>
                            <form onSubmit={handleEditProfile} className='w-full border-2 p-3 login-form rounded shadow bg-light-green'>
                                <h3 className='text-center py-2 text-main-green text-xl'>Update Details</h3>

                                <label>Enter Full Name</label>
                                <input
                                    type='text'
                                    className='w-100 p-1 mb-3'
                                    required
                                    value={employee.employeeFullName}
                                    onChange={(e) => setEmployee({ ...employee, employeeFullName: e.target.value })}
                                />

                                <label>Enter Email</label>
                                <input
                                    type='email'
                                    className='w-100 p-1 mb-3'
                                    required
                                    value={employee.employeeEmail}
                                    onChange={(e) => setEmployee({ ...employee, employeeEmail: e.target.value })}
                                />

                                <label>Enter Phone Number</label>
                                <input
                                    type='number'
                                    className='w-100 p-1 mb-3'
                                    required
                                    value={employee.employeePhoneNo}
                                    onChange={(e) => setEmployee({ ...employee, employeePhoneNo: e.target.value })}
                                />

                                <label>Enter Aadhar</label>
                                <input
                                    type='number'
                                    className='w-100 p-1 mb-3'
                                    required
                                    value={employee.employeeAadhar}
                                    onChange={(e) => setEmployee({ ...employee, employeeAadhar: e.target.value })}
                                />

                                <label>Change Profile Photo:</label>
                                <input
                                    type='file'
                                    className='w-100 p-1 mb-3'
                                    onChange={(e) => setEmployee({ ...employee, employeeAvatar: URL.createObjectURL(e.target.files[0]) })}
                                />

                                <div className='flex justify-between'>
                                    <button type='submit' className='bg-main-green py-2 px-4 text-white rounded hover:bg-green-600'>Update</button>
                                    <button type='button' className='border-2 py-2 px-4 rounded hover:bg-red-400 hover:text-white' onClick={() => seteditProfileModal(!editProfileModal)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
