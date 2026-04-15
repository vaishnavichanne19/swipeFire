import { Outfit } from 'next/font/google';
import '../globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { Metadata } from 'next';
import Script from 'next/script';


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
 <head>
     
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-52KDBW3T');`,
          }}
        />
      </head>
      <body className={`${outfit.className} dark:bg-gray-900`}>
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52KDBW3T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <ToastContainer/>
        </ThemeProvider>

      </body>
    </html>
  );
}
