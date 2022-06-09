import React, { useEffect, useContext, useState } from 'react';
import StateContext from '../StateContext';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Page from './Page';
import { UserAddIcon } from '@heroicons/react/outline';
import ProfilePosts from './ProfilePosts';

function Profile() {
	const { id: username } = useParams();
	const appState = useContext(StateContext);
	const [profiledata, setProfiledata] = useState({
		profileUsername: '...',
		profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
		isFollowing: false,
		counts: { postCount: '', followingCount: '', followerCount: '' }
	});
	useEffect(() => {
		const request = Axios.CancelToken.source();
		(async function () {
			try {
				const response = await Axios.post('/profile/' + username, { token: appState.user.token, cancelToken: request.token });
				setProfiledata(response.data);
			} catch (error) {
				console.log(error);
			}
			return () => {
				request.cancel();
			};
		})();
	}, []);

	// const appState = useContext(StateContext);
	return (
		<Page title='Profile Screen'>
			<div className='max-w-2xl w-full sm:w-2/3 mx-auto px-2'>
				<div className='flex items-center gap-5'>
					<img src={profiledata.profileAvatar} alt='' className='rounded-full w-12' />
					<p className='font-bold capitalize text-xl'>{profiledata.profileUsername}</p>
					<button className='bg-blue-500 rounded px-4 py-2 text-white flex items-center gap-3 hover:bg-blue-600 font-semibold'>
						Follow
						<UserAddIcon width='16' />
					</button>
				</div>
				<ul className='mt-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 '>
					<li className='mr-2'>
						<a href='#' aria-current='page' className='inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active'>
							Posts: {profiledata.counts.postCount}
						</a>
					</li>
					<li className='mr-2'>
						<a href='#' className='inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
							Followers: {profiledata.counts.followerCount}
						</a>
					</li>
					<li className='mr-2'>
						<a href='#' className='inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
							Following: {profiledata.counts.followingCount}
						</a>
					</li>
				</ul>

				<ProfilePosts />
			</div>
		</Page>
	);
}

export default Profile;
