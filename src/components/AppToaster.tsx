'use client';

import { Toaster } from 'react-hot-toast';

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName="navbar-toast-viewport"
      toastOptions={{
        duration: 3200,
        className: 'magic-lamp-toast',
        style: {
          background: '#ffffff',
          color: '#1f2937',
          border: '1px solid rgb(0 138 69 / 18%)',
          boxShadow: '0 16px 35px rgb(15 23 42 / 13%)',
          padding: '10px 16px',
        },
        success: {
          iconTheme: {
            primary: '#008a45',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#dc2626',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
