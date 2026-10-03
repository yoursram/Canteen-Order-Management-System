import React from 'react';

const Loader = ({ fullScreen = false, text = 'Loading canteen menu...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3 p-6">
      <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      {text && <p className="text-sm font-medium text-gray-600 animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/80 backdrop-blur-xs">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
