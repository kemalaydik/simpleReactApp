import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from './Spinner';
import Axios from 'axios';

function ProfilePosts() {
	const { id: username } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const request = Axios.CancelToken.source();
		(async function () {
			try {
				const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: request.token });
				setPosts(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
			return () => {
				request.cancel();
			};
		})();
	}, [username]);

	if (isLoading) return <Spinner />;

	return (
		<ul className='text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg w-full mt-5 max-h-96 overflow-scroll'>
			{posts.map(e => {
				const {
					_id,
					title,
					createdDate,
					author: { avatar }
				} = e;
				const date = new Date(createdDate).toLocaleDateString();

				return (
					<li key={_id} className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg '>
						<Link to={'/post/' + _id} className='flex items-center gap-3'>
							<img src={avatar} className='w-10 rounded-full' />
							<p className='text-gray-500 font-bold'>{title}</p>
							<p className='text-xs text-gray-500 ml-5'>on {date}</p>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

export default ProfilePosts;
