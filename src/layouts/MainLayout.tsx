// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";

const MainLayout: React.FC = () => {
  const params = useLocation();
  const { role, logout } = useAuth();

  return (
    <div className="main-layout grid relative grid-rows-[100px_auto_100px] overflow-x-hidden">
      <nav className="w-full">
        <button
          type="button"
          title="HambuergerButton"
          className="absolute right-1 top-1 p-2 bg-gray-500 rounded-[10px] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
        {params.pathname != "/login" &&
        params.pathname != "/register" &&
        role != null ? (
          <button
            type="button"
            title="LogOutButton"
            className="absolute right-12 top-1 p-2 bg-red-500 rounded-[10px] cursor-pointer"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </button>
        ) : (
          ""
        )}
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="row-start-5">Footer</footer>
    </div>
  );
};

export default MainLayout;
