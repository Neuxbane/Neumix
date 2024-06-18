'use client';

import React from 'react';

export const Banner: React.FC<{ children: React.ReactNode; width?: string; height?: string; from?: string; to?: string }> = ({ children, width, height, from, to }) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    },300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      backgroundImage: `url(/banner-about.jpg)`, 
      backgroundSize: 'cover', 
      borderRadius: '1rem', 
      padding: loaded ? '1rem' : '0',
      overflow: 'hidden',
      width: width, 
      height: loaded ? height || '10rem' : '0', 
      backgroundPositionY: loaded ? to || 'center' : from || 'top', 
      transitionTimingFunction: 'ease-in-out',
      transitionDuration: '1s'
    }}>
      {children}
    </div>
  );
};
