import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <SidebarProvider>
      <TopBar />
      <AppSidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </SidebarProvider>
  );
}

export default Layout;
