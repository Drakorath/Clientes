import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {

    // Routing de next
    const router = useRouter();
    // console.log(router.pathname)

    return (
        <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                <p className='text-white text-2xl font-black'>CRM CLIENTES</p>
            </div>
            <nav className='mt-5 list-none  '>
                <li className={router.pathname === "/" ? "bg-blue-900 p-3" : "p-3"}>
                    <Link legacyBehavior href='/'>
                        <a className='text-white mb-3 block '>
                            Clientes
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/pedidos" ? "bg-blue-900 p-3" : "p-3"}>
                    <Link legacyBehavior href='/pedidos'>
                        <a className='text-white mb-3 block '>
                            Pedidos
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/productos" ? "bg-blue-900 p-3" : "p-3"}>
                    <Link legacyBehavior href='/productos'>
                        <a className='text-white mb-3 block '>
                            Productos
                        </a>
                    </Link>
                </li>
            </nav>
            <div className='sm:mt-10'>
                <p className='text-white text-2xl font-black'>Otras Opciones</p>
            </div>
            <nav className='mt-5 list-none  '>
                <li className={router.pathname === "/mejoresvendedores" ? "bg-blue-900 p-3" : "p-3"}>
                    <Link legacyBehavior href='/mejoresvendedores'>
                        <a className='text-white mb-3 block '>
                            Mejores Vendedores
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/mejoresclientes" ? "bg-blue-900 p-3" : "p-3"}>
                    <Link legacyBehavior href='/mejoresclientes'>
                        <a className='text-white mb-3 block '>
                            Mejores Clientes
                        </a>
                    </Link>
                </li>
            </nav>

        </aside>
    )
}

export default Sidebar