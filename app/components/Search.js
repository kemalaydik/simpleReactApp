import React, { Fragment, useState, useContext, useEffect } from 'react';
import { UsersIcon } from '@heroicons/react/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import { debounce } from 'debounce';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Search() {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);
	const [query, setQuery] = useState('');
	const [posts, setPosts] = useState([]);

	function handleInput(e) {
		setQuery(e.target.value);
	}

	useEffect(() => {
		if (query) {
			const request = Axios.CancelToken.source();
			(async function () {
				try {
					console.log(query);
					const response = await Axios.post('/search', { searchTerm: query }, { cancelToken: request.token });
					setPosts(response.data);
				} catch (error) {
					console.log(error);
				}
				return request.cancel();
			})();
		}
	}, [query]);

	return (
		<>
			<Transition.Root show={appState.isSearchOpen} as={Fragment} afterLeave={() => setQuery('')}>
				<Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20' onClose={() => appDispatch({ type: 'closeSearch' })}>
					<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'>
						<Combobox as='div' className='mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'>
							<Combobox.Input
								className='w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
								placeholder='Search...'
								onChange={debounce(handleInput, 700)}
							/>

							{posts.length > 0 && (
								<Combobox.Options static className='-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'>
									{posts.map(post => (
										<Link to={'/post/' + post._id} key={post._id}>
											<Combobox.Option
												onClick={() => appDispatch({ type: 'closeSearch' })}
												className={({ active }) => classNames('cursor-default flex gap-3 items-center select-none rounded-md px-4 py-2', active && 'bg-indigo-600 text-white')}>
												<img src={post.author.avatar} className='w-12 rounded-full' alt='' />
												<p>{post.title}</p>
												<p>{new Date(post.createdDate).toLocaleDateString()}</p>
											</Combobox.Option>
										</Link>
									))}
								</Combobox.Options>
							)}

							{query !== '' && posts.length === 0 && (
								<div className='py-14 px-4 text-center sm:px-14'>
									<UsersIcon className='mx-auto h-6 w-6 text-gray-400' aria-hidden='true' />
									<p className='mt-4 text-sm text-gray-900'>No posts found using that search term.</p>
								</div>
							)}
						</Combobox>
					</Transition.Child>
				</Dialog>
			</Transition.Root>
		</>
	);
}
