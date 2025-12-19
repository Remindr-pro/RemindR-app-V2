import React from "react";
import { Metadata } from "next";
import SideBar from "@/app/components/molecules/SideBar";
import TopBar from "@/app/components/molecules/TopBar";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Remindr - Dashboard",
};

const DashboardLayout = ({ children }: IProps) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-1 overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="">
          <TopBar />
        </header>
        <main className="flex-1 px-6 xl:px-10 pb-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
