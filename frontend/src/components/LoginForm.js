import Button from '@/components/Inputs/Button'
import Heading from '@/components/Typography/Heading'
import request from '@/utils/apiRequest'
import { getUserURLBase } from '@/utils/navigation'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import Link from 'next/link'

const LoginForm = () => {
	const [invalidLogin, setInvalidLogin] = useState('')

	const login = async (form, { setSubmitting }) => {
		try {
			const res = await request.post('/login', form)
			if (res.status === 200) {
				Router.push(`${getUserURLBase(res.data)}`)
				return false
			}
		} catch (error) {
			setInvalidLogin('Invalid Login')
			setSubmitting(false)
		}	
		return false
	}

	const formValues = { email: '', password: '' }
	const formValidation = values => {
		const errors = {}
		if (!values.email) {
			errors.email = 'Required'
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address'
		}
		return errors
	}

	return (
		<div>
			<Formik
				initialValues={formValues}
				validate={formValidation}
				onSubmit={login}
			>
				{({ isSubmitting }) => (

					<Form className='ba small' style={{ maxWidth: '600px' }}>
						<Heading tag='h2' level={2}>Log In</Heading>


						<div className='form-group'>
							<label htmlFor='email'>Email</label>
							<Field type="email" name="email" placeholder='Enter your email...' />
							<ErrorMessage name="email" component="div" data-cy='email' />
						</div>
						<div className='form-group'>
							<label htmlFor='email'>Password</label>
							<Field type="password" name="password" placeholder='Password' />
							<ErrorMessage name="password" component="div" />
						</div>
						<Button type="submit" disabled={isSubmitting}>
							Submit
						</Button>
						<div className='error-message' style={{ color: 'red' }}>
							{invalidLogin && invalidLogin}
						</div>
						<div className='reset-password'>
							<div className="reset-password"> <Link href='/password/forgot'>Please click here if you forgot your credentials</Link></div>
						</div>

					</Form>
				)}

			</Formik>

		</div >
	)
}

export default LoginForm
