import React from 'react'
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import Swal from 'sweetalert2'

const ELIMINAR_CLIENTE = gql`
mutation EliminarCliente($id: ID!) {
  eliminarCliente(id: $id)
}
`
    ;

const OBTENER_CLIENTES_USUSARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
        id
        nombre
        apellido
        empresa
        email
    }
  }
`
    ;

const Cliente = ({ cliente }) => {

    // mutation para eliminar cliente
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        refetchQueries: [
            { query: OBTENER_CLIENTES_USUSARIO },
        ]
    });

    const { nombre, apellido, empresa, email, id } = cliente;

    // Elimina un cliente
    const confirmarEliminarCliente = () => {
        Swal.fire({
            title: '¿Deseas eliminar a este cliente?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then(async (result) => {
            if (result.value) {

                try {
                    // Eliminar por ID
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });
                    // console.log(data);

                    // Mostrar una alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarCliente,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    const editarCliente = () => {
        Router.push({
            pathname: "/editarcliente/[id]",
            query: { id }
        })
    }

    return (
        <tr>
            <td className='border px-4 py-2'>{nombre} {apellido} </td>
            <td className='border px-4 py-2'>{empresa} </td>
            <td className='border px-4 py-2'>{email} </td>

            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-red-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => confirmarEliminarCliente()}
                >
                    ELIMINAR
                    <span className="material-symbols-outlined px-2">
                        delete
                    </span>
                </button>
            </td>

            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => editarCliente()}
                >
                    EDITAR
                    <span className="material-symbols-outlined px-2">
                        edit
                    </span>
                </button>
            </td>
        </tr>
    )
}

export default Cliente;