import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';

function App() {
	const [loggedin, setLoggedIn] = useState(Boolean(localStorage.getItem('ReactAppToken')));

	return (
		<BrowserRouter>
			<Header loggedin={loggedin} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route path='/' element={loggedin ? <Home /> : <HomeGuest />} />
				<Route path='/about-us' element={<About />} />
				<Route path='/terms' element={<Terms />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

// mongodb+srv://kemalaydik:b31b6b84@cluster0.kijpk.mongodb.net/?retryWrites=true&w=majority

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
