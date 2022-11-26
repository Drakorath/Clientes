import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'

const New_Account = gql`
mutation nuevoUsuario($input: UsuarioInput) {
  nuevoUsuario(input: $input) {
    id
    nombre
    apellido
    email
  }
}
`

const NuevaCuenta = () => {

    // State for the messaje
    const [mensaje, guardarMensaje] = useState(null)

    // Mutation to create new users
    const [nuevoUsuario] = useMutation(New_Account)

    // Routing
    const router = useRouter()

    // Form validation
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('The name is required'),
            apellido: Yup.string()
                .required('The lastname is required'),
            email: Yup.string()
                .email('The email is incorrect')
                .required('The email is required'),
            password: Yup.string().required('The password cannot be empty')
                .min(6, 'The password must be at least 6 characters long')
        }),
        onSubmit: async valores => {
            // console.log('sending')
            // console.log(valores)
            const { nombre, apellido, email, password } = valores

            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                })
                console.log(data)

                // User Created correctly
                guardarMensaje(`The user has been created successfully: ${data.nuevoUsuario.nombre}`)
                setTimeout(() => {
                    guardarMensaje(null)
                    router.push('/login')
                }, 3000)

                // Redirect User to log in 
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''))

                setTimeout(() => {
                    guardarMensaje(null)

                }, 3000)
            }
        }
    })

    // if (loading) return 'cargando...'
    const mostrarMensaje = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <div>
            <Layout>
                {mensaje && mostrarMensaje()}
                <h1 className='text-center text-2x1 text-white font-light '>Create New Account</h1>

                <div className='flex justify-center mt-5 '>
                    <div className=' w-full max-w-sm '>
                        <form
                            className='bg-white rounded text-black shadow-md px-8 py-6 pb-8 mb-4'
                            onSubmit={formik.handleSubmit}
                        >

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    Name
                                </label>
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='nombre'
                                    type='text'
                                    placeholder='Username'
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                    <p className='font-bold'>Errors</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastname'>
                                    Apellido
                                </label>
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='apellido'
                                    type='text'
                                    placeholder='Apellido del Usuario'
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.apellido && formik.errors.apellido ? (
                                <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                    <p className='font-bold'>Errors</p>
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null}


                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                    Email
                                    <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                        id='email'
                                        type='email'
                                        placeholder='Email del Usuario'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contraseña'>
                                    Contraseña
                                </label>
                                <input className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='password'
                                    type='password'
                                    placeholder='Contraseña del Usuario'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.password && formik.errors.password ? (
                                <div className='my-2 bg-red-100 border-l-4 border-1-4 border-red-500 text-red-700 py-4 px-2'>
                                    <p className='font-bold'>Errors</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}


                            <input
                                type="submit"
                                className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                                value='Create Account'
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default NuevaCuenta