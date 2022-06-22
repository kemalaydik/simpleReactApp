import React, { useEffect, useState, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Spinner from './Spinner';
import Page from './Page';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

export default function EditPost() {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);
	const navigate = useNavigate();
	function reducer(stateCopy, action) {
		switch (action.type) {
			case 'fetchComplete':
				stateCopy.title.value = action.value.title;
				stateCopy.body.value = action.value.body;
				stateCopy.isFetching = false;
				return;
			case 'titleChange':
				stateCopy.title.value = action.value;
				return;
			case 'bodyChange':
				stateCopy.body.value = action.value;
				return;
			case 'submitRequest':
				stateCopy.sendCount++;
				return;
			case 'saveComplete':
				stateCopy.isSaving = true;
				return;
		}
	}
	const initialState = {
		title: {
			value: ''
		},
		body: {
			value: ''
		},
		isFetching: true,
		isSaving: false,
		id: useParams().id,
		sendCount: 0
	};

	const [state, dispatch] = useImmerReducer(reducer, initialState);

	useEffect(() => {
		const request = Axios.CancelToken.source();
		(async function () {
			try {
				const response = await Axios.get('/post/' + state.id, { cancelToken: request.token });
				dispatch({ type: 'fetchComplete', value: response.data });
			} catch (error) {
				console.log(error);
			}
			return () => {
				request.cancel();
			};
		})();
	}, []);

	useEffect(() => {
		if (state.sendCount) {
			const request = Axios.CancelToken.source();
			(async function () {
				try {
					const response = await Axios.post(
						'/post/' + state.id + '/edit',
						{
							title: state.title.value,
							body: state.body.value,
							token: appState.user.token
						},
						{ cancelToken: request.token }
					);
					dispatch({ type: 'saveComplete', value: response.data });
					appDispatch({ type: 'flashMessages', value: 'Post updated.' });
					navigate('/post/' + state.id);
				} catch (error) {
					console.log(error);
				}
				return () => {
					request.cancel();
				};
			})();
		}
	}, [state.sendCount]);

	if (state.isFetching) return <Spinner />;
	return (
		<Page title={'Edit-post'}>
			<form
				onSubmit={e => {
					if (!state.title.hasErrors && !state.body.hasErrors) {
						e.preventDefault();
						dispatch({ type: 'submitRequest' });
					}
				}}
				className='relative mx-auto w-3/4 max-w-2xl'>
				<div className='border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
					<label htmlFor='title' className='sr-only'>
						Title
					</label>
					<input
						onChange={e => dispatch({ type: 'titleChange', value: e.target.value })}
						type='text'
						name='title'
						id='title'
						className={`block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0`}
						placeholder='Title'
						value={state.title.value}
						required
					/>
					<label htmlFor='description' className='sr-only'>
						Description
					</label>
					<textarea
						onChange={e => dispatch({ type: 'bodyChange', value: e.target.value })}
						rows={5}
						name='description'
						id='description'
						className='block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm'
						placeholder='Write a description...'
						value={state.body.value}
						required
					/>
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
							Update
						</button>
					</div>
				</div>
			</form>
		</Page>
	);
}
