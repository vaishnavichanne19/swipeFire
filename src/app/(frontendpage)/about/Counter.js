"use client";
import { useEffect, useRef, useState } from "react";

const Counter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [startAnimation, target, duration]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}+
    </span>
  );
};

export default Counter;
