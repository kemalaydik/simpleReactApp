import React, { useContext, useEffect, useRef } from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import { useImmer } from 'use-immer';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:8080');
function Chat() {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);
	const chatField = useRef(null);
	const messageBoard = useRef(null);
	const [state, setState] = useImmer({
		fieldValue: '',
		chatMessages: []
	});

	useEffect(() => {
		appState.isChatOpen && chatField.current.focus();
		appDispatch({ type: 'resetUnreadChatCount' });
	}, [appState.isChatOpen]);

	useEffect(() => {
		socket.on('chatFromServer', message => {
			setState(draft => {
				draft.chatMessages.push(message);
			});
		});
	}, []);

	useEffect(() => {
		messageBoard.current.scrollTop = messageBoard.current.scrollHeight;
		if (state.chatMessages.length && !appState.isChatOpen) appDispatch({ type: 'incrementUnreadChatCount' });
	}, [state.chatMessages]);

	function handleChange(e) {
		setState(draft => {
			draft.fieldValue = e.target.value;
		});
	}
	function handleSubmit(e) {
		e.preventDefault();
		socket.emit('chatFromBrowser', { message: state.fieldValue, token: appState.user.token });
		setState(draft => {
			draft.chatMessages.push({
				message: draft.fieldValue,
				username: appState.user.username,
				avatar: appState.user.avatar
			});
			draft.fieldValue = '';
		});
	}

	function isMyMessage({ username }) {
		return appState.user.username == username;
	}

	return (
		<>
			<div className={'fixed bottom-0 right-0 mr-3 bg-white border w-[50vw] min-w-[25rem]' + (appState.isChatOpen ? '' : ' hidden')}>
				<div className='flex items-center p-1 border-b border-gray-300 bg-gray-800'>
					<span className='block ml-2 font-bold text-white'>Chat</span>
					<XCircleIcon width='24' fill='white' className='ml-auto cursor-pointer' onClick={() => appDispatch({ type: 'toggleChat' })} />
				</div>
				<div ref={messageBoard} className='w-full p-6 overflow-y-auto h-max max-h-[50vh]'>
					<ul className='space-y-2'>
						{state.chatMessages.map((message, idx) => {
							return (
								<li key={idx} className={'flex gap-2' + (isMyMessage(message) ? ' justify-start' : ' justify-end')}>
									<Link to={'/profile/' + message.username}>
										<img className='object-cover w-10 h-10 rounded-full' src={message.avatar} alt='username' />
									</Link>
									<div className={'px-4 py-2 rounded shadow' + (isMyMessage(message) ? ' bg-blue-500 text-white' : ' bg-gray-100 text-gray-700')}>
										<span className='block'>{message.message}</span>
									</div>
								</li>
							);
						})}
					</ul>
				</div>

				<form onSubmit={handleSubmit} className='flex items-center justify-between w-full p-3 border-t border-gray-300'>
					<input
						ref={chatField}
						value={state.fieldValue}
						onChange={handleChange}
						type='text'
						placeholder='Message'
						className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
						name='message'
						required
					/>
					<button type='submit'>
						<svg className='w-5 h-5 text-gray-500 origin-center transform rotate-90' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
							<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
						</svg>
					</button>
				</form>
			</div>
		</>
	);
}

export default Chat;
