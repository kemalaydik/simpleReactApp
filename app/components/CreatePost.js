import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

import Axios from 'axios';
import Page from './Page';

function CreatePost() {
	const [title, setTitle] = useState();
	const [body, setBody] = useState();
	const navigate = useNavigate();
	const appDispatch = useContext(DispatchContext);
	const {
		user: { token }
	} = useContext(StateContext);
	async function handleSubmit(e) {
		appDispatch({ type: 'flashMessages', value: 'Post created successfully!!!' });
		e.preventDefault();
		try {
			const response = await Axios.post('/create-post', { title, body, token });
			navigate('/post/' + response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	}
	return (
		<Page title={'Create-new-post'}>
			<form action='#' className='relative mx-auto w-3/4 max-w-2xl' onSubmit={handleSubmit}>
				<div className='border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
					<label htmlFor='title' className='sr-only'>
						Title
					</label>
					<input
						onChange={e => setTitle(e.target.value)}
						type='text'
						name='title'
						id='title'
						className='block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0'
						placeholder='Title'
					/>
					<label htmlFor='description' className='sr-only'>
						Description
					</label>
					<textarea
						onChange={e => setBody(e.target.value)}
						rows={5}
						name='description'
						id='description'
						className='block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm'
						placeholder='Write a description...'
						defaultValue={''}
					/>

					{/* Spacer element to match the height of the toolbar */}
					<div aria-hidden='true'>
						<div className='py-2'>
							<div className='h-9' />
						</div>
						<div className='h-px' />
						<div className='py-2'>
							<div className='py-px'>
								<div className='h-9' />
							</div>
						</div>
					</div>
				</div>

				<div className='absolute bottom-0 inset-x-px'>
					<div className='border-t border-gray-200 px-2 py-2 sm:px-3'>
						<button
							type='submit'
							className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							Create
						</button>
					</div>
				</div>
			</form>
		</Page>
	);
}

export default CreatePost;
