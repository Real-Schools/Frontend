/**
 * @author Paul Jeremiah Mugaya
 * @email paulmugaya@live.com
 * @create date 2022-06-23 17:49:01
 * @modify date 2022-06-23 17:49:01
 * @desc https://codepen.io/robstinson/pen/bGwpNMV
 */

import useApp from "Hooks/useApp";
import useAuth from "Hooks/useAuth";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaSchool, FaUsers } from "react-icons/fa";

import AppLogo from "Assets/icon.png";
import {
  FiCreditCard,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

type RouteType = {
  name: string;
  path: string;
  icon: ReactElement;
  hasNotification?: boolean;
  next?: boolean;
  onClick?: () => void;
};

const SideBar = () => {
  const { toggleSideBar, collapsed, sidebar } = useApp();
  const { logout, isAuthenticated } = useAuth();
  const [darkMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/authentication/login");
    }
  }, [isAuthenticated]);

  const routes: Array<RouteType> = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiHome />,
    },
    {
      name: "Students",
      path: "/students",
      icon: <FaUsers />,
    },
    {
      name: "Teachers",
      path: "/teachers",
      icon: <FiUsers />,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <FiCreditCard />,
    },
    {
      name: "Branches",
      path: "/branches",
      icon: <FaSchool />,
    },
    {
      name: "Users",
      path: "/users",
      next: true,
      icon: <FiUsers />,
    },
    {
      name: "Settings",
      path: "/settings",
      next: true,
      icon: <FiSettings />,
    },
    {
      name: "Logout",
      path: "#",
      next: true,
      icon: <FiLogOut />,
      onClick: logout,
    },
  ];

  const CreateLink = (route: RouteType, idx: number) => (
    <Link
      className={`${
        route.hasNotification ? "relative " : ""
      }flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-${
        darkMode ? 700 : 300
      } ${darkMode ? "hover:text-gray-300" : ""}
      ${
        route.path == location.pathname
          ? `bg-gray-${darkMode ? 700 : 300} ${darkMode ? "text-gray-200" : ""}`
          : ""
      } text-gray-${darkMode ? 400 : 700}`}
      key={idx}
      to={route.path}
      onClick={route?.onClick}
    >
      {React.cloneElement(route.icon, {
        style: {
          fontSize: 24,
        },
      })}
      {!collapsed && (
        <span className="ml-2 text-sm font-medium">{route.name}</span>
      )}
      {route.hasNotification && (
        <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
      )}
    </Link>
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 flex flex-col items-center h-full overflow-hidden text-gray-${
        darkMode ? 400 : 700
      } bg-gray-${darkMode ? 900 : 100}`}
      style={{
        width: collapsed ? sidebar.collapsed : sidebar.full,
      }}
    >
      <Link
        className={`flex items-center justify-center px-3 mt-3 text-gray-${
          darkMode ? 400 : 700
        }`}
        to="/"
      >
        <img src={AppLogo} className="w-8 h-8" />
        {!collapsed && (
          <span className="ml-2 text-sm font-bold">Real Schools</span>
        )}
      </Link>
      {/* Routes */}
      <div className="w-full px-2">
        {[
          routes.filter((route) => !route.next),
          routes.filter((route) => route.next),
        ].map((routes, idx) => (
          <div
            className={`flex flex-col items-center w-full mt-3 border-t border-gray-${
              darkMode ? 700 : 300
            }`}
            key={idx}
          >
            {routes.map(CreateLink)}
          </div>
        ))}
      </div>
      {/* Link to user */}
      <Link
        className={`flex items-center justify-center w-full h-16 mt-auto bg-gray-${
          darkMode ? 800 : 200
        } hover:bg-gray-${darkMode ? 700 : 300} ${
          darkMode ? "hover:text-gray-300" : ""
        } text-gray-${darkMode ? 400 : 700}`}
        to="#"
        onClick={() => toggleSideBar(!collapsed)}
      >
        {collapsed ? (
          <AiOutlineMenuUnfold style={{ fontSize: 25 }} />
        ) : (
          <AiOutlineMenuFold style={{ fontSize: 25 }} />
        )}
      </Link>
    </div>
  );
};

export default SideBar;
