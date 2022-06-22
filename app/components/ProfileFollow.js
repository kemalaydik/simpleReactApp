import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from './Spinner';
import Axios from 'axios';

function ProfileFollow(props) {
	const { id: username } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [follow, setFollow] = useState([]);
	useEffect(() => {
		const request = Axios.CancelToken.source();
		(async function () {
			try {
				const response = await Axios.get(`/profile/${username}/` + props.path, { cancelToken: request.token });
				setFollow(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
			return () => {
				request.cancel();
			};
		})();
	}, [props.path]);

	if (isLoading) return <Spinner />;

	return (
		<ul className='text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg w-full mt-5 max-h-96 overflow-scroll'>
			{follow.length ? (
				follow.map((e, i) => {
					const { username, avatar } = e;
					return (
						<li key={i} className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg '>
							<Link to={'/profile/' + username} className='flex items-center gap-3'>
								<img src={avatar} className='w-10 rounded-full' />
								<p className='text-gray-500 font-bold'>{username}</p>
							</Link>
						</li>
					);
				})
			) : (
				<li className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg '>
					<p className='text-gray-500 font-bold'>No user found...</p>
				</li>
			)}
		</ul>
	);
}

export default ProfileFollow;
