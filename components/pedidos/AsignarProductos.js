import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext';

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

const AsignarProductos = () => {
    // state local del componente 
    const [productos, setProductos] = useState([]); 

    // context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarProducto } = pedidoContext;

    // consulta a la base de datos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

    useEffect(() => {
        // TODO: Funcion para pasar a PedidoState.js
        agregarProducto(productos);
    }, [productos])

    const seleccionarProducto = producto => {
        setProductos(producto);
    }

    if (loading) return null;
    const { obtenerProductos } = data;

    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Busque o seleccione los productos</p>
            <Select
                className='mt-3'
                options={obtenerProductos}
                onChange={opcion => seleccionarProducto(opcion)}
                getOptionValue={opciones => opciones.id}
                isMulti={true}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                placeholder='Busque o seleccione el producto'
                noOptionsMessage={() => 'Resultados no encontrados'}
            />
        </>
    )
}

export default AsignarProductos
