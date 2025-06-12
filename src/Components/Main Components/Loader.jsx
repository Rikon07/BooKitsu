import React from 'react';
import { PacmanLoader
 } from 'react-spinners';

const Loader = () => {
    return (
        <div className='min-h-screen bg-gradient-to-tr from-[#4FD1C5] to-[#223A5E] flex flex-col justify-center items-center gap-4'>
            <PacmanLoader
                color="#a2c8ec"
                loading={true}
                size={50}
                speedMultiplier={1.8}
                aria-label="Loading Spinner"
            />
            <p className="text-[#4FD1C5] text-sm dark:text-[#223A5E] font-medium">
                Loading...
            </p>
        </div>
    );
};

export default Loader;