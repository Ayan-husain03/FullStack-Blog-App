import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <SidebarProvider>
        <TopBar />
        <AppSidebar />
        <main className="w-full">
          <div className="w-full min-h-[calc(100vh-80px)] pt-20 px-2 sm:px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}

export default Layout;
