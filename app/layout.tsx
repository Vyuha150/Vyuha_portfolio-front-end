"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import IconicLoader from "@/components/IconicLoader";
import { Toaster } from "react-hot-toast";

function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isInitialLoading } = useLoading();

  // Define routes where Navbar and Footer should be excluded
  const excludeNavbarFooter = ["/auth/sign-in", "/auth/sign-up"].includes(
    pathname
  );

  // Show loader only during initial page load with smooth transitions
  return (
    <>
      {/* Show loader on initial load */}
      {isInitialLoading && <IconicLoader />}

      {/* Main content with fade-in animation */}
      <div
        className={`transition-opacity duration-500 ${
          isInitialLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* 🔥 Orange Accent Gradient Blobs - Shared Site-Wide
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] top-[-100px] left-[-150px] bg-orange-500 opacity-30 rounded-full mix-blend-overlay blur-3xl z-0" />
          <div className="absolute w-[400px] h-[400px] bottom-[-100px] right-[-150px] bg-orange-500 opacity-30 rounded-full mix-blend-overlay blur-2xl z-0" />
        </div> */}

        {/* 🔗 Core Layout */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Navbar */}
          {!excludeNavbarFooter && (
            <header className="w-full">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <Navbar />
              </div>
            </header>
          )}

          {/* Page Content */}
          <main className="flex-1 w-full h-auto max-w-7xl mx-auto sm:px-10 pt-16 md:pt-10">
            {children}
          </main>

          {/* Footer */}
          {!excludeNavbarFooter && (
            <footer className="mt-auto">
              <Footer />
            </footer>
          )}
        </div>
      </div>
    </>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="min-h-screen bg-[#0c0c0c] text-white font-outfit relative overflow-x-hidden">
        <LoadingProvider>
          <LayoutContent>{children}</LayoutContent>
        </LoadingProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
            },
          }}
        />
      </body>
    </html>
  );
}
