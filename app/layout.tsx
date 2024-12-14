import { ClerkProvider, } from '@clerk/nextjs'
import './globals.css'
import Header from '../components/Header'
import React from 'react'
import Sidebar from '../components/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* Header */}
          <Header />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            
          <div className='flex min-h-screen'>

            {/*SideBar*/}
            <Sidebar />
            {/* Page Content */}
            <div className='flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide'>
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}