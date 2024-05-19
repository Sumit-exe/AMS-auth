import React, { useState } from 'react';
import SideBar from '../components/SideBar';

const LogOut = () => {

    const [hamActive, setHamActive] = useState(true);

    return (
        <div className='w-full flex justify-between ' >
      <div>
      <SideBar hamActive={hamActive} setHamActive={setHamActive}/>
      </div>
      <div className={` ${hamActive ? 'w-[75%]' : 'w-full'} flex vh-100`}>
        LogOut
      </div>
    

    </div>
    );
}

export default LogOut;
