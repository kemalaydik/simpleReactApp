import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className='p-4 md:px-6 md:py-8 bg-gray-800 mt-auto'>
			<div className='sm:flex sm:items-center sm:justify-between'>
				<a href='https://github.com/kemalaydik' className='flex items-center mb-4 sm:mb-0'>
					<img src='../img/Artboard1@2x.png' className='mr-3 h-8' alt='Kemal aydık logo' />
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Kemal Aydık</span>
				</a>
				<ul className='flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400'>
					<li>
						<Link to='/' className='mr-4 hover:underline md:mr-6'>
							Home
						</Link>
					</li>
					<li>
						<Link to='/about-us' className='mr-4 hover:underline md:mr-6 '>
							About us
						</Link>
					</li>
					<li>
						<Link to='/faq' className='hover:underline'>
							FAQ
						</Link>
					</li>
				</ul>
			</div>
			<hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
			<span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
				© 2022{' '}
				<a href='https://github.com/kemalaydik' className='hover:underline'>
					kemalaydik
				</a>
				. All Rights Reserved.
			</span>
		</footer>
	);
}
