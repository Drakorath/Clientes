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

    // apollo query
    const { data, loading, error } = useQuery(OBTENER_USUARIO)

    // proteccion para no tener acceso a los datos
    if (loading) return null;
    /*  */
    // si no esta la info
    if (!data || data && !data.obtenerUsuario) {
        return router.push('/Access/login');
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const { nombre, apellido } = data.obtenerUsuario
    9
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/Access/login');
        setTimeout(() => {
            refreshPage();
        }, 1000);
    }

    return (
        <div className='sm:flex sm:justify-between mb-6'>
            <p className='mr-3 mb-5 lg:mb-0'>Hola {nombre} {apellido} </p>
            <button className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-sm rounded py-3 px-3 text-white shadow-md'
                type='button' onClick={() => cerrarSesion()} >
                Cerrar Sesion
            </button>
        </div>
    )
}

export default Header