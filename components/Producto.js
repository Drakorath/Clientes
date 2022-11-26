import React from 'react'
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import Swal from 'sweetalert2'


const ELIMINAR_PRODUCTO = gql`
mutation EliminarProducto($id: ID!) {
  eliminarProducto(id: $id)
}
`;

const OBTENER_PRODUCTOS = gql`
query ObtenerProductos {
    obtenerProductos {
        id
        nombre
        precio
        existencia
    }
}
`;

const Producto = ({ producto }) => {
    const { nombre, precio, existencia, id } = producto;

    // Mutation para eliminar productos 
    const [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO, {
        refetchQueries: [ 
          { query: OBTENER_PRODUCTOS },
        ]
      });

    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, cancel',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.value) {
                try {
                    // delete a bd product
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    });

                    // console.log(data);

                    Swal.fire(
                        'Deleted',
                        data.eliminarProducto,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const editarProducto = () => {
        Router.push({
            pathname: 'editarproducto/[id]',
            query: { id }
        })
    }

    return (
        <tr>
            <td className='border px-4 py-2'>{nombre}</td>
            <td className='border px-4 py-2'>{existencia} Pieces</td>
            <td className='border px-4 py-2'>${precio} Mxn</td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-red-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => confirmarEliminarProducto()}
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
                    onClick={() => editarProducto()}
                >
                    EDITAR
                    <span className="material-symbols-outlined px-2">
                        edit
                    </span>
                </button>
            </td>
        </tr>
    );
}

export default Producto