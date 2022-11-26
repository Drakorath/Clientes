import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const NUEVO_CLIENTE = gql`
    mutation NuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
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

const NuevoCliente = () => {

    const router = useRouter();

    // message alert
    const [mensaje, guardarMensaje] = useState(null);

    // Mutation para crear nuevos clientes
    const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, {
        refetchQueries: [ 
          { query: OBTENER_CLIENTES_USUSARIO },
        ]
      });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('Client name is required'),
            apellido: Yup.string()
                .required('Client lastname is required'),
            empresa: Yup.string()
                .required('Company name is required'),
            email: Yup.string()
                .email('Invalid email')
                .required('Client email is required'),
        }),
        onSubmit: async valores => {

            const { nombre, apellido, empresa, email, telefono } = valores

            try {
                const { data } = await nuevoCliente({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                });
                //  console.log(data.nuevoCliente)
                router.push('/') // redireccionar hacia
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    guardarMensaje(null);
                }, 2000);
            }
        }
    })

    const mostrarMensaje = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>New Client</h1>

            {mensaje && mostrarMensaje()}

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        onSubmit={formik.handleSubmit}
                        className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                    >

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                Name
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='nombre'
                                    type='text'
                                    placeholder='Client Name'
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
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                                Last Name
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='apellido'
                                    type='text'
                                    placeholder='Client Last Name'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    formik={formik.values.email}
                                />
                            </label>
                        </div>

                        {formik.touched.apellido && formik.errors.apellido ? (
                            <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                <p className='font-bold'>Errors</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                                Company
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='empresa'
                                    type='text'
                                    placeholder='Client Company'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    formik={formik.values.empresa}
                                />
                            </label>
                        </div>

                        {formik.touched.empresa && formik.errors.empresa ? (
                            <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                <p className='font-bold'>Errors</p>
                                <p>{formik.errors.empresa}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='email'
                                    type='email'
                                    placeholder='Client Email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    formik={formik.values.email}
                                />
                            </label>
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                <p className='font-bold'>Errors</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                                Mobile
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='telefono'
                                    type='tel'
                                    placeholder='Client Mobile'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    formik={formik.values.email}
                                />
                            </label>
                        </div>

                        {formik.touched.telefono && formik.errors.telefono ? (
                            <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                <p className='font-bold'>Errors</p>
                                <p>{formik.errors.telefono}</p>
                            </div>
                        ) : null}

                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 '
                            value='sign up'
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}
export default NuevoCliente