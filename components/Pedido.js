import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2'

const ACTUALIZAR_PEDIDO = gql`
    mutation ActualizarPedido($input: PedidoInput, $id: ID!) {
        actualizarPedido(input: $input, id: $id) {
            estado
            id
  }
}
`

const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id: ID!) {
        eliminarPedido(id: $id)
}
`

const OBTENER_PEDIDOS = gql`
query obtenerPedidosVendedor {
  obtenerPedidosVendedor {
    id
  }
}
`

const Pedido = ({ pedido }) => {

    const { id, total, cliente: { nombre, apellido, telefono, email }, estado, cliente } = pedido;

    // Mutation para cambiar el estado de un pedido
    const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO)
    const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
        refetchQueries: [
            { query: OBTENER_PEDIDOS },
        ]
    });

    console.log(pedido)

    const [estadoPedido, setEstadoPedido] = useState(estado);
    const [clase, setClase] = useState('');

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        clasePedido();
    }, [estadoPedido]);

    // Función que modifica el color del pedido de acuerdo a su estado
    const clasePedido = () => {
        if (estadoPedido === 'PENDIENTE') {
            setClase('border-yellow-500')
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('border-green-500')
        } else {
            setClase('border-red-800')
        }
    }

    const cambiarEstadoPedido = async nuevoEstado => {
        try {
            const { data } = await actualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            });

            setEstadoPedido(data.actualizarPedido.estado)
        } catch (error) {
            console.log(error)
        }
    }

    const confirmarEliminarPedido = () => {
        Swal.fire({
            title: '¿Deseas eliminar a este pedido?',
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
                    const data = await eliminarPedido({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Eliminado',
                        data.eliminarPedido,
                        'success'
                    );

                } catch (error) {
                    console.log(error)
                }

            }
        })
    }

    return (
        <div className={` ${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className='font-bold text-gray-800'>Cliente: {nombre} {apellido}</p>

                {email && (
                    <p className='flex items-center my-2'>
                        <span className="material-symbols-outlined px-2">
                            email
                        </span>
                        {email}
                    </p>
                )}

                {telefono && (
                    <p className='flex items-center my-2'>
                        <span className="material-symbols-outlined px-2">
                            phone
                        </span>
                        {telefono}
                    </p>
                )}

                <h2 className='text-gray-800 font-bold mt-10'>Estado Pedido: {estado}</h2>
                <select
                    className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:oultine-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'
                    value={estadoPedido}
                    onChange={e => cambiarEstadoPedido(e.target.value)}
                >
                    <option value='COMPLETADO'>COMPLETADO</option>
                    <option value='PENDIENTE'>PENDIENTE</option>
                    <option value='CANCELADO'>CANCELADO</option>
                </select>
            </div>

            <div>
                <h2 className='text-gray-800 font-bold mt-2'>Resumen del Pedido</h2>
                {pedido.pedido.map(articulo => (
                    <div key={articulo.id} className='mt-4'>
                        <p className='text-sm text-gray-600'>Producto: {articulo.nombre} </p>
                        <p className='text-sm text-gray-600'>cantidad: {articulo.cantidad} </p>
                    </div>
                ))}

                <p className='text-gray-800 mt-3 font-bold'>Total a pagar:
                    <span className='font-light'> $ {total}</span>
                </p>
                <button
                    className='uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight'
                    onClick={() => confirmarEliminarPedido()}
                >
                    Eliminar Pedido
                    <span className="material-symbols-outlined px-2">
                        delete
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Pedido
