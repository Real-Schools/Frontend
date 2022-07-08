import SideBar from "Components/sidebar";
import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-screen h-screen space-x-0 bg-gray-200 overflow-x-hidden">
      <SideBar />
      {children || <Outlet />}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
