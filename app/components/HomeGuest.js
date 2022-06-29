import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import Page from './Page';
import DispatchContext from '../DispatchContext';
import { useImmerReducer } from 'use-immer';
import { CSSTransition } from 'react-transition-group';
import { XCircleIcon } from '@heroicons/react/solid';

function HomeGuest() {
	const appDispatch = useContext(DispatchContext);
	// const [username, setUsername] = useState();
	// const [email, setEmail] = useState();
	// const [password, setPassword] = useState();
	const initialState = {
		username: {
			value: '',
			hasErrors: false,
			message: '',
			inUnique: false,
			checkCount: 0
		},
		email: {
			value: '',
			hasErrors: false,
			message: '',
			inUnique: false,
			checkCount: 0
		},
		password: {
			value: '',
			hasErrors: false,
			message: ''
		},
		submitCount: 0
	};

	function reducer(draft, action) {
		switch (action.type) {
			case 'usernameImmediately':
				draft.username.hasErrors = false;
				draft.username.value = action.value;
				if (draft.username.length > 30) {
					draft.username.hasError = true;
					draft.username.message = 'Username cannot exceed 30 characters';
				}
				return;
			case 'usernameAfterDelay':
				return;
			case 'usernameUniqueResults':
				return;
			case 'emailImmediately':
				draft.email.hasErrors = false;
				draft.email.value = action.value;
				return;
			case 'emailAfterDelay':
				return;
			case 'emailUniqueResults':
				return;
			case 'passwordImmediately':
				draft.password.hasErrors = false;
				draft.password.value = action.value;
				return;
			case 'passwordAfterDelay':
				return;
			case 'submitForm':
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(reducer, initialState);

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
										onChange={e => dispatch({ type: 'usernameImmediately', value: e.target.value })}
										id='username-register'
										name='username'
										type='text'
										autoComplete='off'
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>

								<div className='rounded-md bg-red-50 p-4'>
									<div className='flex'>
										<div className='flex-shrink-0'>
											<XCircleIcon />
										</div>
										<div className='ml-3'>
											<h3 className='text-sm font-medium text-red-800'>There were 2 errors with your submission</h3>
											<div className='mt-2 text-sm text-red-700'>
												<ul role='list' className='list-disc pl-5 space-y-1'>
													<li>Your password must be at least 8 characters</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<label htmlFor='email-register' className='block text-sm font-medium text-gray-700'>
									Email
								</label>
								<div className='mt-1'>
									<input
										onChange={e => dispatch({ type: 'emailImmediately', value: e.target.value })}
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
										onChange={e => dispatch({ type: 'passwordImmediately', value: e.target.value })}
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
