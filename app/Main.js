import React, { useState, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Faq from './components/Faq';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import FlashMessages from './components/FlashMessages';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:8080';

function App() {
	const initialState = {
		loggedin: Boolean(localStorage.getItem('ReactAppToken')),
		flashMessages: [],
		user: {
			token: localStorage.getItem('ReactAppToken'),
			username: localStorage.getItem('ReactAppUsername'),
			avatar: localStorage.getItem('ReactAppAvatar')
		}
	};
	function reducer(stateCopy, action) {
		switch (action.type) {
			case 'login':
				stateCopy.loggedin = true;
				stateCopy.user = action.data;
				return;
			case 'logout':
				stateCopy.loggedin = false;

				return;
			case 'flashMessages':
				stateCopy.flashMessages.push(action.value);
				return;
		}
	}
	const [state, dispatch] = useImmerReducer(reducer, initialState);

	useEffect(() => {
		if (state.loggedin) {
			localStorage.setItem('ReactAppToken', state.user.token);
			localStorage.setItem('ReactAppAvatar', state.user.avatar);
			localStorage.setItem('ReactAppUsername', state.user.username);
		} else {
			localStorage.removeItem('ReactAppToken');
			localStorage.removeItem('ReactAppAvatar');
			localStorage.removeItem('ReactAppUsername');
		}
	}, [state.loggedin]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<div className='h-screen flex flex-col justify-between'>
						<Header />
						<FlashMessages messages={state.flashMessages} />
						<Routes>
							<Route path='/' element={state.loggedin ? <Home /> : <HomeGuest />} />
							<Route path='/about-us' element={<About />} />
							<Route path='/create-post' element={<CreatePost />} />
							<Route path='/faq' element={<Faq />} />
							<Route path='/post/:id' element={<ViewSinglePost />} />
						</Routes>
						<Footer />
					</div>
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
