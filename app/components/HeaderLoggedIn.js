import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import { LogoutIcon, AnnotationIcon, SearchIcon, ChatIcon } from '@heroicons/react/solid';
import ReactTooltip from 'react-tooltip';

function HeaderLoggedin() {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);
	const navigate = useNavigate();
	function handleLogout() {
		appDispatch({ type: 'logout' });
		navigate('/');
	}
	function openSearch(e) {
		appDispatch({ type: 'openSearch' });
	}
	return (
		<div className='flex gap-5 items-stretch justify-end'>
			<ReactTooltip />
			<SearchIcon data-tip='Search' onClick={openSearch} width='25' fill='white' className='hover:fill-gray-300' role='button' />
			<ChatIcon data-tip='chat' width='25' fill='white' className='hover:fill-gray-300' role='button' />
			<Link
				to='/create-post'
				className='inline-flex items-center px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
				Create Post
				<AnnotationIcon className='ml-2 h-5 w-5' aria-hidden='true' />
			</Link>
			<Link to={'Profile/' + appState.user.username}>
				<img className='h-8 w-8 rounded-full self-center hover:ring-2 ring-white' src={appState.user.avatar} alt='profile photo' />
			</Link>
			<button
				onClick={handleLogout}
				className='px-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
				<LogoutIcon className='h-6 w-6' aria-hidden='true' />
			</button>
		</div>
	);
}

export default HeaderLoggedin;
