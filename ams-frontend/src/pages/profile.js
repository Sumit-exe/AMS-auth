import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.js'
const Profile = () => {
    const [hamActive, setHamActive] = useState(false);
    const [editProfileModal, seteditProfileModal] = useState(false);

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
        emmployeeId: user?.employeeId,
        employeeFullName: '',
        employeeEmail: '',
        employeePhoneNo: '',
        employeeAadhar: '',
        employeeAvatar: ''
    });

    useEffect(() => {
        if (user) {
            setEmployee({
                employeeId: user.employeeId,
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
        authService.handleUpdate(employee,token)
        .then((response)=>{
            localStorage.setItem('user', JSON.stringify(response));
            seteditProfileModal(false)
        }).catch((error)=>{
            console.log(error)
        })
    };

    return (
        <div className='w-full flex justify-between max-sm:flex-col'>
            <div>
                <SideBar hamActive={hamActive} setHamActive={setHamActive} />
            </div>
            <div className={`${hamActive ? 'w-[75%] max-sm:w-full h-[100vh]' : 'w-full '}  flex p-3 flex-col items-center`}>
                <div className='w-full h-full flex justify-center items-center'>
                    {!editProfileModal && (
                        <div className='bg-light-green p-8 rounded-lg shadow-lg border-2 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12'>
                        <div className='flex flex-col items-center'>
                          <img src={employee.employeeAvatar || "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} alt="profile photo" className='bg-white h-40 w-40 rounded-full shadow-md' />
                          <button className='bg-main-green text-white p-3 rounded mt-4' onClick={() => seteditProfileModal(!editProfileModal)}>Edit Profile</button>
                        </div>
                        <div className='flex flex-col space-y-4 w-full md:w-auto'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Employee ID:</span>
                              <span className='text-gray-900 truncate' title={employee.employeeId || "-"}>{employee.employeeId || "-"}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Full Name:</span>
                              <span className='text-gray-900 truncate max-w-xs' title={employee.employeeFullName}>{employee.employeeFullName}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Email:</span>
                              <span className='text-gray-900 truncate max-w-xs' title={employee.employeeEmail}>{employee.employeeEmail}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Phone Number:</span>
                              <span className='text-gray-900 truncate' title={employee.employeePhoneNo}>{employee.employeePhoneNo}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Aadhar:</span>
                              <span className='text-gray-900 truncate' title={employee.employeeAadhar}>{employee.employeeAadhar}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Team ID:</span>
                              <span className='text-gray-900 truncate' title={employee.employeeTeamId || "-"}>{employee.employeeTeamId || "-"}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Team:</span>
                              <span className='text-gray-900 truncate' title={employee.employeeTeamName || "-"}>{employee.employeeTeamName || "-"}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Role:</span>
                              <span className='text-gray-900 truncate' title={employee.employeeRole || "-"}>{employee.employeeRole || "-"}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Manager ID:</span>
                              <span className='text-gray-900 truncate' title={employee.employeeManagerId || "-"}>{employee.employeeManagerId || "-"}</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='font-semibold text-gray-700'>Manager Name:</span>
                              <span className='text-gray-900 truncate' title={employee.employeeManagerName || "-"}>{employee.employeeManagerName || "-"}</span>
                            </div>
                          </div>
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
