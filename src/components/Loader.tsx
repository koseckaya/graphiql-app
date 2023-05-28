import React from 'react';

const Loader = () => {
  return (
    <div className="absolute left-1/2 top-1/3 z-50 -translate-x-1/2">
      <div className="flex animate-pulse items-center justify-center gap-x-8 space-x-2">
        <div className="h-8 w-8 rounded-full bg-blue-300" />
        <div className="h-8 w-8 rounded-full bg-blue-300" />
        <div className="h-8 w-8 rounded-full bg-blue-300" />
      </div>
    </div>
  );
};

export default Loader;
