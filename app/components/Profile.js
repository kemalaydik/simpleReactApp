import React, { useEffect, useContext, useState } from 'react';
import { useImmer } from 'use-immer';
import StateContext from '../StateContext';
import Axios from 'axios';
import { useParams, NavLink, Routes, Route } from 'react-router-dom';
import Page from './Page';
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline';
import ProfilePosts from './ProfilePosts';
import ProfileFollow from './ProfileFollow';

function Profile() {
	const { id: username } = useParams();
	const appState = useContext(StateContext);
	const [state, setState] = useImmer({
		followLoading: false,
		startFollowRequestCount: 0,
		stopFollowRequestCount: 0,
		profileData: {
			profileUsername: '...',
			profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
			isFollowing: false,
			counts: { postCount: '', followingCount: '', followerCount: '' }
		}
	});

	useEffect(() => {
		const request = Axios.CancelToken.source();
		(async function () {
			try {
				const response = await Axios.post('/profile/' + username, { token: appState.user.token, cancelToken: request.token });
				setState(draft => {
					draft.profileData = response.data;
				});
			} catch (error) {
				console.log(error);
			}
			return () => {
				request.cancel();
			};
		})();
	}, [username]);

	useEffect(() => {
		if (state.startFollowRequestCount) {
			const request = Axios.CancelToken.source();
			(async function () {
				try {
					const response = await Axios.post('/addFollow/' + state.profileData.profileUsername, { token: appState.user.token, cancelToken: request.token });
					setState(draft => {
						draft.profileData.isFollowing = true;
						draft.profileData.counts.followerCount++;
						draft.followLoading = false;
					});
				} catch (error) {
					console.log(error);
				}
				return () => {
					request.cancel();
				};
			})();
		}
	}, [state.startFollowRequestCount]);

	useEffect(() => {
		if (state.stopFollowRequestCount) {
			const request = Axios.CancelToken.source();
			(async function () {
				try {
					const response = await Axios.post('/removeFollow/' + state.profileData.profileUsername, { token: appState.user.token, cancelToken: request.token });
					setState(draft => {
						draft.profileData.isFollowing = false;
						draft.profileData.counts.followerCount--;
						draft.followLoading = false;
					});
				} catch (error) {
					console.log(error);
				}
				return () => {
					request.cancel();
				};
			})();
		}
	}, [state.stopFollowRequestCount]);

	function startFollowing() {
		setState(draft => {
			draft.followLoading = true;
			draft.startFollowRequestCount++;
		});
	}
	function stopFollowing() {
		setState(draft => {
			draft.followLoading = true;
			draft.stopFollowRequestCount++;
		});
	}

	return (
		<Page title='Profile Screen'>
			<div className='max-w-2xl w-full sm:w-2/3 mx-auto px-2'>
				<div className='flex items-center gap-5'>
					<img src={state.profileData.profileAvatar} alt='' className='rounded-full w-12' />
					<p className='font-bold capitalize text-xl'>{state.profileData.profileUsername}</p>
					{appState.loggedin && !state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != '...' && (
						<button onClick={startFollowing} disabled={state.followLoading} className='bg-blue-500 rounded px-4 py-2 text-white flex items-center gap-3 hover:bg-blue-600 font-semibold'>
							Follow
							<UserAddIcon width='16' />
						</button>
					)}
					{appState.loggedin && state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != '...' && (
						<button onClick={stopFollowing} disabled={state.followLoading} className='bg-red-500 rounded px-4 py-2 text-white flex items-center gap-3 hover:bg-red-600 font-semibold'>
							Unfollow
							<UserRemoveIcon width='16' />
						</button>
					)}
				</div>
				<ul className='mt-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200'>
					<li className='mr-2'>
						<NavLink to='' end href='#' aria-current='page' className='inline-block p-4 rounded-t-lg hover:bg-gray-50 hover:text-blue-500'>
							Posts: {state.profileData.counts.postCount}
						</NavLink>
					</li>
					<li className='mr-2'>
						<NavLink to='followers' href='#' className='inline-block p-4 rounded-t-lg hover:text-blue-500 hover:bg-gray-50'>
							Followers: {state.profileData.counts.followerCount}
						</NavLink>
					</li>
					<li className='mr-2'>
						<NavLink to='following' href='#' className='inline-block p-4 rounded-t-lg hover:text-blue-500 hover:bg-gray-50'>
							Following: {state.profileData.counts.followingCount}
						</NavLink>
					</li>
				</ul>

				<Routes>
					<Route path='' element={<ProfilePosts />} />
					<Route path='followers' element={<ProfileFollow path='followers' />} />
					<Route path='following' element={<ProfileFollow path='following' />} />
				</Routes>
			</div>
		</Page>
	);
}

export default Profile;
