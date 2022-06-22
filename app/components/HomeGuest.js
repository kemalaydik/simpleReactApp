import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import Page from './Page';
import DispatchContext from '../DispatchContext';

function HomeGuest() {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const appDispatch = useContext(DispatchContext);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await Axios.post('/register', { username, email, password });
			console.log('user created succesfully');
			appDispatch({ type: 'flashMessages', value: 'User created succesfully' });
		} catch (error) {
			console.log(error.response.data);
		}
	}
	return (
		<Page title='Home'>
			<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<img className='mx-auto h-12 w-auto' src='/img/Asset 1@2x.png' alt='logo' />
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Register an account</h2>
				</div>
				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
						<form onSubmit={handleSubmit} className='space-y-6' action='#' method='POST'>
							<div>
								<label htmlFor='username-register' className='block text-sm font-medium text-gray-700'>
									Username
								</label>
								<div className='mt-1'>
									<input
										onChange={e => setUsername(e.target.value)}
										id='username-register'
										name='username'
										type='text'
										autoComplete='off'
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
							<div>
								<label htmlFor='email-register' className='block text-sm font-medium text-gray-700'>
									Email
								</label>
								<div className='mt-1'>
									<input
										onChange={e => setEmail(e.target.value)}
										id='email-register'
										name='email'
										type='email'
										autoComplete='off'
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label htmlFor='password-register' className='block text-sm font-medium text-gray-700'>
									Password
								</label>
								<div className='mt-1'>
									<input
										onChange={e => setPassword(e.target.value)}
										id='password-register'
										name='password'
										type='password'
										autoComplete='off'
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
									Register
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Page>
	);
}

export default HomeGuest;
