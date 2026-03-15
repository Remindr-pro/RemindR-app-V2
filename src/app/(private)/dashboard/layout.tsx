import React from "react";
import { Metadata } from "next";
import DashboardLayoutClient from "@/app/(private)/dashboard/DashboardLayoutClient";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Tableau de bord | Remindr",
  description:
    "Votre tableau de bord Remindr : rappels santé, calendrier, proches et recommandations personnalisées.",
};

const DashboardLayout = ({ children }: IProps) => {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
};

export default DashboardLayout;
