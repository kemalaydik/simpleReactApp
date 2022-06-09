import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlashMessages = React.memo(props => {
	const config = {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark'
	};
	toast.success(props.messages[props.messages.length - 1], config);
	return (
		<div>
			<ToastContainer />
		</div>
	);
});

export default FlashMessages;
