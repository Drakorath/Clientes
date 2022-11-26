import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input: ProductoInput) {
  nuevoProducto(input: $input) {
    id
    nombre
    existencia
    precio
  }
}
`;

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            precio
            existencia
    }
}
`;



const NuevoProducto = () => {
    // routing
    const router = useRouter();

    // Mutation para agregar un producto
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        refetchQueries: [
            { query: OBTENER_PRODUCTOS },
        ]
    });

    // Form to create new products
    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('Product name is required'),
            existencia: Yup.number()
                .required('Add disponible stock')
                .positive('Not accept negative stock')
                .integer('Must contain integer numbers'),
            precio: Yup.number()
                .required('Price is required')
                .positive('Must contain integer numbers')
        }),
        onSubmit: async valores => {

            const { nombre, existencia, precio } = valores;

            try {
                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencia,
                            precio
                        }
                    }
                });
                // Show an alert
                Swal.fire(
                    'Created',
                    'The product has been created',
                    'success'
                )

                // Redirect to products
                router.push('/productos');
                // console.log(data);


            } catch (error) {
                console.log(error);
            }

        }
    })

    return (
        <Layout>
            <h1>Crear un Producto Nuevo</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        onSubmit={formik.handleSubmit}
                        className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                    >

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                Nombre
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='nombre'
                                    type='text'
                                    placeholder='Nombre del producto'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    formik={formik.values.nombre}
                                />
                            </label>
                        </div>

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                <p className='font-bold'>Errors</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencia'>
                                Stock
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='existencia'
                                    type='number'
                                    placeholder='Cantidad'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    formik={formik.values.existencia}
                                />
                            </label>
                        </div>

                        {formik.touched.existencia && formik.errors.existencia ? (
                            <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                <p className='font-bold'>Errors</p>
                                <p>{formik.errors.existencia}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>
                                Precio
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='precio'
                                    type='number'
                                    placeholder='Precio del Producto'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    formik={formik.values.precio}
                                />
                            </label>
                        </div>

                        {formik.touched.precio && formik.errors.precio ? (
                            <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                <p className='font-bold'>Errors</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null}

                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 '
                            value='Añadir el Producto'
                        />

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NuevoProducto