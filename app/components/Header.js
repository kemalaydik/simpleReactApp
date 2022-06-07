import React, { useState, useContext, Fragment } from 'react';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedin from './HeaderLoggedIn';
import StateContext from '../StateContext';

function Header() {
	const appState = useContext(StateContext);
	return (
		<div className='w-100 px-2 sm:px-4 lg:px-8 bg-gray-800 items-center flex h-20 justify-between'>
			<a href="/">
			<img className='block h-8 w-auto' src='../img/Artboard1@2x.png' alt='logo' />
			</a>
			<div className='flex-1 max-w-2xl'>{appState.loggedin ? <HeaderLoggedin /> : <HeaderLoggedOut />}</div>
		</div>
	);
}

export default Header;
