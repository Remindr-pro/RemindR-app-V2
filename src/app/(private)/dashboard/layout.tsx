import React from "react";
import { Metadata } from "next";
import DashboardLayoutClient from "./DashboardLayoutClient";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Remindr - Dashboard",
};

const DashboardLayout = ({ children }: IProps) => {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
};

export default DashboardLayout;
