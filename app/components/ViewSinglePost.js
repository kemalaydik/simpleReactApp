import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Spinner from './Spinner';
import Page from './Page';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import { TrashIcon } from '@heroicons/react/outline';
import { PencilAltIcon } from '@heroicons/react/outline';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';

export default function ViewSinglePost() {
	const appState = useContext(StateContext);
	const navigate = useNavigate();
	const appDispatch = useContext(DispatchContext);
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState({
		author: {
			username: '',
			avatar: 'https://gravitar.com/avatar/placeholder?s=128'
		},
		body: '',
		title: '',
		createdDate: ''
	});
	useEffect(() => {
		const request = Axios.CancelToken.source();
		(async function () {
			try {
				const response = await Axios.get('/post/' + id, { cancelToken: request.token });
				setPost(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
			return () => {
				request.cancel();
			};
		})();
	}, [id]);
	const {
		author: { username, avatar },
		body,
		title,
		createdDate
	} = post;
	const formattedDate = new Date(createdDate).toLocaleDateString();
	function isOwner() {
		if (appState.loggedin) {
			return appState.user.username === username;
		}
		return false;
	}
	async function deleteHandler() {
		const isSure = window.confirm('Are you sure you want to delete this post?');
		if (isSure) {
			const request = Axios.CancelToken.source();
			try {
				const response = await Axios.delete('/post/' + id, { data: { token: appState.user.token } });
				if (response.data === 'Success') {
					appDispatch({ type: 'flashMessages', value: 'post deleted successfully' });
					navigate('/profile/' + username);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
	if (isLoading) return <Spinner />;
	return (
		<Page title={title}>
			<ReactTooltip place='top' />
			<div className='bg-green-100 px-4 py-5 sm:px-6 w-3/4 mx-auto rounded shadow'>
				<div className='flex space-x-3'>
					<Link to={'/profile/' + username}>
						<img className='h-10 w-10 rounded-full hover:ring-2 ring-blue' src={avatar} alt='avatar' />
					</Link>
					<div className='min-w-0 flex-1'>
						{isOwner() && (
							<div className='flex items-center mb-3'>
								<h2 className='text-xl'>{title}</h2>
								<Link to={'/post/' + id + '/edit'} className='ml-auto'>
									<PencilAltIcon data-tip='Edit' width='20' className='fill-blue-600 hover:fill-blue-800' role='button' />
								</Link>
								<TrashIcon onClick={deleteHandler} data-tip='Delete' width='20' className='hover:fill-gray-400' role='button' />
							</div>
						)}
						<Link to={'/profile/' + username}>
							<p className='text-sm font-medium text-gray-900 hover:underline'>{username}</p>
						</Link>
						<p className='text-sm text-gray-500'>{formattedDate}</p>
					</div>
				</div>

				<div className='text-sm text-gray-600 mt-5'>
					<ReactMarkdown children={body} />
				</div>
			</div>
		</Page>
	);
}
