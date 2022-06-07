import React, { useEffect, useState, useContext } from 'react';
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
	const {user:{token}} = useContext(StateContext);
	async function handleSubmit(e) {
		appDispatch({ type: 'flashMessages', value: 'Post created successfully!!!' });
		e.preventDefault();
		try {
			const response = await Axios.post('/create-post', { title, body, token });
			navigate('/post/' + response.data);
		} catch (error) {
			await console.log(error.response.data);
		}
	}
	return (
		<Page title={'Create-new-post'}>
			<form onSubmit={handleSubmit} className='container container--narrow py-md-5'>
				<div className='form-group'>
					<label htmlFor='post-title' className='text-muted mb-1'>
						<small>Title</small>
					</label>
					<input
						onChange={e => setTitle(e.target.value)}
						autoFocus
						name='title'
						id='post-title'
						className='form-control form-control-lg form-control-title'
						type='text'
						placeholder=''
						autoComplete='off'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='post-body' className='text-muted mb-1 d-block'>
						<small>Body Content</small>
					</label>
					<textarea onChange={e => setBody(e.target.value)} name='body' id='post-body' className='body-content tall-textarea form-control' type='text'></textarea>
				</div>
				<button className='btn btn-primary'>Save New Post</button>
			</form>
		</Page>
	);
}

export default CreatePost;
