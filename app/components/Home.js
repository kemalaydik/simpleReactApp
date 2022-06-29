import React, { useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import Axios from 'axios';
import Page from './Page';
import StateContext from '../StateContext';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function Home() {
	const appState = useContext(StateContext);
	const [state, setState] = useImmer({
		isLoading: true,
		feed: []
	});

	useEffect(() => {
		const request = Axios.CancelToken.source();
		(async function () {
			try {
				const response = await Axios.post('/getHomeFeed', { token: appState.user.token, cancelToken: request.token });
				setState(draft => {
					draft.feed = response.data;
					draft.isLoading = false;
				});
			} catch (error) {
				console.log(error);
			}
			return () => {
				request.cancel();
			};
		})();
	}, []);

	if (state.isLoading) return <Spinner />;
	if (!state.feed.length)
		return (
			<Page title='Your Feed'>
				<div className='relative'>
					<div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100'></div>
					<div className='max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-8'>
						<div className='relative shadow-xl sm:rounded-2xl sm:overflow-hidden'>
							<div className='absolute inset-0'>
								<img className='h-full w-full object-cover' src='https://images.pexels.com/photos/1111368/pexels-photo-1111368.jpeg' alt='' />
								<div className='absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply'></div>
							</div>
							<div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8'>
								<h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
									<span className='block text-white'>Hello, {appState.user.username}</span>
									<span className='block text-indigo-200'>Your feed is empty</span>
								</h1>
								<p className='mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl'>
									Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
								</p>
							</div>
						</div>
					</div>
				</div>
			</Page>
		);
	return (
		<ul>
			{state.feed.map(e => {
				const {
					_id,
					title,
					author: { username },
					createdDate,
					body,
					author: { avatar }
				} = e;
				const date = new Date(createdDate).toLocaleDateString();

				return (
					<li key={_id} className='bg-green-100 px-4 py-5 sm:px-6 w-3/4 mx-auto rounded shadow mb-3'>
						<div className='flex space-x-3'>
							<Link to={'/profile/' + username}>
								<img className='h-10 w-10 rounded-full hover:ring-2 ring-blue' src={avatar} alt='avatar' />
							</Link>
							<div className='min-w-0 flex-1'>
								<h2 className='text-xl'>{title}</h2>
								<Link to={'/profile/' + username}>
									<p className='text-sm font-medium text-gray-900 hover:underline'>{username}</p>
								</Link>
								<p className='text-sm text-gray-500'>{date}</p>
							</div>
						</div>
						<div className='text-sm text-gray-600 mt-5'>
							<ReactMarkdown children={body} />
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default Home;
