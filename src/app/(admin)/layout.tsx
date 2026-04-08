import { Outfit } from 'next/font/google';
import '../globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Swipe Fire Admin Panel",
  description: "Swipe Fire Admin Panel",
};

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <ToastContainer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
