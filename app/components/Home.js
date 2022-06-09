import React, { useEffect, useContext } from 'react';
import Page from './Page';
import StateContext from '../StateContext';

function Home() {
	const appState = useContext(StateContext);
	return (
		<Page title='Your Feed'>
			<div className='relative'>
				<div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100'></div>
				<div className='max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-8'>
					<div className='relative shadow-xl sm:rounded-2xl sm:overflow-hidden'>
						<div className='absolute inset-0'>
							<img className='h-full w-full object-cover' src='https://images.pexels.com/photos/1111368/pexels-photo-1111368.jpeg' alt='People working on laptops' />
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
}

export default Home;
