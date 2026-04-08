"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });

    // Optional: refresh AOS on window resize or DOM changes
    // window.addEventListener('resize', AOS.refresh);
    // return () => {
    //   window.removeEventListener('resize', AOS.refresh);
    // };
  }, []);

  return <></>; // This component doesn't render any UI
}
