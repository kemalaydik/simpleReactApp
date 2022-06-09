import React, { useState, useContext } from 'react';
import { LoginIcon } from '@heroicons/react/solid';
import Axios from 'axios';
import DispatchContext from '../DispatchContext';

function HeaderLoggedOut() {
	const appDispatch = useContext(DispatchContext);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await Axios.post('/login', { username, password });
			if (response.data) {
				appDispatch({ type: 'login', data: response.data });
			} else console.log('incorrect username and password');
		} catch (error) {
			console.log(error.response.data);
		}
	}
	return (
		<form onSubmit={handleSubmit} className='flex gap-3'>
			<div className='w-full'>
				<label htmlFor='username' className='sr-only'>
					username
				</label>
				<input
					onChange={e => setUsername(e.target.value)}
					name='username'
					className='block w-full pl-3 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm'
					placeholder='User name'
					type='text'
					autoComplete='off'
				/>
			</div>
			<div className='w-full'>
				<label htmlFor='password' className='sr-only'>
					password
				</label>
				<input
					onChange={e => setPassword(e.target.value)}
					name='password'
					className='block w-full pl-3 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm'
					placeholder='Password'
					type='password'
				/>
			</div>
			<button className='px-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
				<LoginIcon className='h-6 w-6' aria-hidden='true' />
			</button>
		</form>
	);
}

export default HeaderLoggedOut;
