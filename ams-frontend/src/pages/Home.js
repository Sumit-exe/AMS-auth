// sumit
import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';

const Home = () => {

  const [hamActive, setHamActive] = useState(false);

  // clock 
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimer(intervalId);
    }
  };

  const pasuseStopwatch = () => {
    if (isRunning) {
      clearInterval(timer);
      setIsRunning(false);
    }
  };

  const endSessionwatch = () => {
    clearInterval(timer);
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const formatTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };  // ------------------------------------

  return (
    <div className='w-full flex justify-between max-sm:flex-col' >
      <div>
        <SideBar hamActive={hamActive} setHamActive={setHamActive} />
      </div>
      <div className={` ${hamActive ? 'w-[75%] max-sm:w-full' : 'w-full'} flex  p-3 flex-col items-center`}>
        {/* buttons */}
        <div className='flex justify-center w-full '>
          <button
            className={` border-2 m-1 p-3 rounded ${!isRunning ? "bg-main-green hover:bg-green-600" : "bg-gray-400"}  text-white `}
            onClick={startStopwatch}
            disabled={isRunning}
          >Start Session
          </button>
          <button
            className={` border-2 m-1 p-3 rounded ${isRunning ? "bg-[#b39c1c] hover:bg-yellow-600" : "bg-gray-400"}  text-white `}
            onClick={pasuseStopwatch}
            disabled={!isRunning}
          >Pause Session
          </button>
          <button
            className=' border-2 m-1 p-3 rounded bg-[#912f16] text-white hover:bg-red-600'
            onClick={endSessionwatch}
          >End Session
          </button>
        </div>

        <div className='w-full h-[80vh] flex justify-center items-center'>
          <div className='relative'>
            <p>Total Work Hrs.</p>
            <h1 className={`text-[800%] max-lg:text-[650%] max-md:text-[550%] max-sm:text-[370%] ${isRunning ? "text-gray-400" : "text-yellow-400"} text-gray-400`}>{formatTime(time)}</h1>
            <p className={`${isRunning ? "hidden" : "block"} text-yellow-400 absolute right-0`}>paused.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
