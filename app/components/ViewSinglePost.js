import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Spinner from './Spinner';
import Page from './Page';
import { TrashIcon } from '@heroicons/react/outline';
import { PencilAltIcon } from '@heroicons/react/outline';

export default function ViewSinglePost() {
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
	}, []);
	const {
		author: { username, avatar },
		body,
		title,
		createdDate
	} = post;
	const formattedDate = new Date(createdDate).toLocaleDateString();
	if (isLoading) return <Spinner />;
	return (
		<Page title={title}>
			<div className='bg-gray-100 px-4 py-5 sm:px-6 w-3/4 mx-auto rounded shadow'>
				<div className='flex items-center mb-3'>
					<h2 className='text-xl'>{title}</h2>
					<PencilAltIcon width='20' className='ml-auto fill-blue-600 hover:fill-blue-800' role='button' />
					<TrashIcon width='20' className='hover:fill-gray-400' role='button' />
				</div>
				<div className='flex space-x-3'>
					<Link to={'/profile/' + username}>
						<img className='h-10 w-10 rounded-full hover:ring-2 ring-blue' src={avatar} alt='avatar' />
					</Link>
					<div className='min-w-0 flex-1'>
						<Link to={'/profile/' + username}>
							<p className='text-sm font-medium text-gray-900 hover:underline'>{username}</p>
						</Link>
						<p className='text-sm text-gray-500'>{formattedDate}</p>
					</div>
				</div>
				<p className='text-sm text-gray-600 mt-5'>{body}</p>
			</div>
		</Page>
	);
}
