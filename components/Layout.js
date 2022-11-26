import React from 'react';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';
import Header from './Header';

const Layout = ({ children }) => {

    // Hook de routing
    const router = useRouter();

    return (
        <>
            {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>
                        {children}
                    </div>

                </div>
            ) : (
                <div className="bg-gray-200 min-h-screen">
                    <div className="sm:flex min-h-screen">
                        <Sidebar />


                        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                            <Header />
                            {children}
                        </main>

                    </div>
                </div>
            )}
        </>
    );
}

export default Layout;