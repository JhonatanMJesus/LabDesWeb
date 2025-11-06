// src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-green-50 min-h-screen">
        {children}
      </main>
    </>
  );
};

export default Layout;

