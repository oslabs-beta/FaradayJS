import React from 'react';

const Loader = () => {
  // let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

  return (
<div className="flex items-center justify-center ">
    <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
</div>
  );
};

export default Loader;