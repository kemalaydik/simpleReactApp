import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';
import SinglePost from './components/SinglePost';
import Axios from 'axios';
Axios.defaults.baseURL="http://localhost:8080";


function App() {
	const [loggedin, setLoggedIn] = useState(Boolean(localStorage.getItem('ReactAppToken')));

	return (
		<BrowserRouter>
			<Header loggedin={loggedin} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route path='/' element={loggedin ? <Home /> : <HomeGuest />} />
				<Route path='/about-us' element={<About />} />
				<Route path='/create-post' element={<CreatePost />} />
				<Route path='/terms' element={<Terms />} />
				<Route path='/post:id' element={<SinglePost />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}



const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
