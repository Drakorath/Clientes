import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import client from '../config/apollo'

const OBTENER_USUARIO = gql`
    query ObtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`

const Header = () => {

    const router = useRouter();
    //Si No Hay DATOS DEL SERVIDOR
    if (!localStorage.getItem('token')) {
        router.push('/login');
    }
    // apolllo query
    const { data, loading, error } = useQuery(OBTENER_USUARIO)

    // Protect to not access data until we get the results
    if (loading) {
        return <p>Loading...</p>;
    }
 
    // If not information
    // if (!data || data && !data.obtenerUsuario) return router.push('/login');

    const { nombre, apellido } = data.obtenerUsuario

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        client.clearStore();
        router.push('/login');
    };

    return (
        <div className='sm:flex sm:justify-between mb-6'>
            <p className='mr-3 mb-5 lg:mb-0'>Hola: {nombre} {apellido} </p>

            <button
                type='button'
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"    
                onClick={() => cerrarSesion()}
            >
                Cerrar sesion
            </button>

        </div>
    )
}

export default Header