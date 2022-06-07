import React, { useEffect } from 'react';

function FlashMessages(props) {
	return (
		<div className='floating-alerts'>
			{props.messages.map((el, i) => {
				return (
					<div key={i} className='alert alert-success text-center shadow-sm floating-alert'>
						{el}
					</div>
				);
			})}
		</div>
	);
}

export default FlashMessages;
