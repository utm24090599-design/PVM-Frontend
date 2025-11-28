// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout grid relative grid-rows-[100px_auto_100px] overflow-x-hidden">
      <div className="w-full">
        <div className="absolute right-1 top-1 p-2 bg-gray-500 rounded-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
      <footer className="row-start-5">Footer</footer>
    </div>
  );
};

export default MainLayout;
