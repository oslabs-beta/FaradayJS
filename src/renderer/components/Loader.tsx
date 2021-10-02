import React from 'react';

const Loader = () => {
  // let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

  return (
 <div className='flex'>
  <button type="button" className="bg-rose-600 ..." disabled>
    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">

    </svg>
    Processing
  </button>
 </div>
  );
};

export default Loader;