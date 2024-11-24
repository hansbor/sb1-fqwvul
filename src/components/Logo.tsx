import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center">
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M80 50C80 30 65 15 45 15C25 15 10 30 10 50" 
          stroke="currentColor" 
          strokeWidth="20" 
          strokeLinecap="round"
          className="text-indigo-600"
        />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-900">Business NXT</span>
    </div>
  );
}