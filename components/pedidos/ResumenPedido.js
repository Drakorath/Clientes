import React, { useContext, useEffect } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext'
import ProductoResumen from './ProductoResumen';

const ResumenPedido = () => {

    // context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { productos, actualizarTotal } = pedidoContext;

    useEffect(() => {
        actualizarTotal();
    }, [productos])

    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>3.- Ajusta las cantidades del producto</p>

            {productos.length > 0 ? (
                <>
                    {
                        productos.map(producto => (
                            <ProductoResumen
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    }
                </>

            ) : (

                <p className='mt-5 text-sm'>Seleccione algún producto</p>
            )}
        </>
    )
}

export default ResumenPedido
