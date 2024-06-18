"use client";

import { useState, useEffect } from 'react';

const Delay = ({ children, time = 1000 }: { children: React.ReactNode, time?: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <div style={{ filter: isLoaded ? 'blur(0px)' : 'blur(10rem)', transitionTimingFunction: 'ease-in', transitionDuration: '0.5s' }}>
      {isLoaded ? children : null}
    </div>
  );
};

export default Delay;
